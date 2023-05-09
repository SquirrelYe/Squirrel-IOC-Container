// import { Test1 } from './test1';
import { ioc } from './ioc';
import { ContainerConstant, Container } from '../../src/index';
import { Test1 } from './test1';

console.log('🎉🎉🎉 IOC Container init success!', ioc.services);

// new Test1('xxxx').test();
// new Test1().test();

// 1. 实例注入
// const a = ioc.getService('Test1');
// a.test();

// 2. 构造器注入
const testConstroductor = ioc.getService<typeof Test1>('Test1');
const iocInstance = ioc.getService<Container>(ContainerConstant.IOC_INTERNAL_SERVICE_ID);

console.log('testConstroductor -->', testConstroductor);
console.log('iocInstance -->', iocInstance.services.size);

console.log(new testConstroductor('xxxx'));
console.log(new testConstroductor('xxxx').s3);
