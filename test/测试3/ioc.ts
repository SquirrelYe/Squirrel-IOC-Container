import { Container } from '../../src/index';

import './service/service1';
import './service/service2';
import './service/service3';
import './test1';

const ioc = new Container({ enableDependencyInstanceCache: true, dependencyInstanceInjectMethod: 'Property' });
ioc.init(); // 初始化IOC容器，此方法会自动初始化所有已注册的服务并且执行一次循环检测，方便开发者在开发阶段发现循环依赖问题

export { ioc };
