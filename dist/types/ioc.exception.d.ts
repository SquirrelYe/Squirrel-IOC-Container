import { Graph } from './ioc.graph';
import type { ServiceUniqueId } from './ioc.type';
/**
 * @description Service Cyclic 循环引用错误
 * @author willye
 * @time 2023.03.31 20:09:29
 */
declare class CyclicDependencyException extends Error {
    constructor(graph: Graph<any>);
}
/**
 * @description Service 未找到异常
 * @author willye
 * @time 2023.04.02 16:00:17
 */
declare class ServiceNotFoundException extends Error {
    constructor(serviceId: ServiceUniqueId);
}
/**
 * @description Service 已经被注册异常
 * @author willye
 * @time 2023.04.02 16:13:47
 */
declare class ServiceAlreadyRegisteredException extends Error {
    constructor(serviceId: ServiceUniqueId);
}
/**
 * @description 不具名服务注入异常，仅支持Property Decorator，不支持Constructor Parameter Decorator
 * @author willye
 * @time 2023.04.03 09:55:50
 */
declare class InjectWithoutNameException {
    constructor(ctorName: string);
}
/**
 * @description IOC全局Container代理之外自定义注入仅支持Property Decorator，不支持Constructor Decorator
 * @author willye
 * @time 2023.04.02 21:52:27
 */
declare class ServiceInjectableException {
    constructor(serviceName: string, serviceId: ServiceUniqueId);
}
/**
 * @description IOC服务注入异常，Scope可选值为Prototype，Singleton。且，Scope装饰器仅支持Class Decorator，不支持Constructor Parameter Decorator
 * @author willye
 * @time 2023.04.06 10:25:40
 */
declare class ServiceInjectScopeException {
    constructor(serviceId: ServiceUniqueId);
}
/**
 * @description PostConstruct装饰器异常
 * @author willye
 * @time 2023.04.06 12:03:46
 */
declare class PostConstructMethodNotFoundException {
    constructor(methodName: string, serviceId: ServiceUniqueId);
}
export { ServiceInjectableException, CyclicDependencyException, ServiceNotFoundException, ServiceAlreadyRegisteredException, InjectWithoutNameException, ServiceInjectScopeException, PostConstructMethodNotFoundException };
//# sourceMappingURL=ioc.exception.d.ts.map