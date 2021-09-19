export const fluidFontSize = (
  maxFontSizeInRem: number,
  minFontSizeInRem: number,
): string => {
  const minViewportWidthInPx = 1280;
  const maxViewportWidthInPx = 1980;
  const htmlFontSize = 10;

  const minViewportWidthInRem = minViewportWidthInPx / htmlFontSize;
  const maxViewportWidthInRem = maxViewportWidthInPx / htmlFontSize;

  const factor =
    (1 / (maxViewportWidthInRem - minViewportWidthInRem)) *
    (maxFontSizeInRem - minFontSizeInRem);

  const remFactor = minFontSizeInRem - minViewportWidthInRem * factor;
  const vwFactor = 100 * factor;

  const min = Math.min(minFontSizeInRem, maxFontSizeInRem);
  const max = Math.max(minFontSizeInRem, maxFontSizeInRem);

  return `clamp(${min}rem, ${remFactor}rem + ${vwFactor}vw, ${max}rem)`;
};
