import { Container, Service, Inject } from '../../src/index';
import { ContainerConstant } from '../../src/ioc.constant';

import Service1 from './service1';
import Service2 from './service2';
import Service3 from './service3';

@Service('main')
export default class Main {
  // 属性装饰器注入
  @Inject(ContainerConstant.IOC_INTERNAL_SERVICE_ID) public readonly serviceInternal: Container;
  // @Inject('1') readonly service1: Service1;
  // @Inject('2') readonly service2: Service2;
  // @Inject('3') readonly service3: Service3;

  constructor(
    // 参数装饰器注入
    @Inject('1') readonly service1: Service1,
    @Inject('2') readonly service2: Service2,
    @Inject('3') readonly service3: Service3
  ) {}

  test() {
    // console.log('test', ContainerConstant.IOC_INTERNAL_SERVICE_ID, Container_MetadataKey_Dependency_Parameter);
    // console.log(this.service1);
    // console.log(this.service2);
    // console.log(this.service2);
    // console.log(this.service3);
    console.log('Main Test Prop -> serviceInternal ', this.serviceInternal.services);
    console.log('Main Test Prop -> this ', this);
  }
}
