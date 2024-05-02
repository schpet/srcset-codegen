# SRCSET CODEGEN

srcset codegen generates typescript files for images with @2x, @3x variants and exports src, srcSet, width and height attributes. 

e.g. given you have images with `@2x` and `@3x` suffixes, it'll produce ts files in a `__generated__` directory

```
src/
└── images
    ├── cat@2x.png
    ├── cat.png
    ├── logo@3x.png
    ├── logo.png
    ├── logo@2x.png
    └── __generated__
        ├── logo.ts
        └── cat.ts
```

```ts
// File: src/images/__generated__/logo.ts
import src from "../logo.png"
import src2x from "../logo@2x.png"
import src3x from "../logo@3x.png"
const width = 282
const height = 55
export const logo = { src, srcSet: `${src2x} 2x, ${src3x} 3x`, width, height }
```

implementation is a rough proof of concept and hasn't been tested much but it's proven useful regardless.

## Usage

```bash
npx srcset-codegen generate src/images
```

## Notes

inspired by [react-native images](https://reactnative.dev/docs/images).

