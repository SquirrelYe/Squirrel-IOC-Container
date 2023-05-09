import { Service, Inject, Container } from '../../src/index';
import { ContainerConstant, ContainerMetadata } from '../../src/ioc.constant';

import Service1 from './service1';
import Service2 from './service2';

@Service('3')
export default class Service3 {
  // @Inject('1') readonly service1: Service1;
  // @Inject('2') readonly service2: Service2;

  constructor() // @Inject(ContainerConstant.IOC_INTERNAL_SERVICE_ID) readonly serviceInternal: Container // @Inject('2') readonly service2: Service2, // @Inject('1') readonly service1: Service1,
  {}

  test() {
    // console.log('Service3 test');
    // const service2: Service2 = this.serviceInternal.getService('2');
    // service2.test()
  }
}
