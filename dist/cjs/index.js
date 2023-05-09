"use strict";
/**
 * @description Squirrel Dependency IOC Container
 * @author willye
 * @time 2023.04.03 10:31:14
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostConstruct = exports.Tags = exports.Scope = exports.InjectType = exports.Inject = exports.Controller = exports.Repository = exports.Service = exports.Component = exports.ContainerMetadata = exports.ContainerConstant = exports.registerService = exports.Container = void 0;
var ioc_1 = require("./ioc");
Object.defineProperty(exports, "Container", { enumerable: true, get: function () { return ioc_1.Container; } });
Object.defineProperty(exports, "registerService", { enumerable: true, get: function () { return ioc_1.registerService; } });
var ioc_constant_1 = require("./ioc.constant");
Object.defineProperty(exports, "ContainerConstant", { enumerable: true, get: function () { return ioc_constant_1.ContainerConstant; } });
Object.defineProperty(exports, "ContainerMetadata", { enumerable: true, get: function () { return ioc_constant_1.ContainerMetadata; } });
var ioc_decorator_1 = require("./ioc.decorator");
Object.defineProperty(exports, "Component", { enumerable: true, get: function () { return ioc_decorator_1.Component; } });
Object.defineProperty(exports, "Service", { enumerable: true, get: function () { return ioc_decorator_1.Service; } });
Object.defineProperty(exports, "Repository", { enumerable: true, get: function () { return ioc_decorator_1.Repository; } });
Object.defineProperty(exports, "Controller", { enumerable: true, get: function () { return ioc_decorator_1.Controller; } });
Object.defineProperty(exports, "Inject", { enumerable: true, get: function () { return ioc_decorator_1.Inject; } });
Object.defineProperty(exports, "InjectType", { enumerable: true, get: function () { return ioc_decorator_1.InjectType; } });
Object.defineProperty(exports, "Scope", { enumerable: true, get: function () { return ioc_decorator_1.Scope; } });
Object.defineProperty(exports, "Tags", { enumerable: true, get: function () { return ioc_decorator_1.Tags; } });
Object.defineProperty(exports, "PostConstruct", { enumerable: true, get: function () { return ioc_decorator_1.PostConstruct; } });
//# sourceMappingURL=index.js.map