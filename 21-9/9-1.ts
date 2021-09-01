namespace N0901 {
  //   interface A {
  //     a: number;
  //     b: number;
  //   }
  //   interface B {
  //     new (...arg: any): A;
  //   }
  //   type d = InstanceType<B>;
  //   class C implements A {
  //     b = 1;
  //     a = 1;
  //     c = 1;
  //   }
  //   let a: InstanceType<B> = new C();
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
  const person = {
    name: "",
    age: 1,
  };
  type Person = typeof person; // {name:string, age:number }
  const optionsMap = {
    yes: 1,
    no: 0,
  } as const;
  type Person2 = typeof optionsMap; // {readonly yes:1, readonly no:0 }
  type WriteReferenceValue<T> = {
    -readonly [P in keyof T]: T[P];
  };
  type Person3 = WriteReferenceValue<Person2>; //{ yes:1,  no:0 }
  enum AAA {
    a = 1,
    b = 2,
  } //等价于 const 的对象
  function aaa(v: keyof typeof AAA) {
    return AAA[v]; //const enum时 只有使用字符串文本才能访问常数枚举成员
  }
  const v = aaa("a");
  const selectOptions = [
    {
      label: "",
      value: 1,
    },
    {
      label: "",
      value: 2,
    },
  ];
  type SelectOptions = typeof selectOptions;
  //  type SelectOptions = {
  //    label: string;
  //   value: number;
  //    }[]
  const vertical = ["middle", "top", "bottom"] as const;
  const horizontal = ["left", "right", "center"] as const;
  type ConnectStringBySperator<
    T extends string,
    S extends string,
    R extends string
  > = `${T}${R}${S}`;
  type ConnectString<T extends string, S extends string> =
    ConnectStringBySperator<T, S, "-">;
  type Direction = ConnectString<
    ReferenceValue<typeof vertical>,
    ReferenceValue<typeof horizontal>
  >;
  type To9 = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9";
  type To1 = "0" | "1";
  type To3 = "0" | "1" | "2" | "3";
  type To5 = "0" | "1" | "2" | "3" | "4" | "5";

  type ConnectTime<T extends string, S extends string> =
    ConnectStringBySperator<T, S, ":">;

  type Hour = `${To1}${To9}` | `2${To3}`;
  type Min = `${To5}${To9}`;
  type TimeString = ConnectTime<Hour, Min>;
  function getTime(params: TimeString) {}
  getTime("02:22");
}
