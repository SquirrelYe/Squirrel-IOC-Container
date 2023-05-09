import { ServiceUniqueId, ServiceCtorStoreInstanceItem } from './ioc.type';
/**
 * @description IOC Container容器内部使用的常量
 * @author willye
 * @time 2023.04.02 13:01:58
 */
export declare class ContainerConstant {
    static readonly IOC_INTERNAL_SERVICE_ID: unique symbol;
    static readonly ServiceCtorStore: Map<ServiceUniqueId, any>;
    static readonly ServiceCtorStoreInstance: Map<ServiceUniqueId, ServiceCtorStoreInstanceItem>;
    static Container_DependencyInjectMethod: 'Property' | 'Getter';
    static readonly Reflect_MetadataKey_Type = "design:type";
    static readonly Reflect_MetadataKey_ParamTypes = "design:paramtypes";
    static readonly Container_MetadataKey_Dependency_Type_Parameter = "##IOC:Dependency:MetadataKey:Type:Parameter##";
    static readonly Container_MetadataKey_Dependency_Type_Property = "##IOC:Dependency:MetadataKey:Type:Property##";
    static readonly Container_MetadataKey_Dependency_Type_PostConstruct = "##IOC:Dependency:MetadataKey:Type:PostConstruct##";
    static readonly Container_MetadataKey_Dependency_Parameter: unique symbol;
    static readonly Container_MetadataKey_Dependency_Property: unique symbol;
    static readonly Container_MetadataKey_Dependency_Tag: unique symbol;
    static readonly Container_MetadataKey_Dependency_Scope: unique symbol;
    static readonly Container_MetadataKey_Dependency_PostConstruct: unique symbol;
    static readonly Container_MetadataKey_Injectable: unique symbol;
    static readonly Container_MetadataKey_Injectable_Name: unique symbol;
    static readonly Container_MetadataKey_Injectable_Type: unique symbol;
    static readonly Container_MetadataKey_Injectable_Proxy_Class: unique symbol;
    static readonly Container_MetadataKey_Component: unique symbol;
    static readonly Container_MetadataKey_Service: unique symbol;
    static readonly Container_MetadataKey_Controller: unique symbol;
    static readonly Container_MetadataKey_Repository: unique symbol;
    static readonly Container_MetadataKey_Inject: unique symbol;
    static readonly Container_MetadataKey_ParamTypes: unique symbol;
}
/**
 * @description IOC Container Metadata数据类
 * @author willye
 * @time 2023.04.02 16:42:39
 */
export declare class ContainerMetadata {
    key: string | Symbol;
    value: any;
    constructor(key: string | Symbol, value: any);
    toString(): string;
}
//# sourceMappingURL=ioc.constant.d.ts.map