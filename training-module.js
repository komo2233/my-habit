(() => {
  "use strict";

  const data = window.TRAINING_DATA;
  if (!data) return;

  const { icons, programs, library } = data;
  const state = { programId: "home-four-split", dayIndex: 0, wasDetail: false };
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const habitModule = $("#habitModule");
  const trainingModule = $("#trainingModule");
  const trainingLibraryView = $("#trainingLibraryView");
  const trainingPlanView = $("#trainingPlanView");
  const trainingGrid = $("#trainingGrid");
  const dayList = $("#trainingDayList");
  const warmupList = $("#trainingWarmupList");
  const exerciseList = $("#trainingExerciseList");
  const cueDialog = $("#trainingCueDialog");

  if (!habitModule || !trainingModule || !trainingGrid || !cueDialog) return;

  const currentProgram = () => programs[state.programId] || programs["home-four-split"];
  const currentPlan = () => currentProgram().days[state.dayIndex];
  const totalSets = (plan) => plan.exercises.reduce((sum, exercise) => sum + exercise.sets, 0);
  const notify = (message) => {
    if (typeof window.showToast === "function") window.showToast(message);
  };

  function renderLibrary() {
    trainingGrid.innerHTML = library.map((item) => {
      const coverClass = item.id === "four-split-training" ? " has-four-split-cover" : "";
      const content = `<div class="training-plan-art${coverClass}"></div><div class="training-plan-info"><h2>${item.name}</h2><p class="training-plan-parts">${item.parts}</p><span class="training-plan-author">${item.author}</span></div>`;
      if (!item.available) {
        return `<button class="training-plan-card is-unavailable" type="button" data-training-placeholder aria-label="未添加的健身计划"><div class="training-plan-art"></div><div class="training-plan-info training-plan-info-empty" aria-hidden="true"></div></button>`;
      }
      return `<a class="training-plan-card is-available" href="#training/${item.id}" aria-label="打开${item.name}">${content}</a>`;
    }).join("");
  }

  function renderDays() {
    dayList.innerHTML = currentProgram().days.map((plan, index) => `
      <button class="training-day-button ${index === state.dayIndex ? "is-active" : ""}" type="button" data-training-day="${index}" aria-pressed="${index === state.dayIndex}">
        <span class="training-day-code">${plan.code.replace("DAY ", "D")}</span>
        <span class="training-day-name">${plan.name}</span>
        <span class="training-day-foot">${plan.exercises.length} 个动作</span>
      </button>
    `).join("");
  }

  function renderWarmups() {
    const plan = currentPlan();
    warmupList.innerHTML = plan.warmups.map((item, index) => {
      const dose = item.dose.replace(/\s*·\s*1\s*组\s*$/, "");
      return `<div class="training-warmup-row">
        <div class="training-warmup-copy"><h3>${item.name}</h3></div>
        <div class="training-warmup-spec"><strong>1 组</strong><span>${dose}</span><small>—</small></div>
        <button class="training-cue-button" type="button" data-training-warmup="${index}">动作要点</button>
      </div>`;
    }).join("");
    warmupList.hidden = false;
  }

  function renderExercises() {
    const plan = currentPlan();
    exerciseList.innerHTML = plan.exercises.map((exercise, index) => `
      <article class="training-exercise-card">
        <div class="training-exercise-body">
          <div class="training-exercise-icon">${icons[exercise.icon] || icons.warmup}</div>
          <div class="training-exercise-copy"><div class="training-exercise-name-line"><h3>${exercise.name}</h3><span class="training-group-chip">${exercise.group}</span></div></div>
          <div class="training-exercise-spec"><strong>${exercise.sets} 组</strong><span>${exercise.reps}</span><small>休息 ${exercise.rest} 秒</small></div>
          <div class="training-exercise-action"><button class="training-cue-button" type="button" data-training-exercise="${index}">动作要点</button></div>
        </div>
      </article>
    `).join("");
  }

  function renderDetail() {
    const program = currentProgram();
    $("#trainingPlanTitle").textContent = program.title;
    renderDays();
    renderWarmups();
    renderExercises();
  }

  function openCue(type, index) {
    const plan = currentPlan();
    const item = type === "warmup" ? plan.warmups[index] : plan.exercises[index];
    $("#trainingCueTag").textContent = type === "warmup" ? "热身" : item.group;
    $("#trainingCueTitle").textContent = item.name;
    $("#trainingCueText").textContent = item.cue;
    if (type === "warmup") {
      $("#trainingCueSets").textContent = "1 组";
      $("#trainingCueReps").textContent = item.dose.split("·")[0].trim();
      $("#trainingCueRest").textContent = "无需计时";
    } else {
      $("#trainingCueSets").textContent = `${item.sets} 组`;
      $("#trainingCueReps").textContent = item.reps;
      $("#trainingCueRest").textContent = `${item.rest} 秒`;
    }
    cueDialog.showModal();
  }

  function updateNavigation(module) {
    $$('[data-module-target]').forEach((button) => {
      const active = button.dataset.moduleTarget === module;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-current", active ? "page" : "false");
    });
    $$('.module-nav, .module-bottom-nav').forEach((nav) => { nav.dataset.active = module; });
  }

  function showHabits() {
    document.body.dataset.module = "habits";
    habitModule.hidden = false;
    trainingModule.hidden = true;
    state.wasDetail = false;
    updateNavigation("habits");
    document.title = "习惯打卡 · 月历";
    window.scrollTo(0, 0);
  }

  function showTrainingLibrary() {
    document.body.dataset.module = "training";
    habitModule.hidden = true;
    trainingModule.hidden = false;
    trainingLibraryView.hidden = false;
    trainingPlanView.hidden = true;
    state.wasDetail = false;
    updateNavigation("training");
    document.title = "健身计划 · 习惯打卡";
    window.scrollTo(0, 0);
  }

  function showTrainingDetail(programId) {
    const nextProgram = programs[programId];
    if (!nextProgram) return showTrainingLibrary();
    const changedProgram = state.programId !== programId;
    state.programId = programId;
    if (changedProgram || !state.wasDetail) state.dayIndex = 0;
    document.body.dataset.module = "training";
    habitModule.hidden = true;
    trainingModule.hidden = false;
    trainingLibraryView.hidden = true;
    trainingPlanView.hidden = false;
    state.wasDetail = true;
    updateNavigation("training");
    renderDetail();
    document.title = `${nextProgram.title} · 训练计划`;
    window.scrollTo(0, 0);
  }

  function route() {
    const hash = location.hash;
    const match = hash.match(/^#training\/([^/]+)$/);
    if (match && programs[match[1]]) showTrainingDetail(match[1]);
    else if (hash.startsWith("#training")) showTrainingLibrary();
    else showHabits();
  }

  $$('[data-module-target]').forEach((button) => {
    button.addEventListener("click", () => {
      location.hash = button.dataset.moduleTarget === "training" ? "#training" : "#habits";
    });
  });

  trainingGrid.addEventListener("click", (event) => {
    const placeholder = event.target.closest("[data-training-placeholder]");
    if (placeholder) notify("该训练计划内容将在后续补充。");
  });

  $("#trainingBackButton").addEventListener("click", () => { location.hash = "#training"; });
  dayList.addEventListener("click", (event) => {
    const button = event.target.closest("[data-training-day]");
    if (!button) return;
    const nextIndex = Number(button.dataset.trainingDay);
    if (nextIndex === state.dayIndex) return;
    state.dayIndex = nextIndex;
    renderDetail();
    notify(`已切换到 ${currentPlan().name}。`);
  });

  warmupList.addEventListener("click", (event) => {
    const button = event.target.closest("[data-training-warmup]");
    if (button) openCue("warmup", Number(button.dataset.trainingWarmup));
  });
  exerciseList.addEventListener("click", (event) => {
    const button = event.target.closest("[data-training-exercise]");
    if (button) openCue("exercise", Number(button.dataset.trainingExercise));
  });
  $("#trainingCueClose").addEventListener("click", () => cueDialog.close());
  cueDialog.addEventListener("click", (event) => {
    if (event.target === cueDialog) cueDialog.close();
  });

  renderLibrary();
  window.addEventListener("hashchange", route);
  route();
})();






