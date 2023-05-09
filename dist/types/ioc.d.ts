import 'reflect-metadata';
import type { ContainerOptions, ServiceUniqueId, ServiceCtor, DependenciesValue, ServiceCtorStoreInstanceItem } from './ioc.type';
/**
 * @description IOC Container容器
 * @author willye
 * @time 2023.03.31 20:09:57
 */
export declare class Container {
    constructor(options?: ContainerOptions);
    get services(): Map<ServiceUniqueId, ServiceCtorStoreInstanceItem>;
    init(): void;
    registerServiceInstance(id: ServiceUniqueId, service: ServiceCtorStoreInstanceItem): void;
    getService<S = any>(id: ServiceUniqueId): S;
    createAndCacheService<S = any>(serviceId: ServiceUniqueId): S;
    getServiceDependencies(Ctor: ServiceCtor): DependenciesValue;
    getServiceCtorById(id: ServiceUniqueId): ServiceCtor;
    private getDependencyInstanceByInjectType;
}
/**
 * @description 服务注册器，在外部不使用装饰器的情况下，可以使用此方法注册服务
 * @author willye
 * @time 2023.03.31 20:10:21
 */
export declare function registerService(id: ServiceUniqueId, Ctor: ServiceCtor): void;
//# sourceMappingURL=ioc.d.ts.map