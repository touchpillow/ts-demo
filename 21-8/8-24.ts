namespace N824 {
  interface A {
    a: string;
    b?: string;
  }
  interface B {
    c: string;
  }
  let inter: A & B;

  let a: A = { a: "" };
  a = inter;
  const b = a.b; //b的类型？
  type KeyType = string | number | Symbol;
  //   type ValueType<T> = T[KeyType];
  const s = JSON.stringify(a);
  let v: string = s;
  type C = string & A;
  const c: C = '{"a":""}';
  type NullType = string | null | undefined; //此时NullType为string
}
