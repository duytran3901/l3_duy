export const shorten = (text, maxLength) => {
  return text?.length > maxLength ? text.slice(0, maxLength - 3) + "..." : text;
}
