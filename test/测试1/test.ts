import { Container, Service, Inject } from '../../src/index';
import { registerService } from '../../src/index';
import { ContainerConstant, ContainerMetadata } from '../../src/ioc.constant';

import Service1 from './service1';
// import Service2 from './service2';
// import Service3 from './service3';
// import Main from './main';

// const ioc = new Container();
// ioc.init(); // 初始化IOC容器，此方法会自动初始化所有已注册的服务并且执行一次循环检测，方便开发者在开发阶段发现循环依赖问题
// console.log('call in test ioc --->', ioc.services);

// ioc.getService('main').test();
// console.log(ioc.getService('main'));
// ioc.getService('3').test();
// console.log('All IOC Services: \n', ioc.services);

class Test {
  // @Inject(ContainerConstant.IOC_INTERNAL_SERVICE_ID) public readonly serviceInternal: Container;
  // @Inject('main') private readonly main: Main;
  @Inject() private readonly service1: Service1;
  // @Inject('2') readonly service2: Service2;
  // @Inject('3') readonly service3: Service3;

  constructor(public readonly Prop1: string) {}

  test() {
    console.log('Test Prop -> service1 ', this.service1);
    console.log('Test Prop -> this ', this);
    // console.log('Test Prop -> main ', this.Prop1, this.main.service1.service2);
  }
}

export { Test };
