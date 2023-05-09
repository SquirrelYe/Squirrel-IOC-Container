/**
 * @description Squirrel Dependency IOC Container
 * @author willye
 * @time 2023.04.03 10:31:14
 */

export { Container, registerService } from './ioc';
export { ContainerConstant, ContainerMetadata } from './ioc.constant';
export { Component, Service, Repository, Controller, Inject, InjectType, Scope, Tags, PostConstruct } from './ioc.decorator';

// 类型定义导出
export { ServiceUniqueId, ServiceCtor, GraphNodeElement, DependenciesValue, DependenciesValueItem, DependencyInjectType, DependencyInjectScope, ServiceCtorStoreInstanceItem } from './ioc.type';
