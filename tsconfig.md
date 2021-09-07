# 配置的思路

尽量在不影响开发效率的前提下，执行严格的类型检查，使用准确的类型注解，减少 any。

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

`json{ path:"", composite:"", declarationMap:"" ,prepend:"", outFile:""} `

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

### strictFunctionTypes

更准确的检查函数的参数类型，即是否允许默认的，发生在函数参数未知上的逆变。
