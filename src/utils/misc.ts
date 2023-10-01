export function randomStr(len = 5) {
  return (Math.random() * Math.pow(10, len)).toFixed(0);
}

export function equal<K extends string>(key: K, id: any) {
  return (i: { [Key in K]: any }) => id === i[key];
}
