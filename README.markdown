# SRCSET CODEGEN

generates typescript for a images scaled at different [scale factors](https://developer.apple.com/design/human-interface-guidelines/images#Resolution) with filenames ending in @2x, @3x and so on.

## Usage

```bash
npx srcset-codegen generate src/images

# or, to watch for filesystem changes
npx srcset-codegen generate --watch src/images
```

## Notes

inspired by [react-native images](https://reactnative.dev/docs/images).
