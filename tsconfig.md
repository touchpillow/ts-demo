# 配置的思路

尽量在不影响开发效率的前提下，执行严格的类型检查，使用准确的类型注解，减少显式和隐式的 any。

# root fields

## files

编译需要的单个文件列表（一般用 include 和 exclude 指定）

## extends

指定要继承的配置文件配置的路径。加载时，先加载基础配置文件，然后加载当前的文件，并且当前文件的配置会覆盖基础配置。在所有相关的配置文件的相对路径，都是相对于起始配置文件解析。不允许配置文件中的循环继承。
目前顶层属性，references 不能继承

## include

指定要包含在程序中的文件,值可以是具体文件路径，也可以是用于匹配的正则模式。解析时路径基于包含 tsconfig.json 的目录开始解析。

- \*匹配零个或多个字符（不包括目录分隔符）
- ? 匹配任何一个字符（不包括目录分隔符）
- \*\*/ 匹配嵌套到任何级别的任何目录

## exclude

指定解析时应跳过的文件或模式数组。
结果仅对 include 内的文件生效（也就是无法对 files、references 等指定的文件生效，也许可以理解为优先级？）。

## references

是一个对象数组，用于指定要引用的项目，用于将大型项目拆分。

```json
{
  "path": "",
  "composite": true,
  "declarationMap": true,
  "prepend": true,
  "outFile": ""
}
```

参考 https://www.typescriptlang.org/docs/handbook/project-references.html

# type checking

## allowUnreachableCode

允许无法访问的代码

- undefined （默认）向编辑提供建议作为警告
- true 无法访问的代码被忽略
- false 引发有关无法访问代码的编译器错误

  可以配合 prettier 自动删除无法访问的代码

## allowUnusedLabels

允许未使用的标签(变量)

- undefined （默认）向编辑提供建议作为警告
- true 未使用的标签被忽略
- false 引发有关未使用标签的编译器错误

## alwaysStrict \*\*\*

文件始终在 js 的严格模式下解析，为每个源文件设置""use strict"

## exactOptionalPropertyTypes

可选属性是否能被设置为 undefined（值为 undefined 和 interface 没有该属性值，语义上不同，使用上也有细微的差别。）

```typescript
interface A {
  a?: number;
  b: string;
}
const a: A = {
  a: undefined,
  b: "",
};
```

以上示例在开发中常用。如果将 exactOptionalPropertyTypes 设置为 true,那么将 a 设置为 undefined 是不被允许的。

## noFallthroughCasesInSwitch \*\*\*

确保 switch 语句中的任何非空 case 包含 break 或 return。

```typescript
switch (a) {
  case 0:
    // Fallthrough case in switch.
    console.log("even");
  case 1:
    console.log("odd");
    break;
}
```

## noImplicitAny \*\*\*

在没有添加类型注解，ts 又没办法通过类型推导自动推断类型时，是否允许默认类型为 any。
设置为 true 时，没有类型注解的地方会提示错误。
如：

```typescript
function aa(v) {
  //参数“v”隐式具有“any”类型
  console.log(v);
}
```

## noImplicitOverride

子类覆盖父类的功能时，是否强制使用 override 关键字。设置为 true 时，如果子类重写父类的功能，需要添加 override 关键字

```typescript
  class Album {
    setup() {}
  }
  class MLAlbum extends Album {
    override setup() {}
  }
  class SharedAlbum extends Album {
    setup() {}
  // This member must have an 'override' modifier because it overrides a member in the base class 'Album'.
  }
}
```

## noImplicitReturns

检查函数中的所有代码路径以确保它们返回一个值.(设置 strictNullChecks 可达到一样的效果，因为没有 return 时默认返回 undefined)

## noImplicitThis

在隐式的 any type 时使用 this 抛出异常

```typescript
class Rectangle {
  width: number;
  height: number;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
  }

  getAreaFunction() {
    return function () {
      return this.width * this.height;
      // 'this' implicitly has type 'any' because it does not have a type annotation.
      // 'this' implicitly has type 'any' because it does not have a type annotation.
    };
  }
}
```

## noPropertyAccessFromIndexSignature

是否允许使用点语法读取未知字段。设置为 true 时，只能使用中括号读取未知字段，这样做是为了保证点语法和索引语法访问字段以及在类型中声明属性的一致性。

```typescript
interface A {
  a: string;
  [key: string]: string;
}
let a: A = { a: "" };
const b = a.b; //属性“b”来自索引签名，因此必须使用[“b”]访问它
```

## noUncheckedIndexedAccess \*\*\*

在使用索引签名描述未知的 key 时，是否添加 undefined 到未声明的字段。

```typescript
interface B {
  a: string;
  [K: string]: string;
}
let b: B = { a: "" };
const v = b["name"]; //类型为string|undefiend
```

## noUnusedLocals \*\*\*

存在未使用的变量时，是否抛出异常。eslint 也有一样的功能。

## noUnusedParameters \*\*\*

存在未使用的参数时，是否抛出异常。和 noUnusedLocals 类似

## strict

该属性设置为 true 时，启用所有严格模式系列选项。可以根据需要单独关闭某个选项。

### strictBindCallApply \*\*\*

属性设置为 true 时，将会在 call、apply、bind 调用时严格检查参数类型。
不开启时，这些函数接受任何参数并返回 any

### strictFunctionTypes \*\*\*

更准确的检查函数的参数类型，即是否允许默认的、发生在函数参数位置上的逆变。

### strictNullChecks \*\*\*

是否执行严格的空检查。如果是 false 或者不设置，那么 null、undefined 类型将会被忽略

### strictPropertyInitialization

设置为 true 时，不允许类属性没有初始化(除类型有 undefined 的属性)

### useUnknownInCatchVariables

设置为 true 时，catch 的参数的默认类型为 unknown

# modules

## allowUmdGlobalAccess

设置为 true 时，允许从模块文件内部访问全局对象(如 jq)。和 eslint 的 env 是一样的作用。

## baseUrl

设置解析模块时的基础路径，比如设置 baseUrl 为"./"，解析"a.ts"时完整路径为"./a,ts"

## module,moduleResolution

ts 的模块配置。浏览器环境可忽略，使用 es 标准的模块系统。

## noResolve

默认情况下，TypeScript 将检查 import 和 reference 指令的初始文件集，并将这些解析的文件添加到程序中。

如果 noResolve 设置，则不会发生此过程。但是，import 仍会检查语句以查看它们是否解析为有效模块，因此需要确保通过其他方式满足这一要求。

## paths

解析模块时，将导入路径映射到新的路径上，支持路径模式。可以正确的导入 umd/require 包，也可以避免过长的路径。类似 webpack 的路径别名

```json
{
  "compilerOptions": {
    "baseUrl": "src",
    "paths": {
      "app/*": ["app/*"],
      "config/*": ["app/_config/*"],
      "environment/*": ["environments/*"],
      "shared/*": ["app/_shared/*"],
      "helpers/*": ["helpers/*"],
      "tests/*": ["tests/*"]
    }
  }
}
```

## resolveJsonModule

是否允许导入带有 json 类型的模块。

## rootDir

## typeRoots

指定目录下的文件中的类型将作为全局的类型。该属性不设置时，所有@types 下的类型默认是全局的。设置了之后，只有该属性对应的文件的类似是全局的。
通常可以通过该属性设置一些基础的全局类型。

## types

默认情况下，所有可见的@types 的包是全局的，通过该属性可指定某些包的 types 是全局的

```json
{
  "compilerOptions": {
    "types": ["node", "jest", "express"]
  }
}
```

# emit

## declaration

设置为 true 时，编译 ts 文件，会生成对应的 js 文件及.d.ts 的类型声明文件。

## declarationDir

将生成的.d.ts 文件放在该属性对应的路径下

## declarationMap

为.d.ts 文件生成一个映射到源 ts 文件的 source map,主要方便编辑器去定位到源文件。

## downlevelIteration

设置为 true 时，在转换成低版本的 js 语法时，对于一些 es6 的遍历 api(for of，...arg，Symbol.iterator 等)，将会使用 Symbol.iterator 更准确的模拟这些遍历行为。

## emitBOM

控制 TypeScript 在写入输出文件时是否会发出字节顺序标记 (BOM)。某些运行时环境需要 BOM 才能正确解释 JavaScript 文件；其他环境要求它不存在。默认值 false 通常是最好的，除非有理由更改它。

## emitDeclarationOnly

只生成.d.ts 文件；不生成.js 文件。

此设置在两种情况下很有用：

- 使用 TypeScript 以外的转译器来生成 JavaScript。
- 使用 TypeScript 只需要生成.d.ts 文件。

## importHelpers

对于某些降级 api(异步，extends 等)，TypeScript 使用一些辅助代码来完成这类操作。默认情况下，这些代码被插入到使用它们的文件中。如果在许多不同的模块中使用相同的 api，这可能会导致代码重复。

如果该 importHelpers 标志打开，则这些辅助函数将从 tslib 模块导入。您需要确保该 tslib 模块能够在运行时导入。这只影响模块；全局脚本文件不会尝试导入模块。

## importsNotUsedAsValues \*\*\*

该属性控制如何 import 工作，有 3 个不同的选项：

- remove：删除 import type 这类仅引用类型的语句的默认行为。
- preserve: 保留 import 语句(即使没使用)。这可能会导致保留导入/副作用。
- error：这会保留所有导入（与 preserve 选项相同），但是当一个变量作为值导入仅用作类型时会出错。如果您想确保没有意外导入任何值，但仍使副作用导入显式，这可能很有用。

可以使用 import type 来显式创建一个 永远不应发送到 JavaScript 的 import 语句。

## importsNotUsedAsValues

生成的.js.map 文件是否写入到 js 文件内。这会导致 js 文件体积增大，但是在部分场景下有用(比如，在 web 网站禁止 map 文件时想要调试 js 可以使用这个方式)。

## inlineSources

设置为 true 时，将会把源 ts 文件的内容作为字符串放入 source map 中，这在 importsNotUsedAsValues 提到的场景中有用，即在部分禁止 source map 的网站调试代码。

## mapRoot

调试时，指定调试器定位到 source map 文件的位置。

## newLine

行位序列类型(LF/CRLF)

## noEmit

不生成编译器输出文件，如 source map、 .d.ts 等

## noEmitHelpers

指定高级 api 在转换时使用自己提供的实现。

## noEmitOnError

报告错误时是否输出文件。

## outDir

将生成的 js 文件输出到该属性指定的目录，并保留源文件的目录结构。不指定时，js 文件将输出在源 ts 文件目录上。

## outFile

所有全局文件将会连接到指定的单个文件中。一般不使用。

## preserveConstEnums

在使用常量枚举时，默认会把枚举成员编译为对应的值。开启此选项，将会保留枚举值（将枚举值编译为对象）。

## removeComments

编译成 js 时删除注释，默认为 false（与 webpack 的对应功能类似）。

## sourceMap

编译时是否生成源映射文件(source map)。

## sourceRoot

调试时，指定调试器定位到 ts 文件的位置而不是相对源文件的位置。

## stripInternal

是否为@internal 发出声明。(@internal 是在 jsDoc 注释中使用,表示关联的元素是库的内部元素)。
这是一个内部编译器选项，慎用。

# JavaScript Support

## allowJs \*\*\*

是否允许在项目中使用 js 文件

## checkJs \*\*\*

当 allowJs 开启时，checkJs 开启后将会检查 js 文件内的语法

## maxNodeModuleJsDepth

限制 node_modules 和加载 js 文件的最大依赖深度。

# Editor Support

## disableSizeLimit \*\*\*

默认情况下，ts 会限制分配的内存，以防止项目非常大时出现内存问题。开启这个选项可去掉这个限制。

## plugins

要在编辑器中运行的语言服务插件列表.(一般使用编辑器的扩展而非这个属性)

# Interop Constraints

## allowSyntheticDefaultImports

该属性设置为 true 时，可使用

```typescript
import React from "react";
```

代替

```typescript
import * as React from "react";
```

即使该模块没有默认导出，babel 编译时也会处理，自动创建一个默认值。开启这个选项是让 ts 的行为和 babel 的行为一致。

## esModuleInterop

默认情况下，对于部分导入语句，如：

```typescript
import * as moment from "moment";
```

等价于

```typescript
const moment = require("moment");
```

以及

```typescript
import moment from "moment";
```

等价于

```typescript
const moment = require("moment").default;
```

ES6 模块规范规定命名空间 import ( import \* as x) 只能是一个对象,但是 ts 将其视为与 require("moment")相同，require 的结果被视为可调用的函数，这和 es 规范不一致。
另外，大多数带有 CommonJS/AMD/UMD 模块的库并不像 TypeScript 的实现那样严格。

开启 esModuleInterop 可解决上面两个问题。(启用 esModuleInterop 也会启用 allowSyntheticDefaultImports.)

## forceConsistentCasingInFileNames \*\*\*

不同的系统，对文件/文件夹大小写的规则不同，linux 和 windows 的就不一样(win 后面改了)，开启此规则，可以保证不同系统下的文件名大小写一致。

## isolatedModules

isolatedModules 如果编写的某些代码无法被单文件转换过程正确解释，则设置该标志会发出警告。

它不会改变代码的行为，也不会改变 TypeScript 的检查和发射过程的行为。

## preserveSymlinks

启用该规则后，对于 import 和 reference，解析路径时是相对于配置对应的文件的位置解析的，而不是相对于配置解析到的路径解析。

# Backwards Compatibility

## noImplicitUseStrict

输出目标为非 es6 时，默认会在输出文件头部加上 use strict。启用此规则会不加 use strict，所以一般不用这个属性

## noStrictGenericChecks

在比较两个泛型函数时，TypeScript 将统一类型参数。

```typescript
type A = <T, U>(x: T, y: U) => [T, U];
type B = <S>(x: S, y: S) => [S, S];

function f(a: A, b: B) {
  b = a; // Ok
  a = b; // Error
  // Type 'B' is not assignable to type 'A'.
  //   Types of parameters 'y' and 'y' are incompatible.
  //     Type 'U' is not assignable to type 'T'.
  //       'T' could be instantiated with an arbitrary type which could be unrelated to 'U'.
}
```

开启该规则将抛出异常

## suppressExcessPropertyErrors

开启此规则时，在属性比 interface 中更多时将不会抛出异常，例如以下示例中所示的错误：

```typescript
type Point = { x: number; y: number };
const p: Point = { x: 1, y: 3, m: 10 };
// Type '{ x: number; y: number; m: number; }' is not assignable to type 'Point'.
// Object literal may only specify known properties, and 'm' does not exist in type 'Point'.
```

类似的需求，目前可以用//@ts-ignore 实现

## suppressImplicitAnyIndexErrors

从对象读取属性时，默认读取未定义的属性会报错。开启此规则将不会报错。
不推荐使用这个规则，部分特殊场景使用//@ts-ignore 忽略 ts 的检查。

# Language and Environment

## emitDecoratorMetadata

为与 reflect-metadata 一起工作的装饰器发送类型元数据。

## experimentalDecorators

启用对装饰器的支持。
PS：es 标准中的装饰器目前处于 stage2 阶段(20210908)，ts 当前的装饰器实现与 es 标准的装饰器不一致。

## jsx \*\*\*

控制在 js 文件中 jsx 的编译方式。只在.tsx 文件中生效。

- react:.js 用 JSX 编译为等效 React.createElement 调用的文件
- react-jsx: .js 文件的 JSX 改为\_jsx 调用(编译时自动引入\_jsx 依赖)
- react-jsxdev:.js 使用 JSX 发出文件来\_jsx 调用(同上)
- preserve:.jsx 在 JSX 不变的情况下发出文件（不编译 jsx 文件，输出 jsx 文件）
- react-native:.js 在 JSX 不变的情况下发出文件(不编译 jsx，输出 js 文件)

## jsxFactory

在编译 jsx 元素时，指定调用的函数。默认是 React.createElement。

## jsxFragmentFactory

在设置 jsxFactory 时，通过该属性指定 FragmentFactory

## jsxImportSource

## lib \*\*\*

ts 内置了 es 标准的 API，以及浏览器环境中的内置对象(document 等)，在以下场景中，可以通过 lib 定义一些高级库和单独的库。

- 程序不在浏览器中运行，因此不需要"dom"类型定义
- 运行时平台提供了某些 JavaScript API 对象（可能通过 polyfills），但尚不支持给定 ECMAScript 版本的完整语法
- 一些（但不是全部）更高级别 ECMAScript 版本的 polyfill 或自定义实现

[支持的库参考](https://github.com/microsoft/TypeScript/tree/main/lib)

## noLib

开启此规则时将忽略 lib。

## target \*\*\*

要编译到的 js 的版本，更改 target 会影响 lib，所以这两个要一起配置。
ESNext 表示 ts 支持的最高版本。所以，不同的 ts 版本，对应的 esnext 也不同，慎用。

## useDefineForClassFields \*\*\*

使用即将发布的标准版本的类字段

# Compiler Diagnostics

## explainFiles

在编译时打印该文件作为项目一部分及作为编译结果一部分的原因，比如 target 指定为 es5，那么相应的文件中会注明 使用到的 es5 的相关 lib。

## extendedDiagnostics

编译时输出花费的响应时间及编译数据，如行数、节点数等。

- Files: 16
- Lines: 21923
- Nodes: 88829
- Identifiers: 30434
- Symbols: 23002
- Types: 7218
- Memory used: 50933K
- I/O Read time: 0.01s
- Parse time: 0.36s
- Program time: 0.37s
- Bind time: 0.19s
- Check time: 0.78s
- transformTime time: 0.02s
- commentTime time: 0.01s
- Source Map time: 0.02s
- I/O Write time: 0.04s
- printTime time: 0.10s
- Emit time: 0.12s
- Total time: 1.46s

## generateCpuProfile

默认值 profile.cpuprofile
编译器运行期间让 TypeScript 发出 v8 CPU 配置文件。CPU 配置文件可以深入了解为什么您的构建可能会很慢。

此选项只能通过 CLI 使用：--generateCpuProfile tsc-output.cpuprofile。

## listEmittedFiles

输出编译生成的文件路径

## listFiles

输出编译的文件的路径

## traceResolution

打印有关每个文件的解析编译过程

# Projects

## composite

reference 的项目必须设置 composite 启用新设置。需要此设置以确保 TypeScript 可以快速确定在哪里可以找到引用项目的输出。

- 该 rootDir 设置，如果没有明确设置，默认为包含 tsconfig 文件的目录
- 所有实现文件都必须与 include 模式匹配或列在 files 数组中。如果违反此约束，tsc 将通知未指定哪些文件
- declaration 必须开启

## disableReferencedProjectLoad

在多项目 TypeScript 程序中，TypeScript 会将所有可用项目加载到内存中，以便为需要完整依赖关系（如“查找所有引用”）的编辑器响应提供准确的结果。

如果项目很大，可以使用该标志 disableReferencedProjectLoad 来禁用所有项目的自动加载。相反，项目会在您通过编辑器打开文件时动态加载。

## disableSolutionSearching

使用复合 TypeScript 项目(使用 reference 引用其他项目)时，此选项提供了一种方法来声明在使用诸如在编辑器中查找所有引用或跳转到定义等功能时不希望包含项目

## disableSourceOfProjectReferenceRedirect

使用复合 TypeScript 项目(使用 reference 引用其他项目)时，此选项提供了一种返回到 3.7 之前的行为的方法，其中 d.ts 文件被用作模块之间的边界

## incremental

将有关上次编译的项目依赖关系图的信息保存到磁盘上的文件中。这会与编译输出相同的文件夹中创建一系列.tsbuildinfo 在文件。在运行时不会使用它们，可以安全地删除它们

## tsBuildInfoFile

指定一个文件将增量编译信息存储为项目的一部分。

此选项提供了一种配置 TypeScript 跟踪它存储在磁盘上的文件以指示项目的构建状态的位置的方法——默认情况下，它们与您发出的 JavaScript 位于同一文件夹中。
