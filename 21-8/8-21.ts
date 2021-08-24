namespace Date821 {
  interface A {
    a: string;
  }
  interface B {
    a: string;
    b: string;
  }
  let a: A;
  let b: B;
  type FnA = (v: A) => void;
  type FnB = (v: B) => void;
  let fnA: FnA = (v: A) => {
    console.log(v.a);
  };
  let fnB: FnB = (v: B) => {
    console.log(v.b);
  };
  a = b;
  fnA = fnB; //是否安全？

  console.log(b.b);
  interface StringA extends String {
    // _: never;
    a: number;
  }
  let sa: JSONString<A> = "{'_': 's'}";
  const res = JSON.parse(sa);
  //   type UnionT = "x" | "z";
  type UnionToIntersection<T> = (
    v: T
  ) => void extends (v: infer U) => void ? U : never;
  type InterctionType = UnionToIntersection<UnionT>;

  //   type GetReturnType<T> = ReturnType

  //   type c = GetReturnType<FnA>;s
  type Tul = [string, number];
  type TuiToUnion<T> = T extends (infer R)[] ? R : never;
  type UnionT = TuiToUnion<Tul>;
  interface C {
    c: string;
  }
  let ddd: C;
}
