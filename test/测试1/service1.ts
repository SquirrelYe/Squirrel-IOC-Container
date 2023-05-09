import { Service, Inject } from '../../src/index';
import Service2 from './service2';

@Service()
export default class Service1 {
  @Inject() readonly service2: Service2;

  // constructor(@Inject('2') readonly service2: Service2) {}
}
