import { Service, Inject, Tags, Scope, PostConstruct } from '../../../src/index';
import { Service2 } from './service2';

@Service('S1')
@Scope('Prototype')
@Tags([{ a: 1 }, 'xxx', 123, Symbol('xxx')])
class Service1 {
  @Inject('S2') public s2: Service2;

  public count = 0;

  constructor() {
    console.log('S1 constructor');
  }

  @PostConstruct
  postConstruct1() {
    console.log('Service1.postConstruct1');
    this.count++;
  }

  @PostConstruct
  postConstruct2() {
    console.log('Service1.postConstruct2');
    this.count++;
  }
}

export { Service1 };
