import { Controller, Inject, InjectType, PostConstruct } from '../../src/index';
import { Base } from './base';

import { Service1 } from './service/service1';
import { Service2 } from './service/service2';
import { Service3 } from './service/service3';

@Controller('Test1')
@InjectType('Constructor')
class Test1 extends Base {
  @Inject('S1') public s1: Service1;
  @Inject('S2') public s2: Service2;
  @Inject('S3') public s3: Service3;

  public count = 0;

  constructor(msg: string) {
    super(msg);
    console.log('Test1.constructor');
  }

  test() {
    console.log('Test1.test');
    console.log(this.s3);
    console.log(this);
  }

  @PostConstruct
  postConstruct1() {
    console.log('Test1.postConstruct1');
    this.count++;
  }

  @PostConstruct
  postConstruct2() {
    console.log('Test1.postConstruct2');
    this.count++;
  }
}

export { Test1 };
