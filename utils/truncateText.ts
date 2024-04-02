export const truncateText = (text: string) => {
  if (text.length < 25) {
    text;
  }
  return text.substring(0, 25) + "...";
};
