"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var N906;
(function (N906) {
    // let a;
    // a = 1;
    // function lookupHeadphonesManufacturer(color: "blue" | "black") {
    //   // Function lacks ending return statement and return type does not include 'undefined'.
    //   if (color === "blue") {
    //     return "beats";
    //   }
    // }
    // class Album {
    //   setup() {}
    // }
    // class MLAlbum extends Album {
    //   override setup() {}
    // }
    // class SharedAlbum extends Album {
    //  override setup() {}
    // // This member must have an 'override' modifier because it overrides a member in the base class 'Album'.
    // }
    class Rectangle {
        constructor(width, height) {
            this.width = width;
            this.height = height;
        }
        getAreaFunction() {
            return function () {
                return this.width * this.height;
                // 'this' implicitly has type 'any' because it does not have a type annotation.
                // 'this' implicitly has type 'any' because it does not have a type annotation.
            };
        }
    }
    let b = { a: "" };
    const v = b["name"]; //类型为string|undefiend
    const createKeyboard = (modelID) => {
        const defaultModelID = 23;
        // 'defaultModelID' is declared but its value is never read.
        return { type: "keyboard", modelID };
    };
})(N906 || (N906 = {}));
//# sourceMappingURL=9-7.js.map