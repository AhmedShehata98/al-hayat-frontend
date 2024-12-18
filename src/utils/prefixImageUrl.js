export function prefixImageUrl(imageUrl) {
  const url = process.env.NEXT_PUBLIC_IMAGE_URL;
  if (imageUrl) {
    return url.replace(/\/$/, "").concat("/").concat(imageUrl);
  }
  return undefined;
}
