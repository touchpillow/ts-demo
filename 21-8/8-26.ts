namespace N826 {
  //   type KeyType = string | number | Symbol;
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
  const size = ["large", "normal", "mini", "small"] as const;
  type SizeValue = TypeValue<typeof size>; //"large" | "normal" | "mini" | "small"

  type UnionToIntersection<T> = (
    T extends any ? (v: T) => any : never
  ) extends (v: infer R) => any
    ? R
    : never;
  type AAndB = UnionToIntersection<A | B>; //A & B

  interface A {
    a: string;
    b: number;
  }
  interface B {
    c: string;
    d: boolean;
  }
  type Tuple1 = ["large", "normal", "mini", "small"];

  type DDD = string;
  type Head<T> = T extends readonly any[]
    ? T extends [infer R, infer I, ...any]
      ? [R, I]
      : never
    : never;
  type ASD = Head<Tuple1>;
  type ddddd = string extends object ? 1 : 2;
  type AAA = (string | number)[];
  type AValue = TypeValue<DDD>;
}
