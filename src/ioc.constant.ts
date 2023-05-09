import { ServiceUniqueId, ServiceCtor, ServiceCtorStoreInstanceItem } from './ioc.type';

/**
 * @description IOC Container容器内部使用的常量
 * @author willye
 * @time 2023.04.02 13:01:58
 */
export class ContainerConstant {
  public static readonly IOC_INTERNAL_SERVICE_ID = Symbol('##IOC:Internal:Container##');
  public static readonly ServiceCtorStore = new Map<ServiceUniqueId, ServiceCtor>();
  public static readonly ServiceCtorStoreInstance = new Map<ServiceUniqueId, ServiceCtorStoreInstanceItem>();

  // new Container(options) Options参数信息
  public static Container_CacheServiceInstance_Enabled = true; // 是否开启缓存，开启之后能够在第二次获取服务时直接返回缓存的实例 且 未处于Container管理的模块下也能够正常使用
  public static Container_DependencyInjectMethod: 'Property' | 'Getter' = 'Property'; // 依赖注入的方式，Property表示通过属性注入，Getter表示通过Getter注入

  // Reflect默认的元数据key
  public static readonly Reflect_MetadataKey_Type = 'design:type';
  public static readonly Reflect_MetadataKey_ParamTypes = 'design:paramtypes';

  // Container装饰器元数据相关
  public static readonly Container_MetadataKey_Dependency_Type_Parameter = '##IOC:Dependency:MetadataKey:Type:Parameter##';
  public static readonly Container_MetadataKey_Dependency_Type_Property = '##IOC:Dependency:MetadataKey:Type:Property##';
  public static readonly Container_MetadataKey_Dependency_Type_PostConstruct = '##IOC:Dependency:MetadataKey:Type:PostConstruct##';

  public static readonly Container_MetadataKey_Dependency_Parameter = Symbol('##IOC:Dependency:MetadataKey:Parameter##');
  public static readonly Container_MetadataKey_Dependency_Property = Symbol('##IOC:Dependency:MetadataKey:Property##');
  public static readonly Container_MetadataKey_Dependency_Tag = Symbol('##IOC:Dependency:MetadataKey:Tag##');
  public static readonly Container_MetadataKey_Dependency_Scope = Symbol('##IOC:Dependency:MetadataKey:Scope##');
  public static readonly Container_MetadataKey_Dependency_PostConstruct = Symbol('##IOC:Dependency:MetadataKey:PostConstruct##');

  public static readonly Container_MetadataKey_Injectable = Symbol('container:injectable');
  public static readonly Container_MetadataKey_Injectable_Name = Symbol('container:injectable:name');
  public static readonly Container_MetadataKey_Injectable_Type = Symbol('container:injectable:type');
  public static readonly Container_MetadataKey_Injectable_Proxy_Class = Symbol('container:injectable:proxy:class'); // 标识当前类是否为代理类

  // Container Component相关
  public static readonly Container_MetadataKey_Component = Symbol('container:component');
  public static readonly Container_MetadataKey_Service = Symbol('container:component:service');
  public static readonly Container_MetadataKey_Controller = Symbol('container:component:controller');
  public static readonly Container_MetadataKey_Repository = Symbol('container:component:repository');

  public static readonly Container_MetadataKey_Inject = Symbol('container:inject');
  public static readonly Container_MetadataKey_ParamTypes = Symbol('container:paramtypes');
}

/**
 * @description IOC Container Metadata数据类
 * @author willye
 * @time 2023.04.02 16:42:39
 */
export class ContainerMetadata {
  public key: string | Symbol;
  public value: any;

  public constructor(key: string | Symbol, value: any) {
    this.key = key;
    this.value = value;
  }

  public toString() {
    return `Metadata: { key:${this.key.toString()}, value: ${this.value} }`;
  }
}
