namespace Date821 {
  interface A {
    a: string;
  }
  interface B {
    a: string;
    b: string;
  }
  let a: A = {
    a: "",
  };
  let b: B = {
    a: "",
    b: "",
  };
  a = b;
  const c = {
    a: "",
    b: "",
  };
  a = c;
  type FnA = (v: A) => void;
  type FnB = (v: B) => void;
  let fnA: FnA = (v: A) => {};
  let fnB: FnB = (v: B) => {
    console.log(v.b);
  };
  //   fnA = fnB;
  //   fnB({
  //     a: "",
  //   });

  fnA(b);
  fnB(a);
  //   fnB = fnA;

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
