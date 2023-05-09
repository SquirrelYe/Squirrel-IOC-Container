"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerService = exports.Container = void 0;
require("reflect-metadata");
const ioc_graph_1 = require("./ioc.graph");
const ioc_exception_1 = require("./ioc.exception");
const ioc_constant_1 = require("./ioc.constant");
const ioc_util_1 = require("./ioc.util");
/**
 * @description IOC Container容器
 * @author willye
 * @time 2023.03.31 20:09:57
 */
class Container {
    constructor(options = { dependencyInstanceInjectMethod: 'Property' }) {
        var _a;
        // 初始化ContainerOptions
        ioc_constant_1.ContainerConstant.Container_DependencyInjectMethod = (_a = options.dependencyInstanceInjectMethod) !== null && _a !== void 0 ? _a : 'Property';
        // 初始化Container内部使用的实例缓存
        ioc_constant_1.ContainerConstant.ServiceCtorStoreInstance.clear();
        // 将自身注册到容器中，方便其他服务获取容器。注：当前服务的scope为Singleton，所以只会初始化一次。
        ioc_constant_1.ContainerConstant.ServiceCtorStoreInstance.set(ioc_constant_1.ContainerConstant.IOC_INTERNAL_SERVICE_ID, { scope: 'Singleton', type: 'Instance', service: this });
    }
    // services 获取所有已初始化好的服务
    get services() {
        return ioc_constant_1.ContainerConstant.ServiceCtorStoreInstance;
    }
    // init 初始化所有服务（过程中会执行循环检测，方便开发者在开发阶段发现循环依赖问题）
    init() {
        console.log('⭐️⭐️⭐️ IOC Container init dependency list: ', ioc_constant_1.ContainerConstant.ServiceCtorStore.keys(), '\n');
        for (const serviceId of ioc_constant_1.ContainerConstant.ServiceCtorStore.keys()) {
            this.getService(serviceId);
        }
    }
    // registerServiceInstance 注册服务实例
    registerServiceInstance(id, service) {
        ioc_constant_1.ContainerConstant.ServiceCtorStoreInstance.set(id, service);
    }
    // getService 如果#serviceStore能找到对应的服务，表示服务已经ready，可以直接使用，立即返回就好，否则调用createAndCacheService初始化这个服务。
    getService(id) {
        // 如果服务已经初始化过了，直接返回
        if (ioc_constant_1.ContainerConstant.ServiceCtorStoreInstance.has(id)) {
            const { service, scope } = ioc_constant_1.ContainerConstant.ServiceCtorStoreInstance.get(id);
            if (scope === 'Singleton')
                return service;
            if (scope === 'Prototype')
                return service();
            throw new ioc_exception_1.ServiceInjectScopeException(id);
        }
        // 如果服务未初始化过，初始化服务
        return this.createAndCacheService(id);
    }
    // createAndCacheService 初始化服务
    createAndCacheService(serviceId) {
        var _a, _b;
        const ServiceCtor = this.getServiceCtorById(serviceId);
        if (!ServiceCtor)
            throw new ioc_exception_1.ServiceNotFoundException(serviceId);
        // 构造依赖的关联图Graph，用于检测循环依赖
        //  - 构建服务依赖图，这里使用一个栈 stack 来保存未插入图的服务，初始值为当前需要初始化的服务；
        //  - 每次从栈从取出一个值，并通过服务依赖关系表，遍历这个服务的所有依赖；
        //  - 根据依赖关系在图中插入对应的边，如果图中不存在这个依赖节点，则入栈，等待下次循环继续处理这个依赖节点的依赖。
        const hashFunction = (node) => node.serviceId.toString();
        const graph = new ioc_graph_1.Graph(hashFunction);
        const stack = [{ ctor: ServiceCtor, serviceId }];
        while (stack.length) {
            const node = stack.pop();
            graph.lookupOrInsertNode(node);
            // 处理属性依赖
            const { parameterDeps, propertyDeps } = this.getServiceDependencies(node.ctor);
            const fParameterDeps = (parameterDeps || []).sort((a, b) => a.parameterIndex - b.parameterIndex);
            const fPropertyDeps = propertyDeps || [];
            for (const dependency of [...fParameterDeps, ...fPropertyDeps]) {
                if (ioc_constant_1.ContainerConstant.ServiceCtorStoreInstance.has(dependency.id))
                    continue;
                const ServiceCtor = this.getServiceCtorById(dependency.id);
                const dependencyNode = { ctor: ServiceCtor, serviceId: dependency.id };
                if (!graph.lookup(dependencyNode))
                    stack.push(dependencyNode);
                graph.insertEdge(node, dependencyNode);
            }
        }
        // 执行检测循环依赖
        //  - 服务依赖图构建好后，继续执行一个循环；
        //  - 每次循环拿出当前图的所有根节点，并根据之前记录的服务依赖关系（包含依赖服务ID已经构造函数形参索引），初始化此次循环的根节点，并将对应的服务实例存入serviceStore中；
        //  - 然后，在图中移除该根节点。
        while (true) {
            const roots = graph.roots();
            if (roots.length === 0) {
                if (!graph.isEmpty())
                    throw new ioc_exception_1.CyclicDependencyException(graph);
                break;
            }
            for (const root of roots) {
                const { ctor: ServiceCtor, serviceId } = root.data;
                // 获取注入类型
                const dependencyInjectType = (_a = Reflect.getMetadata(ioc_constant_1.ContainerConstant.Container_MetadataKey_Injectable_Type, ServiceCtor)) !== null && _a !== void 0 ? _a : 'Instance';
                const dependencyInjectScope = (_b = Reflect.getMetadata(ioc_constant_1.ContainerConstant.Container_MetadataKey_Dependency_Scope, ServiceCtor)) !== null && _b !== void 0 ? _b : 'Singleton';
                // 获取注入服务结果
                let dependencyInjectServiceResult = this.getDependencyInstanceByInjectType(dependencyInjectType, dependencyInjectScope, ServiceCtor);
                // 保存注入服务结果
                ioc_constant_1.ContainerConstant.ServiceCtorStoreInstance.set(serviceId, { service: dependencyInjectServiceResult, type: dependencyInjectType, scope: dependencyInjectScope });
                // 移除根节点
                graph.removeNode(root.data);
            }
        }
        // 当图中的所有节点都被移除后，结束循环，返回调用getService的结果，此时serviceStore肯定存在对应的服务，将服务立即返回。
        return this.getService(serviceId);
    }
    // getServiceDependencies 从元数据中获取服务的依赖
    getServiceDependencies(Ctor) {
        const dependencies = ioc_util_1.ContainerUtils.getDependenciesFromMetadata(Ctor);
        return dependencies;
    }
    // getServiceCtorById 通过服务ID获取服务的构造函数
    getServiceCtorById(id) {
        if (!ioc_constant_1.ContainerConstant.ServiceCtorStore.has(id))
            throw new ioc_exception_1.ServiceNotFoundException(id);
        return ioc_constant_1.ContainerConstant.ServiceCtorStore.get(id);
    }
    // 根据不同类型的模块注入模式获取依赖实例
    getDependencyInstanceByInjectType(dependencyInjectType, dependencyInjectScope, ServiceCtor) {
        // 处理属性依赖;
        const { parameterDeps, propertyDeps, postConstructDeps } = this.getServiceDependencies(ServiceCtor);
        let dependencyInjectServiceResult = null;
        // 1. Instance 【默认】 实例注入
        if (dependencyInjectType === 'Instance') {
            const generateService = () => {
                let serviceIns = new ServiceCtor();
                // 处理构造函数依赖
                if (parameterDeps.length) {
                    const args = parameterDeps.map(({ id }) => this.getService(id));
                    serviceIns = new ServiceCtor(...args);
                }
                // 处理属性依赖
                if (propertyDeps.length) {
                    for (const { id, parameterKey } of propertyDeps) {
                        // 当前注入方式有两种，一种是通过Object.defineProperty来实现，另一种是直接赋值。
                        if (ioc_constant_1.ContainerConstant.Container_DependencyInjectMethod === 'Property') {
                            serviceIns[parameterKey] = this.getService(id);
                        }
                        if (ioc_constant_1.ContainerConstant.Container_DependencyInjectMethod === 'Getter') {
                            Object.defineProperty(serviceIns, parameterKey, {
                                get: () => this.getService(id)
                            });
                        }
                    }
                }
                // 处理PostConstruct依赖
                if (postConstructDeps.length) {
                    for (const method of postConstructDeps) {
                        if (typeof serviceIns[method] === 'function')
                            serviceIns[method]();
                        else
                            throw new ioc_exception_1.PostConstructMethodNotFoundException(method, ServiceCtor.name);
                    }
                }
                // 返回服务实例
                return serviceIns;
            };
            if (dependencyInjectScope === 'Singleton')
                dependencyInjectServiceResult = generateService();
            if (dependencyInjectScope === 'Prototype')
                dependencyInjectServiceResult = generateService;
        }
        // 2. Constructor 构造函数注入
        if (dependencyInjectType === 'Constructor') {
            const generateService = () => {
                const that = this;
                // 通过继承的方式，将依赖注入到构造函数中
                class TempConstructorServiceCtor extends ServiceCtor {
                    constructor(...args) {
                        super(...args);
                        // 处理属性依赖
                        propertyDeps.forEach(({ id, parameterKey }) => {
                            // 当前注入方式有两种，一种是通过Object.defineProperty来实现，另一种是直接赋值。
                            if (ioc_constant_1.ContainerConstant.Container_DependencyInjectMethod === 'Property') {
                                this[parameterKey] = that.getService(id);
                            }
                            if (ioc_constant_1.ContainerConstant.Container_DependencyInjectMethod === 'Getter') {
                                Object.defineProperty(this, parameterKey, {
                                    get: () => that.getService(id)
                                });
                            }
                        });
                        // 处理PostConstruct依赖
                        if (postConstructDeps.length) {
                            for (const method of postConstructDeps) {
                                if (typeof this[method] === 'function')
                                    this[method]();
                                else
                                    throw new ioc_exception_1.PostConstructMethodNotFoundException(method, ServiceCtor.name);
                            }
                        }
                    }
                }
                // 标记为代理类
                Reflect.defineMetadata(ioc_constant_1.ContainerConstant.Container_MetadataKey_Injectable_Proxy_Class, true, TempConstructorServiceCtor);
                // 返回代理类
                return TempConstructorServiceCtor;
            };
            if (dependencyInjectScope === 'Singleton')
                dependencyInjectServiceResult = generateService();
            if (dependencyInjectScope === 'Prototype')
                dependencyInjectServiceResult = generateService;
        }
        return dependencyInjectServiceResult;
    }
}
exports.Container = Container;
/**
 * @description 服务注册器，在外部不使用装饰器的情况下，可以使用此方法注册服务
 * @author willye
 * @time 2023.03.31 20:10:21
 */
function registerService(id, Ctor) {
    if (ioc_constant_1.ContainerConstant.ServiceCtorStore.has(id))
        throw new ioc_exception_1.ServiceAlreadyRegisteredException(id);
    ioc_constant_1.ContainerConstant.ServiceCtorStore.set(id, Ctor);
}
exports.registerService = registerService;
//# sourceMappingURL=ioc.js.map