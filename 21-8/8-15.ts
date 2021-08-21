// type LengthNumber<T, S> = T[];
namespace AAA {
  type A1 = "x" | "y" extends "x" ? 1 : 2;

  const a: A1 = 2;
  type P<T> = T extends "x" ? 1 : 2;
  type A2 = P<"x" | "y" | "z">;
  interface A3 {
    name: string;
  }
  interface A4 {
    name: string;
    age: number;
    v?: string;
    d?: number;
  }
  type getPartial<T> = {
    [K in keyof T]-?: undefined extends T[K] ? K : never;
  }[keyof T];
  type A5 = A4[keyof A4];
  type A45 = getPartial<A4>;

  type GetOption<T> = Pick<T, Exclude<keyof T, getPartial<T>>>;
  type GetRe<T> = Pick<T, Extract<keyof T, getPartial<T>>>;
  type cccc = GetOption<A4>;
  type ddd = GetRe<A4>;
  let b: A3 = {
    name: "",
  };
  let c: A4;

  const obj = {
    a: "1",
    b: "1",
    c: 1,
  };
  type ObjType = typeof obj;
  type ObjeKey<T> = T[keyof T];
  //   type ObjValue<T> = { [K in keyof T]: [keyof T] }:[keyof T];
  type objv = ObjeKey<ObjType>;

  // 辅助函数，用于获取T中类型不能never的key组成的联合类型
  type TypeKeys<T> = T[keyof T];

  /**
   * 核心实现
   */
  type PickByValue<T, V> = { [P in keyof T]: T[P] extends V ? T[P] : never };

  //   type PickByValue<T, V> = Pick<
  //     T,
  //     TypeKeys<{ [P in keyof T]: T[P] extends V ? P : never }>
  //   >;

  /**
   * @example
   *  type Eg = {
   *    key1: number;
   *    key3: number;
   *  }
   */
  type Eg = PickByValue<
    { key1: number | string; key2: string; key3: number },
    number
  >;
  type Direction = "left" | "right" | "top" | "bottom";
  type StringDir<T extends string, S extends string, SP extends string> =
    `${T}${SP}${S}`;

  type UnderLineType<T extends string, S extends string> = StringDir<T, S, "-">;

  type DirKey = "border" | "margin" | "padding";

  type Name = UnderLineType<DirKey, Direction>;

  type StringArrayToUnion<T extends number[]> = T[number];
  const list = [1, 2, 3, 4];
  type stringList = StringArrayToUnion<typeof list>;
  class F {
    fly() {}
  }
  class W {
    walk() {}
  }
  type VVV<T> = { new (...arg: any[]): T };
  declare function mixins<T extends VVV<any>[]>(
    ...Ctors: T
  ): VVV<UnionToIntersection<InstanceType<T[number]>>>;
  type UnionToIntersection<U> = (
    U extends any ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never;
  class AAA extends mixins(F, W) {
    test() {
      this.fly();
    }
  }
  const aaaa = new AAA();
  aaaa.test();
  interface BBB {
    a: number;
  }
  let eee: BBB = { a: 1 };
  // const ffff: JSONString<BBB> = "{\"_\":'1'}";
  const fff = eee.a;
  type fType = typeof fff;
  const stj = JSON.stringify(eee);
  const stra = JSON.parse(stj);
}
