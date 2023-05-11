# Squirrel IOC Container

<p align="left">
  <a href="https://npmjs.com/package/vite"><img src="https://img.shields.io/npm/v/@squirreljs/squirre-ioc-container.svg" alt="npm package"></a>
  <a href="https://nodejs.org/en/about/releases/"><img src="https://img.shields.io/node/v/@squirreljs/squirre-ioc-container.svg" alt="node compatibility"></a>
</p>

<p align="center">
  <a href="README.md">简体中文</a> | 
  <a href="README.zh-TW.md">繁體中文</a> | 
  <a href="README.en-US.md">English</a> 
</p>

🎉 Squirrel IOC Container (Dependency Inject) 是一款基於TypeScript 實現的IoC 容器庫。它可以幫助開發者更好地管理依賴注入，降低代碼之間的耦合度，提高代碼的可維護性。Squirrel IOC Container 提供了一個簡單易用的API，可以輕鬆地實現依賴注入和控制反轉。如果您正在尋找一款高效、易用的IoC 容器庫，那麼Squirrel IOC Container 絕對是您的不二之選。

## 輕鬆掌握依賴注入——Squirrel IOC Container 

- 🐿️ 大家好呀！今天我要來介紹一個非常好用的TS IOC 容器庫，它的名字叫做Squirrel IOC Container。🌰 
- 💻 如果你是一名Web 開發者，那麼你一定知道依賴注入（DI）在程序設計中的重要性。而Squirrel IOC Container 就是為了方便我們進行依賴注入的工具之一。👨‍💻 
- 👍 這個庫使用簡單，代碼清晰易懂，可以幫助我們更加靈活地管理各種依賴關係。它還提供了自動注入、循環依賴解決、命名空間功能等多種特性。🤩 
- 📚 如果你想深入了解Squirrel IOC Container 和依賴注入的相關知識，它的GitHub 頁面上有詳細的文檔和示例代碼供你參考。😎 
- 👉 所以，如果你正在尋找一款高效易用的IOC 容器庫，不妨試試Squirrel IOC Container 吧！🐿️ 

## 轻松掌握依赖注入——Squirrel IOC Container

- 🐿️ 大家好呀！今天我要来介绍一个非常好用的 TS IOC 容器库，它的名字叫做 Squirrel IOC Container。 🌰
- 💻 如果你是一名 Web 开发者，那么你一定知道依赖注入（DI）在程序设计中的重要性。而 Squirrel IOC Container 就是为了方便我们进行依赖注入的工具之一。 👨‍💻
- 👍 这个库使用简单，代码清晰易懂，可以帮助我们更加灵活地管理各种依赖关系。它还提供了自动注入、循环依赖解决、命名空间功能等多种特性。 🤩
- 📚 如果你想深入了解 Squirrel IOC Container 和依赖注入的相关知识，它的 GitHub 页面上有详细的文档和示例代码供你参考。 😎
- 👉 所以，如果你正在寻找一款高效易用的 IOC 容器库，不妨试试 Squirrel IOC Container 吧！ 🐿️

## 介紹

目前已經實現的功能有：

1. 依賴標記：目前提供了：**@Component**，**@Service**，**@Controller**，**@Repository** 四種類裝飾器標記，標記之後即可在容器中獲取到實例（支持**具名/無名** 標記，無名默認按照類型小寫注入）；`注：@Component('ID') 為通用的Component 裝飾器，用於標識一個類為Component，Service、Controller、Repository 都是Component 的拓展實現`。
2. 依賴注入：**@Inject** 裝飾器注入，支持**Constructor** 注入和**Property** 注入（注：Constructor 注入僅支持具名模塊注入）；
3. 注入方法：支持配置選擇注入方式，目前支持**Property** 和**Getter** 注入（ **dependencyInstanceInjectMethod** 配置項）；
4. 循環依賴檢測：在初始化容器時、加載實例時會**檢測循環依賴** ，如果存在循環依賴則會拋出異常；
5. 完備的異常檢測：**ServiceInjectableException, CyclicDependencyException, ServiceNotFoundException, ServiceAlreadyRegisteredException, InjectWithoutNameException**；
6. 代理自身容器實例：在容器中**注入自身容器實例** ，可以通過容器實例獲取到其他服務實例；
7. 作用域注入：支持單例注入**@Scope('Singleton')** 和每次注入**@Scope('Prototype')** 兩種模式，默認為單例注入； 
  @Inject() readonly service3: Service3; // 注入無名屬性
8. 生命週期注入：支持**@PostConstruct** 在服務實例化之後執行，能夠綁定到多個方法上並按照定義的順序依次執行；

## 使用方法

```typescript
// Path: src/ioc/container.ts
import { Service, Inject, InjectType, Container, ContainerConstant } from '@squirreljs/squirre-ioc-container';

@Service()
class Service3 {
  test() {
    console.log('Service3 test');
  }
}

@Service('ServiceIdentifier2')
class Service2 {
  test() {
    console.log('Service2 test');
  }
}

@Service()
class Service1 {
  @Inject() readonly service3: Service3; // 注入無名屬性
  constructor(@Inject('ServiceIdentifier2') readonly service2: Service2) {} // 構造函數注入具名屬性
}

// 創建代理容器實例
const IocContainer = new Container({ dependencyInstanceInjectMethod: 'Property' });
IocContainer.init(); // 初始化IOC容器，此方法會自動初始化所有已註冊的服務並且執行一次循環檢測，方便開發者在開發階段發現循環依賴問題

// 測試實例
@Service('TestService')
@InjectType('Constructor')
class Test {
  @Inject(ContainerConstant.IOC_INTERNAL_SERVICE_ID) public readonly serviceInternal: Container; // 注入代理容器實例
  @Inject() private readonly service1: Service1; // 無名屬性注入

  constructor(public readonly Prop1: string) {}

  test() {
    console.log('\n Test Prop -> Prop1 ', this.Prop1);
    console.log('\n Test Prop -> service1 ', this.service1);
    console.log('\n Test Prop -> this ', IocContainer.services);
  }
}

// 執行測試
const TestServiceConstructor = IocContainer.getService<typeof Test>('TestService');
const TestServiceInstance = new TestServiceConstructor('Prop From IOC Container Constructor');
TestServiceInstance.test();
```

## License

SquirrelJS © 2023 - [MIT License](LICENSE)
