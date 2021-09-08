const obj = {
    ["编辑"]: "edit",
    ["新增"]: "add",
};
const unsafeAs = (obj) => {
    // return obj as T
    return 1;
};
let b = "";
// const c = unsafeAs<string>(b);
const fn1 = () => {
    let c = 1;
    const a = unsafeAs(c);
    console.log(1);
};
fn1();
keyof;
B ? A[K] : K;
;
keyof;
B
    ? B[K]
    : K;
keyof;
A
    ? A[K]
    : void ;
;
keyof;
B ? true : false;
const c = {
    a: "",
    b: "",
    c: 1,
    d: "d",
};
B ? A : B;
T[] ? K : never;
[keyof, T];
const findTargetInTree = (list, key, value, childKey) => {
    const stack = [...list];
    while (stack.length) {
        const item = stack.shift();
        if (item[key] === value)
            return item;
        const ch = item[childKey];
        stack.push(...item[childKey]);
    }
};
const a = [
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
const findTargetInTree2 = (list, key, value, getChildren) => {
    const stack = [...list];
    while (stack.length) {
        const item = stack.shift();
        if (item[key] === value)
            return item;
        stack.push(...getChildren(item));
    }
};
findTargetInTree2(a, "name", "", (v) => v.children);
const item = "items";
let un = "1";
let nu = 1;
if (typeof un === "number") {
    nu = un;
}
else {
    un = "2";
}
if (typeof un === "number") {
    console.log(un);
}
//# sourceMappingURL=8-14.js.map