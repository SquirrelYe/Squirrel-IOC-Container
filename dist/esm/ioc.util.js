import { ContainerConstant } from './ioc.constant';
import { ServiceAlreadyRegisteredException } from './ioc.exception';
/**
 * @description IOC Container 工具函数定义
 * @author willye
 * @time 2023.04.06 11:29:34
 */
class ContainerUtils {
    /**
     * @description 标记服务为可注入模式，ID默认为类名，建议统一常量定义，传入Symbol防止命名冲突。
     * @author willye
     * @time 2023.04.03 08:50:24
     */
    static markModuleInjectable(type, Ctor, id) {
        const serviceId = id || Ctor.name.slice(0, 1).toLowerCase().concat(Ctor.name.slice(1)); // 注：将此处改为类名首字母小写是由于元数据获取到的类名首字母是小写的，所以这里也要保持一致
        // 通过元数据 + 缓存实例的方式，防止重复注册
        const isRegisteredMetadata = type === 'Component'
            ? Reflect.getMetadata(ContainerConstant.Container_MetadataKey_Component, Ctor)
            : type === 'Service'
                ? Reflect.getMetadata(ContainerConstant.Container_MetadataKey_Service, Ctor)
                : type === 'Repository'
                    ? Reflect.getMetadata(ContainerConstant.Container_MetadataKey_Repository, Ctor)
                    : type === 'Controller'
                        ? Reflect.getMetadata(ContainerConstant.Container_MetadataKey_Controller, Ctor)
                        : false;
        const isRegistered = isRegisteredMetadata || ContainerConstant.ServiceCtorStore.has(serviceId);
        if (isRegistered)
            throw new ServiceAlreadyRegisteredException(serviceId);
        Reflect.defineMetadata(ContainerConstant.Container_MetadataKey_Injectable, true, Ctor);
        Reflect.defineMetadata(ContainerConstant.Container_MetadataKey_Injectable_Name, serviceId, Ctor);
        ContainerConstant.ServiceCtorStore.set(serviceId, Ctor);
        return Ctor;
    }
    /**
     * @description 从注入的元数据获取服务的依赖列表
     * @author willye
     * @time 2023.04.06 12:42:49
     */
    static getDependenciesFromMetadata(Ctor) {
        var _a, _b, _c;
        const isMetadataParameterType = (_a = Reflect.getMetadata(ContainerConstant.Container_MetadataKey_Dependency_Type_Parameter, Ctor)) !== null && _a !== void 0 ? _a : false;
        const isMetadataPropertyType = (_b = Reflect.getMetadata(ContainerConstant.Container_MetadataKey_Dependency_Type_Property, Ctor)) !== null && _b !== void 0 ? _b : false;
        const isMetadataPostConstructType = (_c = Reflect.getMetadata(ContainerConstant.Container_MetadataKey_Dependency_Type_PostConstruct, Ctor)) !== null && _c !== void 0 ? _c : false;
        // Parameter 依赖注入
        const dependencies = { propertyDeps: [], parameterDeps: [], postConstructDeps: [] };
        if (isMetadataParameterType) {
            const parameterDeps = Reflect.getMetadata(ContainerConstant.Container_MetadataKey_Dependency_Parameter, Ctor);
            dependencies.parameterDeps = parameterDeps || [];
        }
        // Property 依赖注入
        if (isMetadataPropertyType) {
            const propertyDeps = Reflect.getMetadata(ContainerConstant.Container_MetadataKey_Dependency_Property, Ctor);
            dependencies.propertyDeps = propertyDeps || [];
        }
        // PostConstruct 依赖注入
        if (isMetadataPostConstructType) {
            const postConstructDeps = Reflect.getMetadata(ContainerConstant.Container_MetadataKey_Dependency_PostConstruct, Ctor);
            dependencies.postConstructDeps = postConstructDeps || [];
        }
        return dependencies;
    }
}
export { ContainerUtils };
//# sourceMappingURL=ioc.util.js.map