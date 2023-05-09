/**
 * @description Service Cyclic 循环引用错误
 * @author willye
 * @time 2023.03.31 20:09:29
 */
class CyclicDependencyException extends Error {
    constructor(graph) {
        var _a;
        super('Container cyclic dependency between services');
        this.message = (_a = graph.findCycleSlow()) !== null && _a !== void 0 ? _a : `UNABLE to detect cycle, dumping graph: \n${graph.toString()}`;
    }
}
/**
 * @description Service 未找到异常
 * @author willye
 * @time 2023.04.02 16:00:17
 */
class ServiceNotFoundException extends Error {
    constructor(serviceId) {
        super(`Container service [${serviceId.toString()}] not found!`);
    }
}
/**
 * @description Service 已经被注册异常
 * @author willye
 * @time 2023.04.02 16:13:47
 */
class ServiceAlreadyRegisteredException extends Error {
    constructor(serviceId) {
        super(`Container service [${serviceId.toString()}] already registered!`);
    }
}
/**
 * @description 不具名服务注入异常，仅支持Property Decorator，不支持Constructor Parameter Decorator
 * @author willye
 * @time 2023.04.03 09:55:50
 */
class InjectWithoutNameException {
    constructor(ctorName) {
        throw new Error(`Container inject Without-name module can not be used in constructor parameter decorator in class [${ctorName}]!`);
    }
}
/**
 * @description IOC全局Container代理之外自定义注入仅支持Property Decorator，不支持Constructor Decorator
 * @author willye
 * @time 2023.04.02 21:52:27
 */
class ServiceInjectableException {
    constructor(serviceName, serviceId) {
        throw new Error(`Container Customer Inject parameter decorator can not be used in constructor in class ${serviceName}::${serviceId.toString()}!`);
    }
}
/**
 * @description IOC服务注入异常，Scope可选值为Prototype，Singleton。且，Scope装饰器仅支持Class Decorator，不支持Constructor Parameter Decorator
 * @author willye
 * @time 2023.04.06 10:25:40
 */
class ServiceInjectScopeException {
    constructor(serviceId) {
        throw new Error(`Container inject Scope only support Prototype or Singleton in ${serviceId.toString()}.`);
    }
}
/**
 * @description PostConstruct装饰器异常
 * @author willye
 * @time 2023.04.06 12:03:46
 */
class PostConstructMethodNotFoundException {
    constructor(methodName, serviceId) {
        throw new Error(`Container PostConstruct method ${methodName} not found in ${serviceId.toString()}.`);
    }
}
export { ServiceInjectableException, CyclicDependencyException, ServiceNotFoundException, ServiceAlreadyRegisteredException, InjectWithoutNameException, ServiceInjectScopeException, PostConstructMethodNotFoundException };
//# sourceMappingURL=ioc.exception.js.map