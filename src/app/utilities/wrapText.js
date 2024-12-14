export const wrapText = (text, maxLength) => {
  const result = [];
  let start = 0;
  while (start < text?.length) {
    result.push(text.slice(start, start + maxLength));
    start += maxLength;
  }
  return result.join('\n');
}