// Specs: manufacturer ratings for each trim; MPG is the EPA city/highway estimate (fueleconomy.gov).
// Photos: Wikimedia Commons, used under the licenses noted in each credit.
const CARS = [
  { stock: "N2417", year: 2022, make: "Toyota", model: "Camry", trim: "SE · 2.5L 4-cyl", body: "Sedan", price: 24990, miles: 31240, vin: "U419823", certified: true,
    hp: 203, torque: 184, trans: "8-speed auto", drive: "FWD", mpg: [28, 39],
    img: "images/toyota-camry.jpg", credit: { by: "Elise240SX", license: "CC BY-SA 4.0", url: "https://commons.wikimedia.org/wiki/File:2022_Toyota_Camry_SE_Standard_Package_in_Celestial_Silver_Metallic,_Front_Left,_08-06-2022.jpg" } },
  { stock: "N2422", year: 2021, make: "Honda", model: "CR-V", trim: "EX · 1.5L turbo 4-cyl", body: "SUV", price: 26450, miles: 38870, vin: "L002541", certified: true,
    hp: 190, torque: 179, trans: "CVT", drive: "AWD", mpg: [27, 32],
    img: "images/honda-crv.jpg", credit: { by: "Kevauto", license: "CC BY-SA 4.0", url: "https://commons.wikimedia.org/wiki/File:2021_Honda_CR-V_EX_(facelift),_front_3.24.23.jpg" } },
  { stock: "N2398", year: 2020, make: "Ford", model: "F-150", trim: "XLT SuperCrew · 2.7L EcoBoost V6", body: "Truck", price: 33900, miles: 52310, vin: "FC71844", certified: false,
    hp: 325, torque: 400, trans: "10-speed auto", drive: "4x4", mpg: [18, 23],
    img: "images/ford-f150.jpg", credit: { by: "MercurySable99", license: "CC BY-SA 4.0", url: "https://commons.wikimedia.org/wiki/File:2020_Ford_F-150_XLT_SuperCrew_4x4_with_FX4_Off-Road_%26_Chrome_Packages,_front_left,_04-07-2023.jpg" } },
  { stock: "N2431", year: 2023, make: "Mazda", model: "Mazda3", trim: "2.5 S Preferred Hatchback · 2.5L 4-cyl", body: "Hatchback", price: 22750, miles: 14980, vin: "M650337", certified: true,
    hp: 191, torque: 186, trans: "6-speed auto", drive: "FWD", mpg: [27, 35],
    img: "images/mazda3.jpg", credit: { by: "MercurySable99", license: "CC BY-SA 4.0", url: "https://commons.wikimedia.org/wiki/File:2025_Mazda3_2.5_S_Carbon_Edition_hatchback,_front_right,_05-25-2025.jpg" } },
  { stock: "N2405", year: 2019, make: "Subaru", model: "Outback", trim: "2.5i Premium · 2.5L Boxer 4-cyl", body: "SUV", price: 21300, miles: 61450, vin: "K331902", certified: false,
    hp: 175, torque: 174, trans: "CVT", drive: "AWD", mpg: [25, 32],
    img: "images/subaru-outback.jpg", credit: { by: "MercurySable99", license: "CC BY-SA 4.0", url: "https://commons.wikimedia.org/wiki/File:2019_Subaru_Outback_2.5i_Limited,_front_right,_08-27-2024.jpg" } },
  { stock: "N2440", year: 2024, make: "Hyundai", model: "Elantra", trim: "SEL · 2.0L 4-cyl", body: "Sedan", price: 19850, miles: 9120, vin: "R118064", certified: true,
    hp: 147, torque: 132, trans: "IVT (CVT)", drive: "FWD", mpg: [31, 40],
    img: "images/hyundai-elantra.jpg", credit: { by: "BuickRiviera99", license: "CC BY-SA 4.0", url: "https://commons.wikimedia.org/wiki/File:2024_Hyundai_Elantra_SEL,_front_right,_07-25-2026.jpg" } },
  { stock: "N2389", year: 2021, make: "Chevrolet", model: "Silverado 1500", trim: "LT Double Cab · 5.3L V8", body: "Truck", price: 38400, miles: 44700, vin: "MZ20977", certified: true,
    hp: 355, torque: 383, trans: "8-speed auto", drive: "4WD", mpg: [16, 22],
    img: "images/chevrolet-silverado.jpg", credit: { by: "MercurySable99", license: "CC BY-SA 4.0", url: "https://commons.wikimedia.org/wiki/File:2021_Chevrolet_Silverado_1500_LT_4x4_Double_Cab,_front_right,_09-02-2022.jpg" } },
  { stock: "N2436", year: 2022, make: "Volkswagen", model: "Golf GTI", trim: "S · 2.0L turbo 4-cyl", body: "Hatchback", price: 27600, miles: 22340, vin: "NM40215", certified: false,
    hp: 241, torque: 273, trans: "6-speed manual", drive: "FWD", mpg: [24, 34],
    img: "images/vw-golf-gti.jpg", credit: { by: "Charles from Port Chester, New York", license: "CC BY 2.0", url: "https://commons.wikimedia.org/wiki/File:Volkswagen_Golf_VIII_GTI_(2021)_(52197086612).jpg" } },
  { stock: "N2412", year: 2020, make: "Kia", model: "Telluride", trim: "EX · 3.8L V6", body: "SUV", price: 31250, miles: 47820, vin: "LG07733", certified: true,
    hp: 291, torque: 262, trans: "8-speed auto", drive: "AWD", mpg: [19, 24],
    img: "images/kia-telluride.jpg", credit: { by: "Kevauto", license: "CC BY-SA 4.0", url: "https://commons.wikimedia.org/wiki/File:2019_Kia_Telluride_EX_V6_front_4.14.19.jpg" } },
];

const money = n => "$" + Math.round(n).toLocaleString("en-US");
function payment(principal, apr, months) {
  if (principal <= 0) return 0;
  const r = apr / 100 / 12;
  return r === 0 ? principal / months : principal * r / (1 - Math.pow(1 + r, -months));
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
      <figure class="photo">
        <img src="${c.img}" alt="${c.year} ${c.make} ${c.model}" loading="lazy" width="800" height="450">
        <figcaption>Photo: <a href="${c.credit.url}" target="_blank" rel="noopener">${c.credit.by}</a>, ${c.credit.license}</figcaption>
      </figure>
      <div class="info">
        <div><h3>${c.year} ${c.make} ${c.model}</h3><div class="trim">${c.trim}</div></div>
        <div class="specs">
          <div><span class="label">Odometer</span><b>${odometer(c.miles)}</b></div>
          <div><span class="label">MPG city / hwy</span><b>${c.mpg[0]} / ${c.mpg[1]}</b></div>
          <div><span class="label">Power</span><b>${c.hp} hp</b></div>
          <div><span class="label">Torque</span><b>${c.torque} lb-ft</b></div>
          <div><span class="label">Transmission</span><b>${c.trans}</b></div>
          <div><span class="label">Drivetrain</span><b>${c.drive}</b></div>
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
