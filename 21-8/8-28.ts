namespace N828 {
  type ReferenceValue<T> = {
    [K in keyof T]: T extends readonly any[]
      ? T[number]
      : T extends object
      ? T[K]
      : never;
  }[T extends readonly any[]
    ? number extends keyof T
      ? number
      : keyof T
    : keyof T];

  type TypeValue<T> = T extends object ? ReferenceValue<T> : T;

  type UnionToIntersection<T> = (
    T extends any ? (v: T) => any : never
  ) extends (v: infer R) => any
    ? R
    : never;

  type VueClass<T> = { new (...arg: any[]): T };
  declare function mixins<T extends VueClass<any>[]>(
    ...params: T
  ): VueClass<UnionToIntersection<InstanceType<TypeValue<T>>>>;

  class A {
    say() {}
  }
  class B {
    eat() {}
  }
  class C extends mixins(A, B) {
    test() {
      this.eat();
    }
  }
  const a: KeyboardEvent = new KeyboardEvent("keyup");
  const v = a.target as HTMLInputElement;
  type AAA = "1" | "2";
  type BBB = "1";
  let aaa: AAA = "2";
  let bbb: BBB = "1";
  function fn(params: AAA) {}
  const c = AAA as BBB;
}
