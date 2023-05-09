import type { ServiceUniqueId, ServiceCtor, DependenciesValue } from './ioc.type';
/**
 * @description IOC Container 工具函数定义
 * @author willye
 * @time 2023.04.06 11:29:34
 */
declare class ContainerUtils {
    /**
     * @description 标记服务为可注入模式，ID默认为类名，建议统一常量定义，传入Symbol防止命名冲突。
     * @author willye
     * @time 2023.04.03 08:50:24
     */
    static markModuleInjectable(type: 'Component' | 'Service' | 'Repository' | 'Controller', Ctor: ServiceCtor, id?: ServiceUniqueId): any;
    /**
     * @description 从注入的元数据获取服务的依赖列表
     * @author willye
     * @time 2023.04.06 12:42:49
     */
    static getDependenciesFromMetadata(Ctor: ServiceCtor): DependenciesValue;
}
export { ContainerUtils };
//# sourceMappingURL=ioc.util.d.ts.map