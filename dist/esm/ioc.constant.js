/**
 * @description IOC Container容器内部使用的常量
 * @author willye
 * @time 2023.04.02 13:01:58
 */
class ContainerConstant {
}
ContainerConstant.IOC_INTERNAL_SERVICE_ID = Symbol('##IOC:Internal:Container##');
ContainerConstant.ServiceCtorStore = new Map();
ContainerConstant.ServiceCtorStoreInstance = new Map();
// new Container(options) Options参数信息
// public static Container_CacheServiceInstance_Enabled = true; // 是否开启缓存，开启之后能够在第二次获取服务时直接返回缓存的实例 且 未处于Container管理的模块下也能够正常使用
ContainerConstant.Container_DependencyInjectMethod = 'Property'; // 依赖注入的方式，Property表示通过属性注入，Getter表示通过Getter注入
// Reflect默认的元数据key
ContainerConstant.Reflect_MetadataKey_Type = 'design:type';
ContainerConstant.Reflect_MetadataKey_ParamTypes = 'design:paramtypes';
// Container装饰器元数据相关
ContainerConstant.Container_MetadataKey_Dependency_Type_Parameter = '##IOC:Dependency:MetadataKey:Type:Parameter##';
ContainerConstant.Container_MetadataKey_Dependency_Type_Property = '##IOC:Dependency:MetadataKey:Type:Property##';
ContainerConstant.Container_MetadataKey_Dependency_Type_PostConstruct = '##IOC:Dependency:MetadataKey:Type:PostConstruct##';
ContainerConstant.Container_MetadataKey_Dependency_Parameter = Symbol('##IOC:Dependency:MetadataKey:Parameter##');
ContainerConstant.Container_MetadataKey_Dependency_Property = Symbol('##IOC:Dependency:MetadataKey:Property##');
ContainerConstant.Container_MetadataKey_Dependency_Tag = Symbol('##IOC:Dependency:MetadataKey:Tag##');
ContainerConstant.Container_MetadataKey_Dependency_Scope = Symbol('##IOC:Dependency:MetadataKey:Scope##');
ContainerConstant.Container_MetadataKey_Dependency_PostConstruct = Symbol('##IOC:Dependency:MetadataKey:PostConstruct##');
ContainerConstant.Container_MetadataKey_Injectable = Symbol('container:injectable');
ContainerConstant.Container_MetadataKey_Injectable_Name = Symbol('container:injectable:name');
ContainerConstant.Container_MetadataKey_Injectable_Type = Symbol('container:injectable:type');
ContainerConstant.Container_MetadataKey_Injectable_Proxy_Class = Symbol('container:injectable:proxy:class'); // 标识当前类是否为代理类
// Container Component相关
ContainerConstant.Container_MetadataKey_Component = Symbol('container:component');
ContainerConstant.Container_MetadataKey_Service = Symbol('container:component:service');
ContainerConstant.Container_MetadataKey_Controller = Symbol('container:component:controller');
ContainerConstant.Container_MetadataKey_Repository = Symbol('container:component:repository');
ContainerConstant.Container_MetadataKey_Inject = Symbol('container:inject');
ContainerConstant.Container_MetadataKey_ParamTypes = Symbol('container:paramtypes');
export { ContainerConstant };
/**
 * @description IOC Container Metadata数据类
 * @author willye
 * @time 2023.04.02 16:42:39
 */
export class ContainerMetadata {
    constructor(key, value) {
        this.key = key;
        this.value = value;
    }
    toString() {
        return `Metadata: { key:${this.key.toString()}, value: ${this.value} }`;
    }
}
//# sourceMappingURL=ioc.constant.js.map