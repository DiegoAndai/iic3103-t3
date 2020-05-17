export default function formatPercent(float, digits=2) {
  return parseFloat(float * 100).toFixed(digits) + "%";
}