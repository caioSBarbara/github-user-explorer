export const formatSize = (size: number) => {
  if (size < 1024) return `${size} KB`;
  return `${(size / 1024).toFixed(1)} MB`;
};
