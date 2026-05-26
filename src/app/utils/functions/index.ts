export function imageGenerator(src: string, prefix = ""): HTMLImageElement {
  const img = new Image();
  img.src = prefix ? `${prefix}${src}` : src;
  return img;
}