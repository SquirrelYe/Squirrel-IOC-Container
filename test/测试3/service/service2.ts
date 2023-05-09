import { Service, Inject, Scope } from '../../../src/index';
import { Service3 } from './service3';

@Service('S2')
@Scope('Singleton')
class Service2 {
  @Inject('S3') public s3: Service3;

  constructor() {
    console.log('S2 constructor');
  }
}

export { Service2 };
