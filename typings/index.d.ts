// declare global {

// }
// export {};
type JSONString<T> = string & {
  _: T;
};
// type JSONString<T> = {
//   _: string;
//   // __: T;
// } & string;

interface JSON {
  stringify<T>(value: T): JSONString<T>;
  parse<T>(text: JSONString<T>): T;
}
