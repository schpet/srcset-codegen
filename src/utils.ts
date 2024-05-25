import { parse } from "path";

export function isScaleVariant(filename: string): boolean {
  let name = parse(filename).name;
  return name.match(/@(\d+)x$/) !== null;
}
