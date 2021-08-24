const obj = {
  ["编辑"]: "edit",
  ["新增"]: "add",
};

type ObjKeys = keyof typeof obj;

const unsafeAs: (v) => never = <T>(obj): never => {
  // return obj as T
  return 1 as unknown as never;
};

let b = "";
// const c = unsafeAs<string>(b);

const fn1 = () => {
  let c = 1;
  const a = unsafeAs(c);
  console.log(1);
};
fn1();

interface A {
  a: string;
  b: string;
  c: number;
  d: boolean;
}
interface B {
  a: number;
  b: string;
  c: string;
  e: string;
}
type C = { [K in keyof A]: K extends keyof B ? A[K] : K };
type UnionKey<A, B> = keyof A | keyof B;
type CO<A, B> = {
  [K in UnionKey<A, B>]: K extends keyof B
    ? B[K]
    : K extends keyof A
    ? A[K]
    : void;
};
type IsExtends<A, B> = A extends keyof B ? true : false;
type C1 = CO<A, B>;
const c: C = {
  a: "",
  b: "",
  c: 1,
  d: "d",
};

interface Tree {
  name: string;
  children?: Tree[];
  aaa?: Tree[];
}

type isExtends<A, B> = A extends B ? A : B;

type DynamicTree<T, S extends string> = { [K in S]?: T[] };
type FindTarget<T> = {
  [K in keyof T]: T[K] extends T[] ? K : never;
}[keyof T];
const findTargetInTree = <
  T extends DynamicTree<T, U>,
  K extends keyof T,
  U extends string & FindTarget<T>
>(
  list: T[],
  key: K,
  value: T[K],
  childKey: U
): T | undefined => {
  const stack: T[] = [...list];
  while (stack.length) {
    const item = stack.shift();
    if (item[key] === value) return item;
    const ch = item[childKey];
    stack.push(...item[childKey]);
  }
};
const a: Tree[] = [
  {
    name: "",
    children: [
      {
        name: "",
      },
    ],
  },
  {
    name: "2",
    children: [],
  },
];
findTargetInTree(a, "name", "", "children");
const findTargetInTree2 = <T, K extends keyof T>(
  list: T[],
  key: K,
  value: T[K],
  getChildren: (item: T) => T[]
): T | void => {
  const stack: T[] = [...list];
  while (stack.length) {
    const item = stack.shift();
    if (item[key] === value) return item;
    stack.push(...getChildren(item));
  }
};
findTargetInTree2(a, "name", "", (v) => v.children);

interface AAA {
  items: AAA[];
  name: string;
}
const item = "items";
type D = typeof item;
type Tree1 = DynamicTree<AAA, "items" | "name">;
type Key = keyof Tree1;
// interface BasicTree<T> {
//   children?: T[];
// }
type BasicTree<T> = DynamicTree<T, "children">;
let un: string = "1";

let nu = 1;

if (typeof un === "number") {
  nu = un;
} else {
  un = "2";
}
type Union = A & B;
if (typeof un === "number") {
  console.log(un);
}
