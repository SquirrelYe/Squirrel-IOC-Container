import * as containers from '../../src/index';

// 定义服务3
@containers.Service()
class Service3 {
  test() {
    console.log('Service3 test');
  }
}

// 定义服务2
@containers.Service('ServiceIdentifier2')
class Service2 {
  test() {
    console.log('Service2 test');
  }
}

// 定义服务1
@containers.Service()
class Service1 {
  @containers.Inject() readonly service3: Service3; // 无名属性注入
  constructor(@containers.Inject('ServiceIdentifier2') readonly service2: Service2) {} // 具名构造函数注入
}

// 创建代理容器实例
const IocContainer = new containers.Container();
IocContainer.init(); // 初始化IOC容器，此方法会自动初始化所有已注册的服务并且执行一次循环检测，方便开发者在开发阶段发现循环依赖问题

console.log('All IOC Services: \n', IocContainer.services);

// 测试代理容器实例
class Test {
  @containers.Inject(containers.ContainerConstant.IOC_INTERNAL_SERVICE_ID) public readonly serviceInternal: containers.Container; // 注入代理容器实例
  @containers.Inject() private readonly service1: Service1; // 无名属性注入

  constructor(public readonly Prop1: string) {}

  test() {
    console.log('Test Prop -> service1 ', this.service1);
    console.log('Test Prop -> this ', this, IocContainer.services);
  }
}

new Test('Prop 1').test();
