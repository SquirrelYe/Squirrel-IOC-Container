import type { ServiceUniqueId, ServiceCtor, DependencyInjectType, DependencyInjectScope } from './ioc.type';
/**
 * @description 【Injectable】注入模块类型为 Component
 * @author willye
 * @time 2023.03.31 20:10:26
 */
export declare function Component(id?: ServiceUniqueId): (Ctor: ServiceCtor) => any;
/**
 * @description 【Injectable】注入模块类型为 Component - Service
 * @author willye
 * @time 2023.03.31 20:10:26
 */
export declare function Service(id?: ServiceUniqueId): (Ctor: ServiceCtor) => any;
/**
 * @description 【Injectable】注入模块类型为 Component - Repository
 * @author willye
 * @time 2023.03.31 20:10:26
 */
export declare function Repository(id?: ServiceUniqueId): (Ctor: ServiceCtor) => any;
/**
 * @description 【Injectable】注入模块类型为 Component - Controller
 * @author willye
 * @time 2023.03.31 20:10:26
 */
export declare function Controller(id?: ServiceUniqueId): (Ctor: ServiceCtor) => any;
/**
 * @description 【Injectable】服务注入类型，默认为 Instance 注入
 * @author willye
 * @time 2023.04.03 20:13:37
 */
export declare function InjectType(type: DependencyInjectType): (Ctor: ServiceCtor) => any;
/**
 * @description 【Injectable】为服务添加注入标签
 * @author willye
 * @time 2023.04.03 20:13:37
 */
export declare function Tags(tags: Array<Symbol | string | number | Record<string, any>>): (Ctor: ServiceCtor) => any;
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
export declare function Scope(type?: DependencyInjectScope): (Ctor: ServiceCtor) => any;
/**
 * @description 【Inject】服务注入器
 * @param id 服务唯一标识，如果不传入则默认为服务的类名
 * @author willye
 * @time 2023.03.31 20:10:35
 */
export declare function Inject(id?: ServiceUniqueId): (Ctor: ServiceCtor, parameterKey: string, parameterIndex?: number) => void;
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
export declare function PostConstruct(Ctor: ServiceCtor, methodName: string): void;
//# sourceMappingURL=ioc.decorator.d.ts.map