// declare global {

// }
// export {};
// type JSONString<T> = string & T;
type JSONString<T> = string & {
  _: T;
};

interface JSON {
  stringify<T>(value: T): JSONString<T>;
  parse<T>(text: JSONString<T>): T;
}
