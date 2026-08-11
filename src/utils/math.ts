export const sum = (a: number, b: number) => a + b;

export const double = (n: number) => n * 2;

export function userDestructuringExample() {
  const user = { name: "Ana", age: 30 };
  const { name, age } = user;

  return `${name} is ${age}`;
}
