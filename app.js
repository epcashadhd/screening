const dassBands = {
  depression: [[0, 9, "正常", "Normal"], [10, 13, "輕度", "Mild"], [14, 20, "中度", "Moderate"], [21, 27, "嚴重", "Severe"], [28, 42, "極嚴重", "Extremely Severe"]],
  anxiety: [[0, 7, "正常", "Normal"], [8, 9, "輕度", "Mild"], [10, 14, "中度", "Moderate"], [15, 19, "嚴重", "Severe"], [20, 42, "極嚴重", "Extremely Severe"]],
  stress: [[0, 14, "正常", "Normal"], [15, 18, "輕度", "Mild"], [19, 25, "中度", "Moderate"], [26, 33, "嚴重", "Severe"], [34, 42, "極嚴重", "Extremely Severe"]]
};

lockViewportZoom();

const questionnaires = {
  "phq9": {
    id: "phq9",
    title: "PHQ-9",
    timeframe: { zh: "過去兩個星期", en: "Over the last 2 weeks" },
    instructions: {
      zh: "在過去兩個星期，你有多經常受以下問題困擾？",
      en: "Over the last 2 weeks, how often have you been bothered by any of the following problems?"
    },
    responseOptions: [
      { value: 0, label: { zh: "完全沒有", en: "Not at all" } },
      { value: 1, label: { zh: "幾天", en: "Several days" } },
      { value: 2, label: { zh: "一半以上", en: "More than half the days" } },
      { value: 3, label: { zh: "近乎每天", en: "Nearly every day" } }
    ],
    items: [
      ["做任何事都覺得沉悶或者根本不想做任何事", "Little interest or pleasure in doing things"],
      ["情緒低落、抑鬱或絕望", "Feeling down, depressed, or hopeless"],
      ["難於入睡；半夜會醒或相反地睡覺時間過多", "Trouble falling or staying asleep, or sleeping too much"],
      ["覺得疲倦或活力不足", "Feeling tired or having little energy"],
      ["胃口極差或進食過量", "Poor appetite or overeating"],
      ["不喜歡自己 - 覺得自己做得不好、對自己失望或有負家人期望", "Feeling bad about yourself, or that you are a failure or have let yourself or your family down"],
      ["難於集中精神做事，例如看報紙或看電視", "Trouble concentrating on things, such as reading the newspaper or watching television"],
      ["其他人反映你行動或說話遲緩；或者相反地，你比平常活動更多 - 坐立不安、停不下來", "Moving or speaking so slowly that other people could have noticed; or the opposite, being so fidgety or restless that you have been moving around a lot more than usual"],
      ["想到自己最好去死或者自殘", "Thoughts that you would be better off dead, or of hurting yourself"]
    ].map(([zh, en], index) => ({
      id: `phq9_${index + 1}`,
      number: index + 1,
      text: { zh, en },
      riskFlag: index === 8
    })),
    scoring: {
      type: "single",
      label: { zh: "PHQ-9 總分", en: "PHQ-9 Total Score" },
      bands: [
        { label: { zh: "正常 / 最低程度", en: "Minimal depression" }, min: 0, max: 4 },
        { label: { zh: "輕度", en: "Mild depression" }, min: 5, max: 9 },
        { label: { zh: "中度", en: "Moderate depression" }, min: 10, max: 14 },
        { label: { zh: "中度嚴重", en: "Moderately severe depression" }, min: 15, max: 19 },
        { label: { zh: "嚴重", en: "Severe depression" }, min: 20, max: 27 }
      ]
    },
    reportNote: {
      zh: "PHQ-9 結果只作抑鬱症狀篩查及嚴重程度參考，不能單獨作為臨床診斷。",
      en: "PHQ-9 results are for screening and severity reference only and should not be used as a standalone clinical diagnosis."
    }
  },
  "dass-y": {
    id: "dass-y",
    title: "DASS-Y",
    timeframe: { zh: "過去一星期", en: "The past week" },
    instructions: {
      zh: "我們想了解你在過去一星期的感受。下面有些句子，請在其右方最能真確地表示你在過去一星期狀況的數字圈出來。答案沒有對與錯。",
      en: "We would like to find out how you have been feeling in the past week. Please select the number that best shows how true each sentence was of you. There are no right or wrong answers."
    },
    responseOptions: [
      { value: 0, label: { zh: "不真確", en: "Not true" } },
      { value: 1, label: { zh: "有少少真確", en: "A little true" } },
      { value: 2, label: { zh: "頗為真確", en: "Fairly true" } },
      { value: 3, label: { zh: "十分真確", en: "Very true" } }
    ],
    items: [
      ["stress", "我為小事而煩惱", "I got upset about little things"],
      ["anxiety", "我感到頭暈眼花，就好像我快要暈倒", "I felt dizzy, like I was about to faint"],
      ["depression", "我對任何事都不感到興趣", "I did not enjoy anything"],
      ["anxiety", "我有呼吸困難（例如呼吸急促），即使我不是正在做運動及沒有生病", "I had trouble breathing (e.g. fast breathing), even though I wasn't exercising and I was not sick."],
      ["depression", "我討厭自己的生活", "I hated my life"],
      ["stress", "我覺得自己對事情反應過大", "I found myself over-reacting to situations"],
      ["anxiety", "我感到手震", "My hands felt shaky"],
      ["stress", "我對很多事情感到有壓力", "I was stressing about lots of things"],
      ["anxiety", "我感到恐懼", "I felt terrified"],
      ["depression", "沒有什麼好事情是我可以期待的", "There was nothing nice I could look forward to"],
      ["stress", "我很容易煩燥不安", "I was easily irritated"],
      ["stress", "我覺得很難放鬆下來", "I found it difficult to relax"],
      ["depression", "我無法停止感到傷心難過", "I could not stop feeling sad"],
      ["stress", "當別人打擾我時，我很生氣", "I got annoyed when people interrupted me"],
      ["anxiety", "我感到自己快要恐慌了", "I felt like I was about to panic"],
      ["depression", "我討厭自己", "I hated myself"],
      ["depression", "我覺得自己一無是處", "I felt like I was no good"],
      ["stress", "我很容易生氣", "I was easily annoyed"],
      ["anxiety", "我能感覺到我的心跳得非常快，即使我沒有做任何劇烈運動", "I could feel my heart beating really fast, even though I hadn't done any hard exercise"],
      ["anxiety", "我無緣無故感到害怕", "I felt scared for no good reason"],
      ["depression", "我覺得生活很痛苦", "I felt that life was terrible"]
    ].map(makeDassItem("dass_y")),
    scales: makeDassScales(),
    scoring: { type: "multi", multiplier: 2 },
    reportNote: {
      zh: "DASS-Y 結果只作抑鬱、焦慮及壓力症狀篩查及嚴重程度參考，不能單獨作為臨床診斷。",
      en: "DASS-Y results are for screening and severity reference only and should not be used as a standalone clinical diagnosis."
    }
  },
  "dass-21": {
    id: "dass-21",
    title: "DASS-21",
    timeframe: { zh: "過去一星期", en: "The past week" },
    instructions: {
      zh: "請小心閱讀以下每一個句子，並在其右方圈上一數字，表示「過往一個星期」如何適用於你。答案並無對錯之分。請不要花太多時間在某一句子上。",
      en: "Please read each statement and select a number which indicates how much the statement applied to you over the past week. There are no right or wrong answers."
    },
    responseOptions: [
      { value: 0, label: { zh: "不適用", en: "Did not apply" } },
      { value: 1, label: { zh: "頗適用 / 間中適用", en: "Some degree / some of the time" } },
      { value: 2, label: { zh: "很適用 / 經常適用", en: "Considerable degree / good part of time" } },
      { value: 3, label: { zh: "最適用 / 常常適用", en: "Very much / most of the time" } }
    ],
    items: [
      ["stress", "我覺得很難讓自己安靜下來", "I found it hard to wind down"],
      ["anxiety", "我感到口乾", "I was aware of dryness of my mouth"],
      ["depression", "我好像不能再有任何愉快、舒暢的感覺", "I couldn't seem to experience any positive feeling at all"],
      ["anxiety", "我感到呼吸困難（例如不是做運動時也感到氣促或透不過氣來）", "I experienced breathing difficulty (e.g. excessively rapid breathing, breathlessness in the absence of physical exertion)"],
      ["depression", "我感到很難自動去開始工作", "I found it difficult to work up the initiative to do things"],
      ["stress", "我對事情往往作出過敏反應", "I tended to over-react to situations"],
      ["anxiety", "我感到顫抖（例如手震）", "I experienced trembling (e.g. in the hands)"],
      ["stress", "我覺得自己消耗很多精神", "I felt that I was using a lot of nervous energy"],
      ["anxiety", "我憂慮一些令自己恐慌或出醜的場合", "I was worried about situations in which I might panic and make a fool of myself"],
      ["depression", "我覺得自己對將來沒有甚麼可盼望", "I felt that I had nothing to look forward to"],
      ["stress", "我感到忐忑不安", "I found myself getting agitated"],
      ["stress", "我感到很難放鬆自己", "I found it difficult to relax"],
      ["depression", "我感到憂鬱沮喪", "I felt down-hearted and blue"],
      ["stress", "我無法容忍任何阻礙我繼續工作的事情", "I was intolerant of anything that kept me from getting on with what I was doing"],
      ["anxiety", "我感到快要恐慌了", "I felt I was close to panic"],
      ["depression", "我對任何事也不能熱衷", "I was unable to become enthusiastic about anything"],
      ["depression", "我覺得自己不怎麼配做人", "I felt I wasn't worth much as a person"],
      ["stress", "我發覺自己很容易被觸怒", "I felt that I was rather touchy"],
      ["anxiety", "我察覺自己在沒有明顯的體力勞動時，也感到心律不正常", "I was aware of the action of my heart in the absence of physical exertion"],
      ["anxiety", "我無緣無故地感到害怕", "I felt scared without any good reason"],
      ["depression", "我感到生命毫無意義", "I felt that life was meaningless"]
    ].map(makeDassItem("dass_21")),
    scales: makeDassScales(),
    scoring: { type: "multi", multiplier: 2 },
    reportNote: {
      zh: "DASS-21 結果只作抑鬱、焦慮及壓力症狀篩查及嚴重程度參考，不能單獨作為臨床診斷。",
      en: "DASS-21 results are for screening and severity reference only and should not be used as a standalone clinical diagnosis."
    }
  }
};

function makeDassItem(prefix) {
  return ([scale, zh, en], index) => ({
    id: `${prefix}_${index + 1}`,
    number: index + 1,
    scale,
    text: { zh, en }
  });
}

function makeDassScales() {
  return {
    depression: { label: { zh: "抑鬱分數", en: "Depression Score" }, bands: dassBands.depression },
    anxiety: { label: { zh: "焦慮分數", en: "Anxiety Score" }, bands: dassBands.anxiety },
    stress: { label: { zh: "壓力分數", en: "Stress Score" }, bands: dassBands.stress }
  };
}

const state = {
  selected: "phq9",
  language: "zh",
  answers: {},
  showMissing: false,
  password: ""
};

const pages = {
  setup: document.querySelector("#setupPage"),
  client: document.querySelector("#clientPage"),
  unlock: document.querySelector("#unlockPage"),
  result: document.querySelector("#resultPage")
};

const form = document.querySelector("#questionnaireForm");
const pageStatus = document.querySelector("#pageStatus");
const selectedTitle = document.querySelector("#selectedTitle");
const selectedInstructions = document.querySelector("#selectedInstructions");
const optionLegend = document.querySelector("#optionLegend");
const completionStatus = document.querySelector("#completionStatus");
const resultSummary = document.querySelector("#resultSummary");
const riskNotice = document.querySelector("#riskNotice");
const rubricSummary = document.querySelector("#rubricSummary");
const printReport = document.querySelector("#printReport");

populateDobSelectors();
document.querySelector("#assessmentDate").valueAsDate = new Date();
updateAgeDisplay();

document.querySelectorAll(".segment").forEach((button) => {
  button.addEventListener("click", () => {
    state.selected = button.dataset.questionnaire;
    state.answers = {};
    document.querySelectorAll(".segment").forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
  });
});

document.querySelectorAll(".language-segment").forEach((button) => {
  button.addEventListener("click", () => {
    state.language = button.dataset.language;
    document.querySelectorAll(".language-segment").forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
  });
});

document.querySelector("#startButton").addEventListener("click", startQuestionnaire);
document.querySelector("#submitButton").addEventListener("click", submitQuestionnaire);
document.querySelector("#unlockButton").addEventListener("click", unlockResults);
document.querySelector("#backToClientButton").addEventListener("click", () => showPage("client"));
document.querySelector("#newAssessmentButton").addEventListener("click", resetAll);
document.querySelector("#printButton").addEventListener("click", () => {
  buildPrintReport();
  window.print();
});

["clientName", "dobYear", "dobMonth", "dobDay", "clientSchool", "assessmentDate", "clientNotes", "reportNotes"].forEach((id) => {
  const handleFieldUpdate = () => {
    if (id === "dobYear" || id === "dobMonth") updateDobDays();
    if (id === "dobYear" || id === "dobMonth" || id === "dobDay" || id === "assessmentDate") updateAgeDisplay();
    buildPrintReport();
  };

  document.querySelector(`#${id}`).addEventListener("input", handleFieldUpdate);
  document.querySelector(`#${id}`).addEventListener("change", handleFieldUpdate);
});

function startQuestionnaire() {
  const password = document.querySelector("#resultPassword").value;
  const confirmPassword = document.querySelector("#confirmPassword").value;

  if (!password || password.length < 4) {
    showError("setupError", "請先設定至少 4 個字元的結果密碼。");
    return;
  }

  if (password !== confirmPassword) {
    showError("setupError", "兩次輸入的密碼不一致，請重新確認。");
    return;
  }

  hideError("setupError");
  state.password = password;
  state.answers = {};
  state.showMissing = false;
  renderQuestionnaire();
  showPage("client");
}

function submitQuestionnaire() {
  const questionnaire = currentQuestionnaire();
  const answered = Object.keys(state.answers).length;

  if (answered < questionnaire.items.length) {
    state.showMissing = true;
    markMissingQuestions();
    showError("clientError", `尚有 ${questionnaire.items.length - answered} 題未完成。請先完成所有題目。`);
    return;
  }

  state.showMissing = false;
  markMissingQuestions();
  hideError("clientError");
  document.querySelector("#unlockPassword").value = "";
  showPage("unlock");
}

function unlockResults() {
  const input = document.querySelector("#unlockPassword").value;

  if (input !== state.password) {
    showError("unlockError", "密碼不正確，請再試一次。");
    return;
  }

  hideError("unlockError");
  renderResults();
  buildPrintReport();
  showPage("result");
}

function renderQuestionnaire() {
  const questionnaire = currentQuestionnaire();
  selectedTitle.textContent = questionnaire.title;
  selectedInstructions.innerHTML = formatText(questionnaire.instructions);
  optionLegend.innerHTML = questionnaire.responseOptions.map((option) => `
    <div class="legend-item">
      <strong>${option.value}</strong>
      <span>${formatText(option.label)}</span>
    </div>
  `).join("");

  form.innerHTML = questionnaire.items.map((item) => {
    const options = questionnaire.responseOptions.map((option) => {
      const checked = state.answers[item.id] === option.value;
      return `
        <label class="option ${checked ? "selected" : ""}" aria-label="第 ${item.number} 題選擇 ${option.value} 分">
          <input type="radio" name="${item.id}" value="${option.value}" ${checked ? "checked" : ""} />
          ${option.value}
        </label>
      `;
    }).join("");

    return `
      <div class="question-row" data-item-id="${item.id}">
        <p class="question-text"><span class="question-number">${item.number}.</span> ${formatText(item.text)}</p>
        <div class="options">${options}</div>
      </div>
    `;
  }).join("");

  form.querySelectorAll("input[type='radio']").forEach((input) => {
    input.addEventListener("change", () => {
      state.answers[input.name] = Number(input.value);
      updateSelectedOption(input);
      markMissingQuestions();
      if (state.showMissing && Object.keys(state.answers).length === currentQuestionnaire().items.length) hideError("clientError");
      updateCompletion();
      buildPrintReport();
    });
  });

  updateCompletion();
  buildPrintReport();
}

function updateSelectedOption(input) {
  form.querySelectorAll(`input[name="${input.name}"]`).forEach((radio) => {
    radio.closest(".option").classList.toggle("selected", radio.checked);
  });
}

function markMissingQuestions() {
  const questionnaire = currentQuestionnaire();
  questionnaire.items.forEach((item) => {
    const row = form.querySelector(`[data-item-id="${item.id}"]`);
    if (!row) return;
    row.classList.toggle("missing-question", state.showMissing && state.answers[item.id] === undefined);
  });
}

function renderResults() {
  const questionnaire = currentQuestionnaire();
  const result = calculateResult(questionnaire);

  resultSummary.innerHTML = result.scores.map((score) => `
    <div class="score-card">
      <p>${score.label}</p>
      <strong>${score.value}</strong>
      <span class="severity">${score.severity}：${score.rangeText}</span>
    </div>
  `).join("");

  rubricSummary.innerHTML = buildRubricHtml(questionnaire);

  if (result.riskMessage) {
    riskNotice.textContent = result.riskMessage;
    riskNotice.classList.remove("hidden");
  } else {
    riskNotice.classList.add("hidden");
  }
}

function calculateResult(questionnaire) {
  if (questionnaire.scoring.type === "single") {
    const total = questionnaire.items.reduce((sum, item) => sum + state.answers[item.id], 0);
    const band = questionnaire.scoring.bands.find((item) => total >= item.min && total <= item.max);
    const riskItem = questionnaire.items.find((item) => item.riskFlag);
    const riskMessage = riskItem && state.answers[riskItem.id] > 0
      ? "第 9 題分數高於 0，需按機構或學校的風險評估及危機處理程序跟進。"
      : "";

    return {
      scores: [{
        label: formatText(questionnaire.scoring.label),
        value: total,
        severity: formatText(band.label),
        rangeText: formatRange(band)
      }],
      riskMessage
    };
  }

  const totals = { depression: 0, anxiety: 0, stress: 0 };
  questionnaire.items.forEach((item) => {
    totals[item.scale] += state.answers[item.id];
  });

  return {
    scores: Object.entries(questionnaire.scales).map(([key, scale]) => {
      const finalScore = totals[key] * questionnaire.scoring.multiplier;
      const band = scale.bands.find(([min, max]) => finalScore >= min && finalScore <= max);
      return {
        label: formatText(scale.label),
        value: finalScore,
        severity: formatSeverity(band),
        rangeText: formatBandRange(band)
      };
    }),
    riskMessage: ""
  };
}

function buildRubricHtml(questionnaire) {
  if (questionnaire.scoring.type === "single") {
    return `
      <table>
        <tr><th>程度</th><th>分數範圍</th></tr>
        ${questionnaire.scoring.bands.map((band) => `<tr><td>${formatText(band.label)}</td><td>${formatRange(band)}</td></tr>`).join("")}
      </table>
    `;
  }

  return `
    <table>
      <tr><th>程度</th><th>抑鬱 Depression</th><th>焦慮 Anxiety</th><th>壓力 Stress</th></tr>
      ${questionnaire.scales.depression.bands.map((depressionBand, index) => {
        const anxietyBand = questionnaire.scales.anxiety.bands[index];
        const stressBand = questionnaire.scales.stress.bands[index];
        return `<tr><td>${formatSeverity(depressionBand)}</td><td>${formatBandRange(depressionBand)}</td><td>${formatBandRange(anxietyBand)}</td><td>${formatBandRange(stressBand)}</td></tr>`;
      }).join("")}
    </table>
  `;
}

function buildPrintReport() {
  const questionnaire = currentQuestionnaire();
  const answered = Object.keys(state.answers).length;
  const complete = answered === questionnaire.items.length;
  const result = complete ? calculateResult(questionnaire) : null;
  const field = (id) => document.querySelector(`#${id}`).value.trim() || "未填寫";

  const scoreRows = result
    ? result.scores.map((score) => `<tr><td>${score.label}</td><td>${score.value}</td><td>${score.severity}</td></tr>`).join("")
    : `<tr><td colspan="3">尚未完成所有題目</td></tr>`;

  const answerRows = questionnaire.items.map((item) => {
    const value = state.answers[item.id];
    const label = value === undefined
      ? "未作答"
      : formatText(questionnaire.responseOptions.find((option) => option.value === value).label);
    return `<tr><td>${item.number}</td><td>${formatText(item.text)}</td><td>${value === undefined ? "-" : value}</td><td>${label}</td></tr>`;
  }).join("");

  printReport.innerHTML = `
    <h1>心理篩查結果摘要</h1>
    <h2>個案資料</h2>
    <table>
      <tr><th>個案姓名 / 編號</th><td>${escapeHtml(field("clientName"))}</td></tr>
      <tr><th>出生日期</th><td>${escapeHtml(getDobDisplay() || "未填寫")}</td></tr>
      <tr><th>年齡</th><td>${escapeHtml(calculateAge() || "未填寫")}</td></tr>
      <tr><th>學校 / 機構</th><td>${escapeHtml(field("clientSchool"))}</td></tr>
      <tr><th>評估日期</th><td>${escapeHtml(field("assessmentDate"))}</td></tr>
    </table>

    <h2>問卷資料</h2>
    <table>
      <tr><th>問卷</th><td>${questionnaire.title}</td></tr>
      <tr><th>顯示語言</th><td>${languageLabel()}</td></tr>
    </table>

    <h2>分數摘要</h2>
    <table>
      <tr><th>項目</th><th>分數</th><th>程度</th></tr>
      ${scoreRows}
    </table>
    ${result && result.riskMessage ? `<div class="alert">${result.riskMessage}</div>` : ""}

    <h2>評分準則</h2>
    ${buildRubricHtml(questionnaire)}

    <h2>作答紀錄</h2>
    <table>
      <tr><th>題號</th><th>題目</th><th>分數</th><th>答案</th></tr>
      ${answerRows}
    </table>

    <h2>備註</h2>
    <p>${escapeHtml(field("clientNotes"))}</p>
    <p>${escapeHtml(field("reportNotes"))}</p>

    <h2>說明</h2>
    <p>${formatText(questionnaire.reportNote)} 結果需結合臨床訪談、背景資料及專業判斷理解。</p>
  `;
}

function showPage(pageName) {
  Object.values(pages).forEach((page) => page.classList.remove("active"));
  pages[pageName].classList.add("active");
  pageStatus.textContent = {
    setup: "設定問卷",
    client: "填寫問卷",
    unlock: "等待解鎖",
    result: "結果摘要"
  }[pageName];
  if (typeof window !== "undefined" && typeof window.scrollTo === "function") {
    window.scrollTo(0, 0);
  }
}

function updateCompletion() {
  const questionnaire = currentQuestionnaire();
  completionStatus.textContent = `${Object.keys(state.answers).length}/${questionnaire.items.length} 已完成`;
}

function resetAll() {
  state.answers = {};
  state.password = "";
  document.querySelector("#resultPassword").value = "";
  document.querySelector("#confirmPassword").value = "";
  document.querySelector("#unlockPassword").value = "";
  showPage("setup");
}

function currentQuestionnaire() {
  return questionnaires[state.selected];
}

function updateAgeDisplay() {
  document.querySelector("#clientAgeText").textContent = calculateAge() || "未填寫";
}

function populateDobSelectors() {
  const yearSelect = document.querySelector("#dobYear");
  const monthSelect = document.querySelector("#dobMonth");
  const currentYear = new Date().getFullYear();

  yearSelect.innerHTML = `<option value="">年</option>` + Array.from({ length: 121 }, (_, index) => {
    const year = currentYear - index;
    return `<option value="${year}">${year}年</option>`;
  }).join("");

  monthSelect.innerHTML = `<option value="">月</option>` + Array.from({ length: 12 }, (_, index) => {
    const month = index + 1;
    return `<option value="${month}">${month}月</option>`;
  }).join("");

  updateDobDays();
}

function updateDobDays() {
  const daySelect = document.querySelector("#dobDay");
  const selectedDay = Number(daySelect.value);
  const year = Number(document.querySelector("#dobYear").value) || 2000;
  const month = Number(document.querySelector("#dobMonth").value) || 1;
  const daysInMonth = new Date(year, month, 0).getDate();

  daySelect.innerHTML = `<option value="">日</option>` + Array.from({ length: daysInMonth }, (_, index) => {
    const day = index + 1;
    return `<option value="${day}">${day}日</option>`;
  }).join("");

  if (selectedDay && selectedDay <= daysInMonth) {
    daySelect.value = String(selectedDay);
  }
}

function calculateAge() {
  const dobParts = getDobParts();
  if (!dobParts) return "";

  const dob = new Date(dobParts.year, dobParts.month - 1, dobParts.day);
  const assessmentValue = document.querySelector("#assessmentDate").value;
  const referenceDate = assessmentValue ? new Date(`${assessmentValue}T00:00:00`) : new Date();

  let age = referenceDate.getFullYear() - dob.getFullYear();
  const hasNotHadBirthday =
    referenceDate.getMonth() < dob.getMonth() ||
    (referenceDate.getMonth() === dob.getMonth() && referenceDate.getDate() < dob.getDate());

  if (hasNotHadBirthday) age -= 1;
  return Number.isFinite(age) && age >= 0 ? `${age}` : "";
}

function getDobParts() {
  const year = Number(document.querySelector("#dobYear").value);
  const month = Number(document.querySelector("#dobMonth").value);
  const day = Number(document.querySelector("#dobDay").value);
  if (!year || !month || !day) return null;
  return { year, month, day };
}

function getDobDisplay() {
  const dobParts = getDobParts();
  if (!dobParts) return "";
  return `${dobParts.year}年${dobParts.month}月${dobParts.day}日`;
}

function formatText(value) {
  if (typeof value === "string") return escapeHtml(value);
  if (state.language === "bilingual") {
    return `${escapeHtml(value.zh)}<br><span class="english-line">${escapeHtml(value.en)}</span>`;
  }
  return escapeHtml(value[state.language]);
}

function formatSeverity(band) {
  if (state.language === "en") return band[3];
  if (state.language === "bilingual") return `${band[2]} / ${band[3]}`;
  return band[2];
}

function languageLabel() {
  return {
    zh: "中文",
    en: "English",
    bilingual: "雙語"
  }[state.language];
}

function formatRange(band) {
  return `${band.min}-${band.max}`;
}

function formatBandRange(band) {
  return band[1] === 42 ? `${band[0]}+` : `${band[0]}-${band[1]}`;
}

function showError(id, message) {
  const element = document.querySelector(`#${id}`);
  element.textContent = message;
  element.classList.remove("hidden");
}

function hideError(id) {
  const element = document.querySelector(`#${id}`);
  element.textContent = "";
  element.classList.add("hidden");
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

buildPrintReport();

function lockViewportZoom() {
  document.addEventListener("gesturestart", preventZoomGesture, { passive: false });
  document.addEventListener("gesturechange", preventZoomGesture, { passive: false });
  document.addEventListener("gestureend", preventZoomGesture, { passive: false });

  document.addEventListener("touchmove", (event) => {
    if (event.touches && event.touches.length > 1) {
      event.preventDefault();
    }
  }, { passive: false });

  let lastTouchEnd = 0;
  document.addEventListener("touchend", (event) => {
    const now = Date.now();
    if (now - lastTouchEnd <= 300) {
      event.preventDefault();
    }
    lastTouchEnd = now;
  }, { passive: false });
}

function preventZoomGesture(event) {
  event.preventDefault();
}
