export function prefixAudioUrl(imageUrl) {
  if (imageUrl) {
    return `${process.env.NEXT_PUBLIC_BASE_URL}/storage/${imageUrl}`;
  }
  return undefined;
}
