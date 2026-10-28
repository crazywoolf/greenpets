const plants = [
  { id: "monstera", name: "Монстера", latin: "Monstera", color: "#dcefdc", deep: "#2e8b54", light: "#6fc186", interval: 7, image: "https://commons.wikimedia.org/wiki/Special:FilePath/Monstera_deliciosa.jpg?width=500" },
  { id: "ficus", name: "Фикус", latin: "Ficus", color: "#e4efd8", deep: "#477d3f", light: "#82ad5b", interval: 8, image: "https://commons.wikimedia.org/wiki/Special:FilePath/FicusElastica.jpg?width=500" },
  { id: "zamioculcas", name: "Замиокулькас", latin: "Zamioculcas", color: "#e8f0d7", deep: "#5a8b3b", light: "#9bbd62", interval: 14, image: "https://commons.wikimedia.org/wiki/Special:FilePath/Zamioculcas_zamiifolia.jpg?width=500" },
  { id: "orchid", name: "Орхидея", latin: "Orchid", color: "#f0e4ec", deep: "#98537b", light: "#d28db5", interval: 9, image: "https://commons.wikimedia.org/wiki/Special:FilePath/Phalaenopsis%20Orchid.jpg?width=500" },
  { id: "spathiphyllum", name: "Спатифиллум", latin: "Spathiphyllum", color: "#dcefe4", deep: "#27775c", light: "#6ab692", interval: 6, image: "https://commons.wikimedia.org/wiki/Special:FilePath/SpathiphyllumWallisii.jpg?width=500" },
];

const storageKey = "greenpets-demo-v1";
const form = document.querySelector("#care-form");
const plantOptions = document.querySelector("#plant-options");
const resultPanel = document.querySelector("#result-panel");
let selectedPlant = plants[0];

function renderPlantOptions() {
  plantOptions.innerHTML = plants.map((plant) => `
    <button type="button" class="plant-option ${plant.id === selectedPlant.id ? "selected" : ""}" data-plant="${plant.id}" role="radio" aria-checked="${plant.id === selectedPlant.id}">
      <span class="plant-photo" style="--plant-color:${plant.color};--plant-deep:${plant.deep};--plant-light:${plant.light}"><img src="${plant.image}" alt="${plant.name}" loading="lazy" /><span class="plant-photo-fallback"></span></span>
      <strong>${plant.name}</strong>
      <small>${plant.latin}</small>
    </button>
  `).join("");
  plantOptions.querySelectorAll("[data-plant]").forEach((button) => {
    button.addEventListener("click", () => {
      selectedPlant = plants.find((plant) => plant.id === button.dataset.plant) || plants[0];
      renderPlantOptions();
      saveState();
    });
  });
  plantOptions.querySelectorAll(".plant-photo img").forEach((image) => {
    image.addEventListener("error", () => {
      image.style.display = "none";
      image.nextElementSibling.style.display = "block";
    });
  });
}

function getFormState() {
  return {
    plant: selectedPlant.id,
    light: document.querySelector("#light").value,
    watering: document.querySelector("#watering").value,
    drainage: document.querySelector("#drainage").value,
    symptoms: document.querySelector("#symptoms").value,
  };
}

function saveState() {
  localStorage.setItem(storageKey, JSON.stringify(getFormState()));
}

function restoreState() {
  const saved = JSON.parse(localStorage.getItem(storageKey) || "null");
  if (!saved) return;
  selectedPlant = plants.find((plant) => plant.id === saved.plant) || plants[0];
  ["light", "watering", "drainage", "symptoms"].forEach((id) => {
    if (saved[id]) document.querySelector(`#${id}`).value = saved[id];
  });
}

function makeRecommendation(state) {
  const days = Number(state.watering);
  const symptomText = {
    none: "сейчас нет заметных симптомов",
    dry: "есть признаки пересыхания",
    yellow: "есть пожелтевшие листья",
    droop: "листья потеряли упругость",
  }[state.symptoms];
  let warning = state.symptoms !== "none" || state.drainage === "no";
  let status = warning ? "Нужен внимательный осмотр" : "Можно настроить спокойный режим";
  let action = "Проверьте влажность грунта на глубине 3 см и поливайте только после этой проверки.";
  if (state.symptoms === "dry" || days >= 14) action = "Проверьте грунт и листья сегодня. Если грунт сухой глубже 3 см — полейте небольшим объёмом в два подхода.";
  if (state.symptoms === "yellow") action = "Не поливайте автоматически. Сначала проверьте влажность грунта и состояние корней, затем уберите пожелтевшие листья.";
  if (state.symptoms === "droop") action = "Проверьте грунт и расположение растения: сначала исключите пересушивание и холодный сквозняк.";
  if (state.drainage === "no") action = "Начните с проверки дренажа: без отвода воды следующий полив может ухудшить состояние корней.";
  const reason = `Рекомендация учитывает растение «${selectedPlant.name}», ${symptomText}, полив ${days === 1 ? "1–2 дня" : days === 4 ? "3–5 дней" : days === 8 ? "6–10 дней" : "более 10 дней"} назад и наличие дренажа: ${state.drainage === "yes" ? "да" : "нет или неизвестно"}.`;
  return { status, action, reason, warning };
}

function renderResult() {
  const state = getFormState();
  const recommendation = makeRecommendation(state);
  const weeks = [
    { label: "01", text: recommendation.action },
    { label: "02", text: "Повторно проверьте грунт и состояние листьев через 5–7 дней; не действуйте по календарю автоматически." },
    { label: "03", text: `Сверьте растение с его условиями: ${state.light === "low" ? "если света мало, оцените более светлое место без резкого солнца" : "сохраняйте текущее место и наблюдайте за реакцией"}.` },
    { label: "04", text: "В конце месяца отметьте, что сработало. Так следующий план будет точнее текущего." },
  ];
  resultPanel.innerHTML = `
    <div class="result-content">
      <div class="result-header">
        <div>
          <p class="eyebrow">${selectedPlant.name} · план ухода</p>
          <h2>${recommendation.status}</h2>
          <p>План на ближайшие 30 дней</p>
        </div>
        <span class="result-state ${recommendation.warning ? "warning" : ""}">${recommendation.warning ? "проверить" : "стабильно"}</span>
      </div>
      <div class="result-action">
        <span class="action-arrow">→</span>
        <div>
          <p><b>Следующий шаг</b><br />${recommendation.action}</p>
          <button class="why-button" type="button" id="why-button">Почему так?</button>
          <div class="why-text" id="why-text">${recommendation.reason}</div>
        </div>
      </div>
      <h3 class="plan-title">Ритм на 30 дней</h3>
      <div class="timeline">
        ${weeks.map((week) => `<div class="timeline-item"><span class="timeline-marker">${week.label}</span><p>${week.text}</p></div>`).join("")}
      </div>
      <button class="button expert-button" type="button" id="expert-button">Хочу спросить эксперта <span aria-hidden="true">↗</span></button>
      <p class="expert-note" id="expert-note">Сохранили намерение — подключение эксперта добавим в следующую версию.</p>
    </div>
  `;
  document.querySelector("#why-button").addEventListener("click", () => document.querySelector("#why-text").classList.toggle("visible"));
  document.querySelector("#expert-button").addEventListener("click", () => document.querySelector("#expert-note").classList.add("visible"));
  saveState();
}

restoreState();
renderPlantOptions();
form.addEventListener("submit", (event) => {
  event.preventDefault();
  renderResult();
});
