import { join, parse } from "path";

export function isScaleVariant(filename: string): boolean {
  let name = parse(filename).name;
  return name.match(/@(\d+)x$/) !== null;
}

export function isBaseVariant(base: string, filename: string): boolean {
  if (!isScaleVariant(filename)) {
    throw new Error(`path ${filename} is not a scale variant`);
  }

  let baseParsed = parse(base);
  let filenameParsed = parse(filename);
  let isNameMatch = filenameParsed.name.startsWith(baseParsed.name + "@");

  return isNameMatch && baseParsed.ext === filenameParsed.ext;
}

export function isImage(
  filename: string,
  imageExtensions = IMAGE_EXTENSIONS
): boolean {
  let ext = parse(filename).ext;
  return imageExtensions.includes(ext);
}

/** based on image formats in https://www.npmjs.com/package/image-size */
const IMAGE_EXTENSIONS: Array<string> = [
  ".png",
  ".jpg",
  ".jpeg",

  ".bmp",
  ".cur",
  ".dds",
  ".gif",
  ".heic",
  ".heif",
  ".avci",
  ".avif",
  ".icns",
  ".ico",
  ".j2c",
  ".jp2",
  ".ktx",
  ".ktx2",
  ".pam",
  ".pbm",
  ".pfm",
  ".pgm",
  ".ppm",
  ".pnm",
  ".psd",
  ".tga",
  ".tiff",
  ".tif",
  ".webp",

  // put svg last so if there's a name conflict, the previous formats are preferred
  ".svg",
];

/**
 * given filenames like foo.jpg, foo.png, foo.svg return foo.png
 */
export function uniqNames(
  filenames: Set<string>,
  extensionOrder = IMAGE_EXTENSIONS
): Set<string> {
  let uniqPaths = new Map<string, string>();
  for (let path of filenames) {
    let parsed = parse(path);
    let name = parsed.name;
    let existingPath = uniqPaths.get(name);
    if (existingPath == null) {
      uniqPaths.set(name, path);
    } else {
      let existingExtIndex = extensionOrder.indexOf(parse(existingPath).ext);
      let extIndex = extensionOrder.indexOf(parsed.ext);
      if (extIndex < existingExtIndex) {
        uniqPaths.set(name, path);
      }
    }
  }
  return new Set(uniqPaths.values());
}
