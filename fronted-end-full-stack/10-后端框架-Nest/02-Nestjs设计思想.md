# 02-Nestjs 设计思想

## 一 依赖注入

### 1.1 依赖注入思想含义

控制反转 (Inversion of Control) 即事情的控制权转交给其他人，在编程中，程序的流程控制权发生了转变。在反转前：项目的代码决定程序的工作流程，并调用框架代码，在反转后，框架代码反而直接决定了程序的工作流程，并能调用项目代码。控制反转的核心作用就是：复用。

常见的控制反转实现方式有：

- 依赖注入（DI:Dependency Inject）：被动接收依赖对象，由容器将被依赖对象注入到对象内部；
- 依赖查询 (DL:Dependency Lookup)：主动查询依赖对象，由对象自身通过 服务定位器 查询被依赖对象；依赖查询也经常以服务定位器模式（Service Locator）的形式出现。

DI 是面向对象中控制反转最常见的实现方式，可以极大程度降低代码的耦合度。

下面是传统开发的示例：

```js
// 制作一台电脑，需要CPU与屏幕
class Cpu {}
class Screen {}

class Computer {
  cpu: Cpu
  screen: Screen
  constructor() {
    this.cpu = new Cpu()
    this.screen = new Screen()
  }
  show() {
    console.log(this.cpu)
    console.log(this.screen)
  }
}

const c = new Computer()
c.show()
```

此时 Computer 类就依赖了 Cpu 和 Screen 类，构造器执行了：实例化、赋值两个动作。如果现在 CPU 现在更换为 Arm 类型：ArmCpu，那么 Computer 类的属性 cpu 类型也要替换为 ArmCpu。依次类推，如果有很多地方用到这个属性，或者有很多电脑类都依赖这个属性，那么都要执行替换，这是无法想象的。

使用 IoC 改造下：

```js
class Cpu {}
class Screen {}

// 新增容器类，用于构建实例
class Container {
  pool: Map<string, any>
  constructor() {
    this.pool = new Map()
  }
  resgisterr<T>(name: string, constructor: T) {
    this.pool.set(name, constructor)
  }
  get(name: string) {
    const Target = this.pool.get(name)
    if (!Target) {
      return null
    }
    return new Target()
  }
}

const container = new Container()
container.resgisterr('Cpu', Cpu)
container.resgisterr('Screen', Screen)

class Computer {
  cpu: Cpu
  screen: Screen
  constructor() {
    this.cpu = c.get('Cpu')
    this.screen = c.get('Screen')
  }
  show() {
    console.log(this.cpu)
    console.log(this.screen)
  }
}

const c = new Computer()
c.show()
```

Container 类即是 IoC 的容器类，用于关联要使用的类 Computer 与其他类 Cpu、Screen 之间进行关联。我们如果需要 Computer 的实例，并不是通过 new 来实现，而是通过容器的 get 方法来实现，解除了 Computer 与 Cpu、Screen 之间的耦合，即：Cpu、Screen 的实例化的流程交给了 Container。如果现在我们要调整 Computer 的属性类型，只需要调整容器中输出的类型即可。

### 1.2 Nest 中的装饰器的使用

Nest 中，通过 @Injectable 装饰器向 IoC 容器注册：

```ts
// 在 service 层向 IoC 注册
import { Injectable } from '@nestjs/common'
import { Cat } from './interfaces/cat.interface'

@Injectable()
export class CatsService {
  private readonly cats: Cat[] = []

  create(cat: Cat) {
    this.cats.push(cat)
  }

  findAll(): Cat[] {
    return this.cats
  }
}

// 在控制层注入 service 实例
import { Controller, Get, Post, Body } from '@nestjs/common'
import { CreateCatDto } from './dto/create-cat.dto'
import { CatsService } from './cats.service'
import { Cat } from './interfaces/cat.interface'

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Post()
  async create(@Body() createCatDto: CreateCatDto) {
    this.catsService.create(createCatDto)
  }

  @Get()
  async findAll(): Promise<Cat[]> {
    return this.catsService.findAll()
  }
}
```

CatsService 作为一个 privider，需要在 module 中注册，这样在该 module 启动时，会解析 module 中所有的依赖，当 module 销毁时，provider 也会一起销毁。

```ts
import { Module } from '@nestjs/common'
import { CatsController } from './cats/cats.controller'
import { CatsService } from './cats/cats.service'

@Module({
  controllers: [CatsController],
  providers: [CatsService],
})
export class ApplicationModule {}
```

## 二 面向切面编程 AOP

面向切面编程（Aspect Oriented Programming，简称 AOP）主要是针对业务处理过程中的切面进行提取，在某个步骤和阶段进行一些操作，从而达到 DRY（Don't Repeat Yourself）的目的。AOP 对 OOP 来说，是一种补充，比如可以在某一切面中对全局的 Log、错误进行处理，这种一刀切的方式，也就意味着，AOP 的处理方式相对比较粗粒度。

在 Nestjs 中，AOP 分为下面几个部分（按顺序排列）：

- Middlewares
- Guards
- Interceptors (在流被操纵之前)
- Pipes
- Interceptors (在流被操纵之后)
- Exception filters (如果发现任何异常)

## 三 模块

### 3.1 模块的基本使用

模块化可以更加清晰地组织应用，Nest 通过 Module 装饰器把同一个分层下的代码组织成单独的模块，并能互相聚合称为一个功能完备的功能块。如图所示：

![模块](../images/nest/02.png)

实例代码：

```ts
import { Module } from '@nestjs/common'
import { CatsController } from './cats.controller'
import { CatsService } from './cats.service'
import { CoreModule } from './core/core.module'

@Module({
  imports: [CoreModule],
  controllers: [CatsController],
  providers: [CatsService],
  exports: [CatsService],
})
export class CatsModule {}
```

每个应用都至少有一个根模块，根模块就是 Nest 应用的入口。Nest 会从这里查找出整个应用的依赖/调用图。@Module() 装饰器的参数是：

- providers：该模块中共享的 provider 集合，provider 可以是 service 等
- controllers：该模块需要用到的控制器集合
- imports：引入的其它模块集合
- exports：如果要在不同模块之间共享 provider 可以在 exports 参数中指定。

### 3.2 模块共享

Nest 中的模块是单例的，可以在不同的模块之间共享任意 Provider 实例，且可以重复导出：

```ts
@Module({
  imports: [CommonModule],
  exports: [CommonModule],
})
export class CoreModule {}
```

模块的构造函数中也可以注入指定的 provider，通常用于配置参数：

```ts
@Module({
  controllers: [CatsController],
  providers: [CatsService],
})
export class CatsModule {
  constructor(private readonly catsService: CatsService) {}
}
```

注意：模块类本身并不可以装饰成 provider，因为这会造成循环依赖。

### 3.3 全局模块

Nest 默认会将 provider 注册到模块作用域上，如果没有显式的导出 provider，那么其他地方就无法使用。如果需要让一个模块随处可见，那么就可以使用 `@Global()` 装饰器来装饰这个模块：

```ts
// @Global() 装饰器可以让模块获得全局作用域
@Global()
@Module({
  controllers: [CatsController],
  providers: [CatsService],
  exports: [CatsService],
})
export class CatsModule {}
```

### 3.4 动态模块

模块的静态方法 forRoot 返回一个动态模块，可以是同步或者异步模块，用于自定义模块：

```ts
import { Module, DynamicModule } from '@nestjs/common'
import { createDatabaseProviders } from './database.providers'
import { Connection } from './connection.provider'

@Module({
  providers: [Connection],
})
export class DatabaseModule {
  static forRoot(entities = [], options?): DynamicModule {
    const providers = createDatabaseProviders(options, entities)
    return {
      module: DatabaseModule,
      providers: providers,
      exports: providers,
    }
  }
}
```
