// Monthly sales data for a fashion brand (in 10k CNY)
// Simulates seasonal trends: lower in Q1, peak in Q3/Q4 (e-commerce festivals)

const MONTHS = [
  '1月', '2月', '3月', '4月', '5月', '6月',
  '7月', '8月', '9月', '10月', '11月', '12月'
];

// Random helper: value ± variance%
function fluctuate(base, variance) {
  const ratio = 1 + (Math.random() - 0.5) * 2 * variance;
  return Math.round(base * ratio);
}

// Base sales pattern: low after CNY → rise in spring → summer peak → Double 11 spike → year-end dip
const BASE_SALES = [80, 55, 95, 120, 140, 155, 170, 160, 180, 210, 260, 190];

const sales = BASE_SALES.map((base) => fluctuate(base, 0.15));

export { MONTHS, sales };
