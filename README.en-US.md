# Squirrel IOC Container

<p align="left">
  <a href="https://npmjs.com/package/vite"><img src="https://img.shields.io/npm/v/@squirreljs/squirre-ioc-container.svg" alt="npm package"></a>
  <a href="https://nodejs.org/en/about/releases/"><img src="https://img.shields.io/node/v/@squirreljs/squirre-ioc-container.svg" alt="node compatibility"></a>
</p>

<p align="center">
  <a href="README.md">简体中文</a> | 
  <a href="README.zh-TW.md">繁體中文</a> | 
  <a href="README.en-US.md">English</a> 
</p>

🎉 Squirrel IOC Container (Dependency Inject) is an IoC container library implemented based on TypeScript. It can help developers better manage dependency injection, reduce coupling between codes, and improve code maintainability. Squirrel IOC Container provides an easy-to-use API that makes dependency injection and inversion of control easy. If you are looking for an efficient and easy-to-use IoC container library, then Squirrel IOC Container is definitely your best choice.

## Easy to master dependency injection - Squirrel IOC Container

- 🐿️ Hello everyone! Today I'm going to introduce a very useful TS IOC container library, its name is Squirrel IOC Container. 🌰
- 💻 If you are a web developer, then you must know the importance of dependency injection (DI) in programming. And Squirrel IOC Container is one of the tools to facilitate our dependency injection. 👨‍💻
- 👍 This library is easy to use and the code is clear and easy to understand, which can help us manage various dependencies more flexibly. It also provides various features such as automatic injection, circular dependency resolution, namespace function and so on. 🤩
- 📚 If you want to learn more about Squirrel IOC Container and dependency injection, its GitHub page has detailed documentation and sample code for your reference. 😎
- 👉 So, if you are looking for an efficient and easy-to-use IOC container library, try Squirrel IOC Container! 🐿️

## introduce

The functions currently implemented are:

1. Dependency tags: Currently, four types of decorator tags are provided: **@Component**, **@Service**, **@Controller**, **@Repository**, which can be obtained in the container after marking To the instance (supports **named/anonymous** tags, and the unnamed is injected in lowercase by default); `Note: @Component('ID') is a general Component decorator, used to identify a class as Component, Service, Controller, Repository is an extended implementation of Component`.
2. Dependency injection: **@Inject** decorator injection, supports **Constructor** injection and **Property** injection (Note: Constructor injection only supports named module injection);
3. Injection method: support configuration selection injection method, currently supports **Property** and **Getter** injection ( **dependencyInstanceInjectMethod** configuration item);
4. Circular dependency detection: When initializing the container and loading the instance, it will **detect the circular dependency**, if there is a circular dependency, an exception will be thrown;
5. Complete exception detection: **ServiceInjectableException, CyclicDependencyException, ServiceNotFoundException, ServiceAlreadyRegisteredException, InjectWithoutNameException**;
6. Proxy its own container instance: **inject its own container instance** into the container, and other service instances can be obtained through the container instance;
7. Scope injection: supports singleton injection **@Scope('Singleton')** and each injection **@Scope('Prototype')** two modes, the default is singleton injection;
8. Life cycle injection: support **@PostConstruct** to be executed after the service is instantiated, can be bound to multiple methods and executed sequentially according to the defined order;

## Instructions

```typescript
import { Service, Inject, InjectType, Container, ContainerConstant } from '@squirreljs/squirre-ioc-container';

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
  @Inject() readonly service3: Service3; // 注入无名属性
  constructor(@Inject('ServiceIdentifier2') readonly service2: Service2) {} // 构造函数注入具名属性
}

// 创建代理容器实例
const IocContainer = new Container({ dependencyInstanceInjectMethod: 'Property' });
IocContainer.init(); // 初始化IOC容器，此方法会自动初始化所有已注册的服务并且执行一次循环检测，方便开发者在开发阶段发现循环依赖问题

// 测试实例
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

## License

SquirrelJS © 2023 - [MIT License](LICENSE)
