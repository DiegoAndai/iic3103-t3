import formatPercent from './formatPercent';

export default function formatVariation(float, digits=2) {
  const percent = formatPercent(float, digits);
  if (float > 0) {
    return `+${percent}`;
  } else {
    return percent;
  }
}