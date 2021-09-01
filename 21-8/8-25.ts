namespace N825 {
  class A {
    #A = 1;
    static #AAA() {
      console.log(111);
    }
    A() {
      console.log(this.#A);
    }
  }
  const a = new A();

  interface AlignValue1 {
    type: "vertical" | "horizontal";
    value: "middle" | "center";
    key: "vertical-align" | "text-align";
  }

  interface VerticalAlign {
    type: "vertical";
    value: "middle";
    key: "vertical-align";
  }
  interface HorizontalAlign {
    type: "horizontal";
    value: "center";
    key: "text-align";
  }
  let align: VerticalAlign;
  type AlignValue2 = VerticalAlign | HorizontalAlign;
  // //参数的类型约束
  handle("center", "text-align");
  // function handle<T extends AlignValue2["type"]>(
  //   type: T,
  //   value: Extract<AlignValue2, { type: T }>["value"]
  // ) {}
  //函数重载
  function handle(
    value: VerticalAlign["value"],
    key: VerticalAlign["key"]
  ): void;
  function handle(
    value: HorizontalAlign["value"],
    key: HorizontalAlign["key"]
  ): void;
  function handle(v: AlignValue2["value"], key: AlignValue2["key"]) {
    console.log(v);
  }
}
