"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostConstruct = exports.Inject = exports.Scope = exports.Tags = exports.InjectType = exports.Controller = exports.Repository = exports.Service = exports.Component = void 0;
const ioc_constant_1 = require("./ioc.constant");
const ioc_util_1 = require("./ioc.util");
const ioc_exception_1 = require("./ioc.exception");
/**
 * @description 【Injectable】注入模块类型为 Component
 * @author willye
 * @time 2023.03.31 20:10:26
 */
function Component(id) {
    return (Ctor) => {
        ioc_util_1.ContainerUtils.markModuleInjectable('Component', Ctor, id);
        Reflect.defineMetadata(ioc_constant_1.ContainerConstant.Container_MetadataKey_Component, true, Ctor);
        return Ctor;
    };
}
exports.Component = Component;
/**
 * @description 【Injectable】注入模块类型为 Component - Service
 * @author willye
 * @time 2023.03.31 20:10:26
 */
function Service(id) {
    return (Ctor) => {
        ioc_util_1.ContainerUtils.markModuleInjectable('Service', Ctor, id);
        Reflect.defineMetadata(ioc_constant_1.ContainerConstant.Container_MetadataKey_Component, true, Ctor);
        Reflect.defineMetadata(ioc_constant_1.ContainerConstant.Container_MetadataKey_Service, true, Ctor);
        return Ctor;
    };
}
exports.Service = Service;
/**
 * @description 【Injectable】注入模块类型为 Component - Repository
 * @author willye
 * @time 2023.03.31 20:10:26
 */
function Repository(id) {
    return (Ctor) => {
        ioc_util_1.ContainerUtils.markModuleInjectable('Repository', Ctor, id);
        Reflect.defineMetadata(ioc_constant_1.ContainerConstant.Container_MetadataKey_Component, true, Ctor);
        Reflect.defineMetadata(ioc_constant_1.ContainerConstant.Container_MetadataKey_Repository, true, Ctor);
        return Ctor;
    };
}
exports.Repository = Repository;
/**
 * @description 【Injectable】注入模块类型为 Component - Controller
 * @author willye
 * @time 2023.03.31 20:10:26
 */
function Controller(id) {
    return (Ctor) => {
        ioc_util_1.ContainerUtils.markModuleInjectable('Controller', Ctor, id);
        Reflect.defineMetadata(ioc_constant_1.ContainerConstant.Container_MetadataKey_Component, true, Ctor);
        Reflect.defineMetadata(ioc_constant_1.ContainerConstant.Container_MetadataKey_Controller, true, Ctor);
        return Ctor;
    };
}
exports.Controller = Controller;
/**
 * @description 【Injectable】服务注入类型，默认为 Instance 注入
 * @author willye
 * @time 2023.04.03 20:13:37
 */
function InjectType(type) {
    return (Ctor) => {
        Reflect.defineMetadata(ioc_constant_1.ContainerConstant.Container_MetadataKey_Injectable_Type, type, Ctor);
        return Ctor;
    };
}
exports.InjectType = InjectType;
/**
 * @description 【Injectable】为服务添加注入标签
 * @author willye
 * @time 2023.04.03 20:13:37
 */
function Tags(tags) {
    return (Ctor) => {
        Reflect.defineMetadata(ioc_constant_1.ContainerConstant.Container_MetadataKey_Dependency_Tag, tags, Ctor);
        return Ctor;
    };
}
exports.Tags = Tags;
/**
 * @description 【Scope】实例初始化模式，默认为 Singleton，可选 Singleton、Prototype。
 *
 * - Singleton 单例模式，适用于 **无状态服务** 。
 *    1. 一个服务只有一个实例
 *    2. 服务的实例会在容器初始化时创建
 *    3. 服务的实例会在容器销毁时销毁
 *
 * - Prototype 原型模式，适用于 **无有状态服务** 。
 *    1. 一个服务可以有多个实例
 *    2. 服务的实例会在每次被注入时创建
 *    3. 服务的实例会在容器销毁时销毁
 *
 * - 参考链接：https://www.tutorialspoint.com/spring/spring_bean_scopes.htm
 * @author willye
 * @time 2023.04.03 20:13:37
 */
function Scope(type = 'Singleton') {
    return (Ctor) => {
        Reflect.defineMetadata(ioc_constant_1.ContainerConstant.Container_MetadataKey_Dependency_Scope, type, Ctor);
        return Ctor;
    };
}
exports.Scope = Scope;
/**
 * @description 【Inject】服务注入器
 * @param id 服务唯一标识，如果不传入则默认为服务的类名
 * @author willye
 * @time 2023.03.31 20:10:35
 */
function Inject(id) {
    return function (Ctor, parameterKey, parameterIndex) {
        // 判断是否为不具名注入，不具名注入仅支持 Property 装饰器
        if (typeof parameterIndex === 'number' && !id) {
            throw new ioc_exception_1.InjectWithoutNameException(Ctor.name);
        }
        const serviceId = id || parameterKey || Ctor.name.slice(0, 1).toLowerCase().concat(Ctor.name.slice(1)); // 注：将此处改为类名首字母小写是由于元数据获取到的类名首字母是小写的，所以这里也要保持一致
        // 元数据结构体封装，暂时未使用到，后续可能会用到
        // const metadata = new ContainerMetadata(ContainerConstant.Container_MetadataKey_Inject, serviceId);
        // 直接从缓存实例中获取，此处逻辑适用于开发人员自己手动实例化服务并添加到缓存中的情况，不是很推荐这种方式，因为这种方式不利于服务的管理。
        // if (ContainerConstant.Container_CacheServiceInstance_Enabled && ContainerConstant.ServiceCtorStoreInstance.has(serviceId)) {
        //   // 不支持参数注入
        //   if (typeof parameterIndex === 'number') {
        //     const serviceName = Ctor.name;
        //     throw new ServiceInjectableException(serviceName, serviceId);
        //   }
        //   // 支持属性注入
        //   else {
        //     Object.defineProperty(Ctor, parameterKey, {
        //       get() {
        //         return ContainerConstant.ServiceCtorStoreInstance.get(serviceId);
        //       }
        //     });
        //   }
        //   return;
        // }
        // 1. Parameter decorator 参数装饰器
        if (typeof parameterIndex === 'number') {
            const constructor = Ctor;
            // 设置依赖类型为 Parameter
            Reflect.defineMetadata(ioc_constant_1.ContainerConstant.Container_MetadataKey_Dependency_Type_Parameter, true, constructor);
            if (Reflect.hasOwnMetadata(ioc_constant_1.ContainerConstant.Container_MetadataKey_Dependency_Parameter, constructor)) {
                const dependencies = Reflect.getOwnMetadata(ioc_constant_1.ContainerConstant.Container_MetadataKey_Dependency_Parameter, constructor);
                Reflect.defineMetadata(ioc_constant_1.ContainerConstant.Container_MetadataKey_Dependency_Parameter, [...dependencies, { id: serviceId, parameterKey, parameterIndex }], constructor);
            }
            else {
                Reflect.defineMetadata(ioc_constant_1.ContainerConstant.Container_MetadataKey_Dependency_Parameter, [{ id: serviceId, parameterKey, parameterIndex }], constructor);
            }
        }
        // 2. Property decorator 属性装饰器
        else {
            const constructor = Ctor.constructor;
            // 设置依赖类型为 Property
            Reflect.defineMetadata(ioc_constant_1.ContainerConstant.Container_MetadataKey_Dependency_Type_Property, true, constructor);
            if (Reflect.hasOwnMetadata(ioc_constant_1.ContainerConstant.Container_MetadataKey_Dependency_Property, constructor)) {
                const dependencies = Reflect.getOwnMetadata(ioc_constant_1.ContainerConstant.Container_MetadataKey_Dependency_Property, constructor);
                Reflect.defineMetadata(ioc_constant_1.ContainerConstant.Container_MetadataKey_Dependency_Property, [...dependencies, { id: serviceId, parameterKey, parameterIndex }], constructor);
            }
            else {
                Reflect.defineMetadata(ioc_constant_1.ContainerConstant.Container_MetadataKey_Dependency_Property, [{ id: serviceId, parameterKey, parameterIndex }], constructor);
            }
        }
    };
}
exports.Inject = Inject;
/**
 * @description PostConstruct 生命周期钩子，服务初始化后执行
 *
 * - 该装饰器仅支持方法注入
 * - 该装饰器会在服务初始化后执行，且只会执行一次
 * - 该装饰器能够定义到多个方法上，会按照定义的先后顺序执行
 *
 * @author willye
 * @time 2023.04.06 11:46:29
 */
function PostConstruct(Ctor, methodName) {
    const constructor = Ctor.constructor;
    Reflect.defineMetadata(ioc_constant_1.ContainerConstant.Container_MetadataKey_Dependency_Type_PostConstruct, true, constructor);
    if (Reflect.hasOwnMetadata(ioc_constant_1.ContainerConstant.Container_MetadataKey_Dependency_PostConstruct, constructor)) {
        const postConstructs = Reflect.getOwnMetadata(ioc_constant_1.ContainerConstant.Container_MetadataKey_Dependency_PostConstruct, constructor);
        Reflect.defineMetadata(ioc_constant_1.ContainerConstant.Container_MetadataKey_Dependency_PostConstruct, [...postConstructs, methodName], constructor);
    }
    else {
        Reflect.defineMetadata(ioc_constant_1.ContainerConstant.Container_MetadataKey_Dependency_PostConstruct, [methodName], constructor);
    }
}
exports.PostConstruct = PostConstruct;
//# sourceMappingURL=ioc.decorator.js.map