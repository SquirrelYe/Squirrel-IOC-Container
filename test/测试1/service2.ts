import { Service, Inject } from '../../src/index';
import Service3 from './service3';

@Service()
export default class Service2 {
  constructor(@Inject('3') readonly service3: Service3) {}

  test() {
    console.log('Service2 test');
    console.log(this.service3);
  }
}
