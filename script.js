const CARS = [
  { stock: "N2417", year: 2022, make: "Toyota", model: "Camry", trim: "SE · 2.5L 4-cyl · FWD", body: "Sedan", price: 24990, miles: 31240, mpg: [28, 39], vin: "U419823", certified: true },
  { stock: "N2422", year: 2021, make: "Honda", model: "CR-V", trim: "EX · 1.5L Turbo · AWD", body: "SUV", price: 26450, miles: 38870, mpg: [27, 32], vin: "L002541", certified: true },
  { stock: "N2398", year: 2020, make: "Ford", model: "F-150", trim: "XLT SuperCrew · 2.7L EcoBoost · 4x4", body: "Truck", price: 33900, miles: 52310, mpg: [18, 23], vin: "FC71844", certified: false },
  { stock: "N2431", year: 2023, make: "Mazda", model: "Mazda3", trim: "Preferred Hatchback · 2.5L · FWD", body: "Hatchback", price: 22750, miles: 14980, mpg: [28, 36], vin: "M650337", certified: true },
  { stock: "N2405", year: 2019, make: "Subaru", model: "Outback", trim: "Premium · 2.5L Boxer · AWD", body: "SUV", price: 21300, miles: 61450, mpg: [26, 33], vin: "K331902", certified: false },
  { stock: "N2440", year: 2024, make: "Hyundai", model: "Elantra", trim: "SEL · 2.0L · FWD", body: "Sedan", price: 19850, miles: 9120, mpg: [32, 41], vin: "R118064", certified: true },
  { stock: "N2389", year: 2021, make: "Chevrolet", model: "Silverado 1500", trim: "LT Crew Cab · 5.3L V8 · 4WD", body: "Truck", price: 38400, miles: 44700, mpg: [16, 20], vin: "MZ20977", certified: true },
  { stock: "N2436", year: 2022, make: "Volkswagen", model: "Golf GTI", trim: "S · 2.0T · 6-speed manual", body: "Hatchback", price: 27600, miles: 22340, mpg: [24, 34], vin: "NM40215", certified: false },
  { stock: "N2412", year: 2020, make: "Kia", model: "Telluride", trim: "EX · 3.8L V6 · AWD", body: "SUV", price: 31250, miles: 47820, mpg: [20, 24], vin: "LG07733", certified: true },
];

const SHAPES = {
  Sedan:     { body: "M10 58 L14 46 Q22 40 42 38 L64 24 Q72 20 90 20 L122 20 Q134 20 146 32 L156 38 Q182 40 188 48 L190 58 Z", glass: "M70 36 L84 25 Q88 23 96 23 L116 23 L116 36 Z M121 23 Q132 23 141 33 L143 36 L121 36 Z", wheels: [48, 152] },
  SUV:       { body: "M10 58 L12 42 Q14 34 30 32 L46 16 Q50 12 60 12 L142 12 Q150 12 156 20 L168 32 Q186 34 190 44 L190 58 Z", glass: "M52 30 L62 17 L96 17 L96 30 Z M101 17 L130 17 L130 30 L101 30 Z M135 17 L146 17 Q150 17 153 21 L160 30 L135 30 Z", wheels: [46, 154] },
  Truck:     { body: "M10 58 L10 36 L86 36 L86 16 Q86 12 94 12 L126 12 Q134 12 140 20 L152 34 Q184 36 190 44 L190 58 Z", glass: "M92 32 L92 17 L110 17 L110 32 Z M115 17 L128 17 Q132 17 135 21 L143 32 L115 32 Z", wheels: [42, 156] },
  Hatchback: { body: "M14 58 L16 44 Q22 38 44 36 L66 20 Q72 16 84 16 L134 16 Q142 16 147 26 L156 40 Q178 42 184 50 L184 58 Z", glass: "M72 34 L86 21 L108 21 L108 34 Z M113 21 L134 21 Q139 21 142 28 L145 34 L113 34 Z", wheels: [48, 150] },
};

const money = n => "$" + Math.round(n).toLocaleString("en-US");
function payment(principal, apr, months) {
  if (principal <= 0) return 0;
  const r = apr / 100 / 12;
  return r === 0 ? principal / months : principal * r / (1 - Math.pow(1 + r, -months));
}

function carSvg(body) {
  const s = SHAPES[body];
  const wheels = s.wheels.map(x => `<circle class="tire" cx="${x}" cy="58" r="12"/><circle class="hub" cx="${x}" cy="58" r="5"/>`).join("");
  return `<svg viewBox="0 0 200 76" role="img" aria-label="${body} silhouette"><ellipse class="shadow" cx="100" cy="70" rx="92" ry="4"/><path class="body" d="${s.body}"/><path class="glass" d="${s.glass}"/>${wheels}</svg>`;
}

function odometer(miles) {
  return `<span class="odo" aria-label="${miles.toLocaleString("en-US")} miles">${String(miles).padStart(6, "0").split("").map(d => `<i>${d}</i>`).join("")}</span>`;
}

const state = { body: "All", max: 0, sort: "price-asc" };
const grid = document.getElementById("grid");

function render() {
  let list = CARS.filter(c => (state.body === "All" || c.body === state.body) && (!state.max || c.price < state.max));
  const [key, dir] = state.sort.split("-");
  const field = { price: "price", miles: "miles", year: "year" }[key];
  list.sort((a, b) => dir === "asc" ? a[field] - b[field] : b[field] - a[field]);

  document.getElementById("count").textContent = `${list.length} of ${CARS.length} vehicles`;
  if (!list.length) {
    grid.innerHTML = `<p class="empty">No vehicles match these filters. Try a higher price limit or another body style.</p>`;
    return;
  }
  grid.innerHTML = list.map(c => `
    <article class="sticker">
      <header><span class="label">Stock #${c.stock}</span><span class="label">VIN …${c.vin}</span></header>
      <div class="art">${carSvg(c.body)}</div>
      <div class="info">
        <div><h3>${c.year} ${c.make} ${c.model}</h3><div class="trim">${c.trim}</div></div>
        <div class="specs">
          <div><span class="label">Odometer</span><b>${odometer(c.miles)}</b></div>
          <div><span class="label">MPG city / hwy</span><b>${c.mpg[0]} / ${c.mpg[1]}</b></div>
          <div><span class="label">Body</span><b>${c.body}</b></div>
          <div><span class="label">Inspection</span><b>152 / 152</b></div>
        </div>
        ${c.certified ? `<span class="badge">Certified pre-owned · 12 mo warranty</span>` : ""}
      </div>
      <footer>
        <div><div class="price">${money(c.price)}</div><div class="permo">est. ${money(payment(c.price - 4000, 6.9, 60))}/mo · $4k down, 60 mo</div></div>
        <button class="btn ghost" type="button" data-price="${c.price}">Estimate payment</button>
      </footer>
    </article>`).join("");
}

const chips = document.getElementById("bodyChips");
["All", "Sedan", "SUV", "Truck", "Hatchback"].forEach(b => {
  const btn = document.createElement("button");
  btn.type = "button"; btn.className = "chip"; btn.id = "chip-" + b; btn.textContent = b;
  btn.setAttribute("aria-pressed", String(b === state.body));
  btn.addEventListener("click", () => {
    state.body = b;
    chips.querySelectorAll(".chip").forEach(c => c.setAttribute("aria-pressed", String(c === btn)));
    render();
  });
  chips.appendChild(btn);
});
document.getElementById("maxPrice").addEventListener("change", e => { state.max = +e.target.value; render(); });
document.getElementById("sort").addEventListener("change", e => { state.sort = e.target.value; render(); });

grid.addEventListener("click", e => {
  const btn = e.target.closest("[data-price]");
  if (!btn) return;
  document.getElementById("cPrice").value = btn.dataset.price;
  calc();
  document.getElementById("finance").scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
});

function calc() {
  const price = +document.getElementById("cPrice").value || 0;
  const down = +document.getElementById("cDown").value || 0;
  const apr = +document.getElementById("cApr").value || 0;
  const term = +document.getElementById("cTerm").value;
  const principal = Math.max(price - down, 0);
  const m = payment(principal, apr, term);
  document.getElementById("cOut").textContent = money(m);
  document.getElementById("cDetail").textContent =
    `Financing ${money(principal)} · total interest ${money(m * term - principal)} over ${term} months`;
}
document.getElementById("calc").addEventListener("input", calc);
document.getElementById("calc").addEventListener("submit", e => e.preventDefault());

document.getElementById("tradeForm").addEventListener("submit", e => {
  e.preventDefault();
  const model = document.getElementById("tModel").value.trim();
  const toast = document.getElementById("tradeToast");
  toast.textContent = `Request received for your ${document.getElementById("tYear").value} ${model}. Expect a reply within one business day.`;
  toast.hidden = false;
  e.target.reset();
});

document.getElementById("statCount").textContent = CARS.length;
document.getElementById("statFrom").textContent = "$" + Math.round(Math.min(...CARS.map(c => c.price)) / 1000) + "k";
render();
calc();
