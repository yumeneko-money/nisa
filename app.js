const fmtJPY = (n) => n.toLocaleString('ja-JP', { style: 'currency', currency: 'JPY', maximumFractionDigits: 0 });
const clamp = (x, min, max) => Math.min(Math.max(x, min), max);
const el = (id) => document.getElementById(id);

const monthlyEl = el('monthly');
const yearsEl = el('years');
const rateEl = el('rate');
const inflEl = el('inflation');

const fvEl = el('fv');
const principalEl = el('principal');
const gainEl = el('gain');
const realEl = el('real');

let chart;

function calcFV(monthly, years, annualRate) {
  const months = Math.round(years * 12);
  const r = Math.pow(1 + annualRate, 1/12) - 1; // 月利
  if (r === 0) return monthly * months;
  const fv = monthly * ((Math.pow(1 + r, months) - 1) / r);
  return fv;
}

function buildSeries(monthly, years, annualRate) {
  const series = [];
  let total = 0;
  const r = Math.pow(1 + annualRate, 1/12) - 1;
  let value = 0;
  for (let y = 1; y <= years; y++) {
    for (let m = 1; m <= 12; m++) {
      value = value * (1 + r) + monthly;
      total += monthly;
    }
    series.push({ year: y, principal: total, value: value });
  }
  return series;
}

function update() {
  const monthly = clamp(Number(monthlyEl.value || 0), 0, 1e9);
  const years = clamp(Number(yearsEl.value || 0), 1, 60);
  const rate = clamp(Number(rateEl.value || 0) / 100, 0, 1);
  const infl = clamp(Number(inflEl.value || 0) / 100, 0, 1);

  const fv = calcFV(monthly, years, rate);
  const principal = monthly * years * 12;
  const gain = fv - principal;
  const real = infl > 0 ? fv / Math.pow(1 + infl, years) : null;

  fvEl.textContent = fmtJPY(fv);
  principalEl.textContent = fmtJPY(principal);
  gainEl.textContent = fmtJPY(gain);
  realEl.textContent = real !== null ? fmtJPY(real) : '—';

  const series = buildSeries(monthly, years, rate);
  const labels = series.map(s => `${s.year}年目`);
  const principalData = series.map(s => s.principal);
  const valueData = series.map(s => s.value);

  if (chart) chart.destroy();
  const ctx = document.getElementById('chart');
  chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels,
      datasets: [
        { label: '元本', data: principalData, borderWidth: 2, tension: .2 },
        { label: '評価額', data: valueData, borderWidth: 2, tension: .2 }
      ]
    },
    options: {
      responsive: true,
      plugins: { legend: { position: 'bottom' }, tooltip: { mode: 'index', intersect: false } },
      interaction: { mode: 'nearest', axis: 'x', intersect: false },
      scales: { y: { ticks: { callback: (v) => v.toLocaleString('ja-JP') + '円' } } }
    }
  });
}

document.getElementById('form').addEventListener('submit', (e) => { e.preventDefault(); update(); });
document.getElementById('reset').addEventListener('click', () => {
  monthlyEl.value = 30000; yearsEl.value = 20; rateEl.value = 5.0; inflEl.value = 0.0; update();
});
document.getElementById('year').textContent = new Date().getFullYear();
update();
