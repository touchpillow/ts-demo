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

## allowUnusedLabels
