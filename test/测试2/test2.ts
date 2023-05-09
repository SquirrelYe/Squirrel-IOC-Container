import { Service, Inject, InjectType, Container, ContainerConstant } from '../../src/index';

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
