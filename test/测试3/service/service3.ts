import { Service, Inject, Scope } from '../../../src/index';

import { Service1 } from './service1';
import { Service2 } from './service2';

@Service('S3')
@Scope('Prototype')
class Service3 {
  // @Inject('S1') public s1: Service1;
  // @Inject('S2') public s2: Service2;

  constructor() {
    console.log('S3 constructor');
  }

  test() {
    console.log('S3.test');
    // console.log(this.s1, this.s2);
  }
}

export { Service3 };
