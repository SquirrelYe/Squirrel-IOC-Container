# Squirrel Dependency Inject IOC Container

🎉 Squirrel IOC Container 是一款基于 TypeScript 实现的 IoC 容器库。它可以帮助开发者更好地管理依赖注入，降低代码之间的耦合度，提高代码的可维护性。Squirrel IOC Container 提供了一个简单易用的 API，可以轻松地实现依赖注入和控制反转。如果您正在寻找一款高效、易用的 IoC 容器库，那么 Squirrel IOC Container 绝对是您的不二之选。

## 轻松掌握依赖注入——Squirrel IOC Container

🐿️ 大家好呀！今天我要来介绍一个非常好用的 TS IOC 容器库，它的名字叫做 Squirrel IOC Container。 🌰
💻 如果你是一名 Web 开发者，那么你一定知道依赖注入（DI）在程序设计中的重要性。而 Squirrel IOC Container 就是为了方便我们进行依赖注入的工具之一。 👨‍💻
👍 这个库使用简单，代码清晰易懂，可以帮助我们更加灵活地管理各种依赖关系。它还提供了自动注入、循环依赖解决、命名空间功能等多种特性。 🤩
📚 如果你想深入了解 Squirrel IOC Container 和依赖注入的相关知识，它的 GitHub 页面上有详细的文档和示例代码供你参考。 😎
👉 所以，如果你正在寻找一款高效易用的 IOC 容器库，不妨试试 Squirrel IOC Container 吧！ 🐿️

## 介绍

目前已经实现的功能有：

1. 依赖标记：目前提供了：**@Component**，**@Service**，**@Controller**，**@Repository** 四种类装饰器标记，标记之后即可在容器中获取到实例（支持 **具名/无名** 标记，无名默认按照类型小写注入）；`注：@Component('ID') 为通用的 Component 装饰器，用于标识一个类为 Component，Service、Controller、Repository 都是 Component 的拓展实现`。
2. 依赖注入：**@Inject** 装饰器注入，支持 **Constructor** 注入和 **Property** 注入（注：Constructor 注入仅支持具名模块注入）；
3. 注入方法：支持配置选择注入方式，目前支持 **Property** 和 **Getter** 注入（ **dependencyInstanceInjectMethod** 配置项）；
4. 循环依赖检测：在初始化容器时、加载实例时会 **检测循环依赖** ，如果存在循环依赖则会抛出异常；
5. 完备的异常检测：**ServiceInjectableException, CyclicDependencyException, ServiceNotFoundException, ServiceAlreadyRegisteredException, InjectWithoutNameException**；
6. 代理自身容器实例：在容器中 **注入自身容器实例** ，可以通过容器实例获取到其他服务实例；
7. 作用域注入：支持单例注入 **@Scope('Singleton')** 和每次注入 **@Scope('Prototype')** 两种模式，默认为单例注入；
8. 生命周期注入：支持 **@PostConstruct** 在服务实例化之后执行，能够绑定到多个方法上并按照定义的顺序依次执行；

## 使用方法

```typescript
// Path: src/ioc/container.ts
import { Service, Inject, InjectType, Container, ContainerConstant } from '@squirrel/squirre-ioc-container';

@Service()
class Service3 {
  test() {
    console.log('Service3 test');
  }
}

@Service('ServiceIdentifier2')
class Service2 {
  test() {
    console.log('Service2 test');
  }
}

@Service()
class Service1 {
  @Inject() readonly service3: Service3; // 属性注入无名服务
  constructor(@Inject('ServiceIdentifier2') readonly service2: Service2) {} // 构造函数注入具名服务
}

// 创建代理容器实例
const IocContainer = new Container({ dependencyInstanceInjectMethod: 'Property' });
IocContainer.init(); // 初始化IOC容器，此方法会自动初始化所有已注册的服务并且执行一次循环检测，方便开发者在开发阶段发现循环依赖问题

// 测试测试实例
@Service('TestService')
@InjectType('Constructor')
class Test {
  @Inject(ContainerConstant.IOC_INTERNAL_SERVICE_ID) public readonly serviceInternal: Container; // 注入代理容器实例
  @Inject() private readonly service1: Service1; // 无名属性注入

  constructor(public readonly Prop1: string) {}

  test() {
    console.log('\n Test Prop -> Prop1 ', this.Prop1);
    console.log('\n Test Prop -> service1 ', this.service1);
    console.log('\n Test Prop -> this ', IocContainer.services);
  }
}

// 执行测试
const TestServiceConstructor = IocContainer.getService<typeof Test>('TestService');
const TestServiceInstance = new TestServiceConstructor('Prop From IOC Container Constructor');
TestServiceInstance.test();
```

## 注意

当前方案需要将 `tsconfig.json` 中的 `useDefineForClassFields` 设置为 `false`，否则会导致 `@Inject` 装饰器无法正常工作。

> useDefineForClassFields: Default: true if target is ES2022 or higher, including ESNext, false otherwise.
> 参考：https://www.typescriptlang.org/tsconfig#useDefineForClassFields
