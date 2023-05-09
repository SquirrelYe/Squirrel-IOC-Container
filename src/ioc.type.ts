/**
 * @description IOC Container容器类型定义
 * @author willye
 * @time 2023.04.02 13:01:23
 */

export type ServiceUniqueId = string | Symbol;
export type ServiceCtor = any;
export type GraphNodeElement = { serviceId: ServiceUniqueId; ctor: ServiceCtor };
export type DependenciesValueItem = { id: string; parameterKey: string; parameterIndex: number };
export type DependenciesValue = { propertyDeps: Array<DependenciesValueItem>; parameterDeps: Array<DependenciesValueItem>; postConstructDeps: Array<string> };
export type DependencyInjectType = 'Instance' | 'ConstantValue' | 'DynamicValue' | 'Constructor' | 'Factory' | 'Function' | 'Self' | 'Service';
export type DependencyInjectScope = 'Singleton' | 'Prototype';
export interface ServiceCtorStoreInstanceItem {
  service: any;
  type: DependencyInjectType;
  scope: DependencyInjectScope;
}
export interface ContainerOptions {
  dependencyInstanceInjectMethod?: 'Property' | 'Getter';
}
