const steps = [
  { id: "framing", title: "Decision framing" },
  { id: "options", title: "Option architecture" },
  { id: "values", title: "Values and criteria" },
  { id: "evidence", title: "Quick signal check" },
  { id: "constraints", title: "Constraints and context" },
  { id: "consequences", title: "Consequence modeling" },
  { id: "bias", title: "Bias and quality check" },
  { id: "report", title: "Decision report" },
];

const criteriaLibrary = [
  { id: "self-direction-thought", label: "Independent thinking", category: "openness" },
  { id: "self-direction-action", label: "Freedom of action", category: "openness" },
  { id: "stimulation", label: "Novelty and change", category: "openness" },
  { id: "hedonism", label: "Pleasure and enjoyment", category: "openness" },
  { id: "achievement", label: "Achievement", category: "self-enhancement" },
  { id: "power-dominance", label: "Influence over people", category: "self-enhancement" },
  { id: "power-resources", label: "Control of resources", category: "self-enhancement" },
  { id: "face", label: "Dignity and public image", category: "self-enhancement" },
  { id: "security-personal", label: "Personal safety", category: "conservation" },
  { id: "security-societal", label: "Stability and order", category: "conservation" },
  { id: "tradition", label: "Tradition", category: "conservation" },
  { id: "conformity-rules", label: "Following rules and obligations", category: "conservation" },
  { id: "conformity-interpersonal", label: "Avoiding harm to others", category: "conservation" },
  { id: "humility", label: "Humility", category: "conservation" },
  { id: "benevolence-caring", label: "Caring for close others", category: "self-transcendence" },
  { id: "benevolence-dependability", label: "Showing your true self", category: "relational extension" },
  { id: "universalism-concern", label: "Justice and equality", category: "self-transcendence" },
  { id: "respect-extension", label: "Respect", category: "relational extension" },
  { id: "universalism-tolerance", label: "Not having to tone yourself down", category: "relational extension" },
  { id: "love-extension", label: "Love", category: "relational extension" },
  { id: "health-extension", label: "Health and wellbeing", category: "practical extension" },
];

const defaultEvidencePrompts = [
  {
    id: "default-path",
    title: "Default path",
    prompt: "When you imagine staying on the current or default path, your first reaction is:",
    choices: [
      { value: "steady", label: "Steady or relieving", tone: 2 },
      { value: "mixed", label: "Mixed or uncertain", tone: 0 },
      { value: "heavy", label: "Heavy or resistant", tone: -1 },
      { value: "dread", label: "Dread, tension, or shutdown", tone: -2 },
    ],
  },
  {
    id: "change-path",
    title: "Change path",
    prompt: "When you imagine making a meaningful change, your first reaction is:",
    choices: [
      { value: "clear", label: "Clear or quietly right", tone: 2 },
      { value: "possible", label: "Possible, but uncomfortable", tone: 1 },
      { value: "foggy", label: "Foggy or confusing", tone: -1 },
      { value: "impossible", label: "Impossible, terrifying, or paralyzing", tone: -2 },
    ],
  },
  {
    id: "threatened",
    title: "Threat check",
    prompt: "How true is this right now: I feel threatened, unsafe, or seriously destabilized in this situation.",
    choices: [
      { value: "not-true", label: "Not true", tone: 1 },
      { value: "slightly", label: "Slightly true", tone: 0 },
      { value: "often", label: "Often true", tone: -1 },
      { value: "strongly", label: "Strongly true", tone: -2 },
    ],
  },
  {
    id: "escalation",
    title: "Escalation check",
    prompt: "How likely does it feel that the problem will escalate if nothing changes?",
    choices: [
      { value: "unlikely", label: "Unlikely", tone: 1 },
      { value: "possible", label: "Possible", tone: 0 },
      { value: "likely", label: "Likely", tone: -1 },
      { value: "very-likely", label: "Very likely", tone: -2 },
    ],
  },
  {
    id: "support-system",
    title: "Support system",
    prompt: "If you had to act on this decision, how much support do you realistically have?",
    choices: [
      { value: "strong", label: "Strong support", tone: 2 },
      { value: "some", label: "Some support", tone: 1 },
      { value: "limited", label: "Very limited support", tone: -1 },
      { value: "none", label: "Almost no support", tone: -2 },
    ],
  },
  {
    id: "facts",
    title: "Facts check",
    prompt: "How clear are the facts behind this decision?",
    choices: [
      { value: "clear", label: "Mostly clear", tone: 2 },
      { value: "partial", label: "Partly clear, partly uncertain", tone: 0 },
      { value: "foggy", label: "Quite foggy", tone: -1 },
      { value: "unknown", label: "I know less than I want to admit", tone: -2 },
    ],
  },
  {
    id: "avoidance",
    title: "Avoidance check",
    prompt: "Which feels closest right now?",
    choices: [
      { value: "facing", label: "I am facing the tradeoffs directly", tone: 1 },
      { value: "partial", label: "I am facing some of it, but not all", tone: 0 },
      { value: "delay", label: "I may be avoiding a hard truth", tone: -1 },
      { value: "relief", label: "I mostly want relief, not clarity", tone: -2 },
    ],
  },
  {
    id: "energy-cost",
    title: "Energy cost",
    prompt: "How much daily energy is this situation currently costing you?",
    choices: [
      { value: "low", label: "Very little", tone: 2 },
      { value: "some", label: "Some, but manageable", tone: 0 },
      { value: "high", label: "A lot", tone: -1 },
      { value: "extreme", label: "An overwhelming amount", tone: -2 },
    ],
  },
  {
    id: "future-self",
    title: "Future self",
    prompt: "Which feels closer to the truth: if I do nothing, my future self will probably...",
    choices: [
      { value: "thankful", label: "Be thankful I stayed patient", tone: 2 },
      { value: "unsure", label: "Feel mixed", tone: 0 },
      { value: "regret", label: "Regret not acting sooner", tone: -1 },
      { value: "deep-regret", label: "Strongly regret staying passive", tone: -2 },
    ],
  },
  {
    id: "agency",
    title: "Agency",
    prompt: "How much power do you feel you actually have to influence the situation?",
    choices: [
      { value: "high", label: "A lot", tone: 2 },
      { value: "some", label: "Some", tone: 0 },
      { value: "low", label: "Very little", tone: -1 },
      { value: "none", label: "Almost none", tone: -2 },
    ],
  },
  {
    id: "repeat-pattern",
    title: "Repeat pattern",
    prompt: "Does this feel like a one-time problem or a repeated pattern?",
    choices: [
      { value: "one-time", label: "Mostly one-time", tone: 2 },
      { value: "unclear", label: "I am not sure", tone: 0 },
      { value: "repeated", label: "A repeated pattern", tone: -1 },
      { value: "chronic", label: "A chronic pattern", tone: -2 },
    ],
  },
  {
    id: "outside-pressure",
    title: "Outside pressure",
    prompt: "How much is outside pressure shaping this decision?",
    choices: [
      { value: "little", label: "Very little", tone: 1 },
      { value: "some", label: "Some", tone: 0 },
      { value: "strong", label: "A lot", tone: -1 },
      { value: "dominant", label: "It feels dominant", tone: -2 },
    ],
  },
  {
    id: "best-self",
    title: "Best self",
    prompt: "Which path feels more likely to let you become more like your best self?",
    choices: [
      { value: "default", label: "Staying on the default path", tone: 1 },
      { value: "unclear", label: "I cannot tell yet", tone: 0 },
      { value: "change", label: "Making the change", tone: 1 },
      { value: "neither", label: "Right now, neither path feels good", tone: -1 },
    ],
  },
  {
    id: "support-if-change",
    title: "Support for change",
    prompt: "If you made the change, how supported would you realistically be?",
    choices: [
      { value: "well-supported", label: "Well supported", tone: 2 },
      { value: "partly-supported", label: "Partly supported", tone: 0 },
      { value: "barely-supported", label: "Barely supported", tone: -1 },
      { value: "unsupported", label: "Almost unsupported", tone: -2 },
    ],
  },
  {
    id: "recovery",
    title: "Recovery",
    prompt: "When something difficult happens in this situation, how quickly do things usually recover?",
    choices: [
      { value: "quick", label: "Fairly quickly", tone: 2 },
      { value: "slow", label: "Slowly", tone: 0 },
      { value: "barely", label: "Barely", tone: -1 },
      { value: "never", label: "It does not really recover", tone: -2 },
    ],
  },
];

let externalEvidencePrompts = null;

function getEvidencePrompts() {
  const prompts = [...(externalEvidencePrompts || defaultEvidencePrompts)];
  const selectedValues = state.values
    .filter((criterion) => criterion.selected)
    .sort((a, b) => tierWeight(b.tier) - tierWeight(a.tier));

  if (!selectedValues.length) return prompts;

  const topValue = selectedValues[0]?.label || "your most important value";
  const secondValue = selectedValues[1]?.label || "what matters most to you";
  const defaultPathText =
    state.options[0]?.description?.trim() ||
    state.framing.defaultPath?.trim() ||
    "continuing on the default path";
  const changePathText =
    state.options[1]?.description?.trim() ||
    "making the change";
  const postponeText =
    state.options[2]?.description?.trim() ||
    "postponing and gathering more data";

  prompts.push(
    {
      id: "value-default",
      title: "Value check: default path",
      prompt: `When you imagine ${defaultPathText}, how aligned does that feel with your need for ${topValue}?`,
      choices: [
        { value: "very-aligned", label: "Very aligned", tone: 2 },
        { value: "partly-aligned", label: "Partly aligned", tone: 1 },
        { value: "weakly-aligned", label: "Weakly aligned", tone: -1 },
        { value: "not-aligned", label: "Not aligned at all", tone: -2 },
      ],
    },
    {
      id: "value-change",
      title: "Value check: change path",
      prompt: `When you imagine ${changePathText}, how aligned does that feel with your need for ${topValue}?`,
      choices: [
        { value: "very-aligned", label: "Very aligned", tone: 2 },
        { value: "partly-aligned", label: "Partly aligned", tone: 1 },
        { value: "weakly-aligned", label: "Weakly aligned", tone: -1 },
        { value: "not-aligned", label: "Not aligned at all", tone: -2 },
      ],
    },
    {
      id: "value-postpone",
      title: "Value check: postpone path",
      prompt: `If you choose ${postponeText}, does that protect or postpone your need for ${secondValue}?`,
      choices: [
        { value: "protects", label: "It protects it for now", tone: 1 },
        { value: "mixed", label: "It is mixed", tone: 0 },
        { value: "delays", label: "It mostly delays it", tone: -1 },
        { value: "undermines", label: "It undermines it", tone: -2 },
      ],
    },
    {
      id: "default-why",
      title: "Default path motive",
      prompt: `If you continue with ${defaultPathText}, what feels like the main reason?`,
      choices: [
        { value: "true-fit", label: "It truly fits what matters to me", tone: 2 },
        { value: "mixed", label: "A mix of fit and convenience", tone: 0 },
        { value: "disruption", label: "Mainly to avoid disruption", tone: -1 },
        { value: "fear", label: "Mostly because of fear or pressure", tone: -2 },
      ],
    },
    {
      id: "change-tradeoff",
      title: "Change path tradeoff",
      prompt: `If you choose ${changePathText}, what feels most true?`,
      choices: [
        { value: "hard-right", label: "Hard, but closer to what matters", tone: 2 },
        { value: "unclear", label: "The tradeoff is still unclear", tone: 0 },
        { value: "too-costly", label: "It may cost more than it gives", tone: -1 },
        { value: "escape", label: "It may be more escape than direction", tone: -2 },
      ],
    },
    {
      id: "postpone-honesty",
      title: "Postpone honesty check",
      prompt: `If you choose ${postponeText}, are you likely to gain real information or mostly delay discomfort?`,
      choices: [
        { value: "real-data", label: "Gain real information", tone: 2 },
        { value: "some-data", label: "Some information, some delay", tone: 0 },
        { value: "mostly-delay", label: "Mostly delay", tone: -1 },
        { value: "avoidance", label: "Mainly avoidance", tone: -2 },
      ],
    },
  );

  return prompts;
}

const constraintLibrary = [
  { id: "money", label: "Financial dependence", weight: 2 },
  { id: "housing", label: "Shared housing or location lock-in", weight: 2 },
  { id: "children", label: "Children or dependents involved", weight: 3 },
  { id: "work", label: "Shared work, business, or team dependencies", weight: 2 },
  { id: "contract", label: "Contractual or legal timing pressure", weight: 2 },
  { id: "health", label: "Health or caregiving responsibilities", weight: 2 },
  { id: "support", label: "Very limited external support", weight: 1 },
  { id: "safety", label: "Safety concerns or high vulnerability", weight: 3 },
];

function createInitialState() {
  return {
    currentStep: 0,
    evidenceIndex: 0,
    valueStage: "select",
    showReadiness: false,
    framing: {
      statement: "",
      whyNow: "",
      deadline: "",
      urgency: "medium",
      defaultPath: "",
    },
    options: [
      { id: "option-a", label: "Continue on the default path", description: "", type: "commit" },
      { id: "option-b", label: "Make the change", description: "", type: "exit" },
      { id: "option-c", label: "Postpone and gather more data", description: "", type: "delay" },
    ],
    values: criteriaLibrary.map((criterion) => ({
      ...criterion,
      selected: false,
      tier: "important",
    })),
    evidence: {},
    constraints: {},
    consequences: {},
    bias: {
      timelinePressure: "",
      triggerEvent: "",
      clarityState: "",
      outsideVoices: "",
      safeToRemain: "",
      escalation: "",
    },
  };
}

let state = createInitialState();

const stepList = document.getElementById("step-list");
const stepKicker = document.getElementById("step-kicker");
const stepTitle = document.getElementById("step-title");
const stepCount = document.getElementById("step-count");
const stepContent = document.getElementById("step-content");
const backButton = document.getElementById("back-button");
const nextButton = document.getElementById("next-button");
const feedbackButton = document.getElementById("feedback-button");
const feedbackDialog = document.getElementById("feedback-dialog");
const feedbackForm = document.getElementById("feedback-form");
const feedbackMessage = document.getElementById("feedback-message");
const feedbackError = document.getElementById("feedback-error");

const feedbackEmail = document.querySelector('meta[name="feedback-email"]')?.content.trim();
const trackedSteps = new Set();
const pendingAnalytics = [];

function sendAnalyticsEvent(event) {
  if (!window.goatcounter?.count) return false;
  window.goatcounter.count(event);
  return true;
}

function flushAnalytics() {
  while (pendingAnalytics.length && sendAnalyticsEvent(pendingAnalytics[0])) {
    pendingAnalytics.shift();
  }
}

function track(eventName, properties = {}) {
  if (navigator.doNotTrack === "1") return;

  const isPageview = eventName === "app_opened";
  const stepNumber = String(properties.number || "").padStart(2, "0");
  const event = isPageview
    ? { path: location.pathname, title: document.title }
    : {
        path: eventName === "step_viewed"
          ? `step-${stepNumber}-${properties.step}`
          : eventName.replaceAll("_", "-"),
        title: eventName === "step_viewed"
          ? `Step ${properties.number}: ${properties.step}`
          : eventName.replaceAll("_", " "),
        event: true,
      };

  if (!sendAnalyticsEvent(event)) pendingAnalytics.push(event);
}

document.getElementById("goatcounter-script")?.addEventListener("load", flushAnalytics);

function trackStep() {
  const step = steps[state.currentStep];
  if (trackedSteps.has(step.id)) return;
  trackedSteps.add(step.id);
  track("step_viewed", { step: step.id, number: state.currentStep + 1 });
}

function renderStepList() {
  stepList.innerHTML = "";
  steps.forEach((step, index) => {
    const li = document.createElement("li");
    li.textContent = `${index + 1}. ${step.title}`;
    li.addEventListener("click", () => {
      state.currentStep = index;
      state.showReadiness = false;
      render();
    });
    if (index === state.currentStep) {
      li.classList.add("active");
    } else if (index < state.currentStep) {
      li.classList.add("completed");
    }
    stepList.appendChild(li);
  });
}

function render() {
  const step = steps[state.currentStep];
  stepKicker.textContent = `Step ${state.currentStep + 1}`;
  stepTitle.textContent = step.title;
  stepCount.textContent = `${state.currentStep + 1} / ${steps.length}`;
  renderStepList();
  backButton.disabled = state.currentStep === 0;
  nextButton.textContent = state.currentStep === steps.length - 1 ? "Start over" : "Next";

  if (step.id === "framing") renderFraming();
  if (step.id === "options") renderOptions();
  if (step.id === "values") renderValues();
  if (step.id === "evidence") renderEvidence();
  if (step.id === "constraints") renderConstraints();
  if (step.id === "consequences") renderConsequences();
  if (step.id === "bias") renderBias();
  if (step.id === "report") renderReport();
  trackStep();
}

function getAnsweredEvidenceCount() {
  return getEvidencePrompts().filter((prompt) => state.evidence[prompt.id]).length;
}

function getScoredOptionCount() {
  return state.options.filter((option) => {
    const consequence = normalizedConsequence(option.id);
    return ["friction", "valuesFit", "upside", "risk", "reversibility"]
      .filter((metric) => numericMetric(consequence[metric], null) !== null)
      .length >= 3;
  }).length;
}

function getReportReadinessIssues() {
  const issues = [];
  if (!state.framing.statement.trim()) issues.push("Add a clear decision statement.");
  if (state.values.filter((item) => item.selected).length < 2) issues.push("Select at least two values or criteria.");
  if (getAnsweredEvidenceCount() < 4) issues.push("Answer at least four signal-check questions.");
  if (getScoredOptionCount() < 2) issues.push("Score at least two options on three or more dimensions.");
  return issues;
}

function renderReadinessNotice() {
  const issues = getReportReadinessIssues();
  if (!issues.length) return "";
  return `
    <div class="report-section readiness-card">
      <p class="section-kicker">Before the report</p>
      <h3>Tighten these inputs first</h3>
      <p>The report will be more useful after the core pieces are filled in.</p>
      <ul class="report-list">
        ${issues.map((issue) => `<li>${escapeHtml(issue)}</li>`).join("")}
      </ul>
    </div>
  `;
}

function renderFraming() {
  stepContent.innerHTML = `
    <div class="form-block spacious">
      <h3>Start with the actual decision</h3>
      <p class="helper">Phrase the decision as a real choice. This keeps the analysis focused and prevents the tool from drifting into general reflection.</p>
      <div class="field-grid single">
        <div class="field">
          <label for="decision-statement">Decision statement</label>
          <textarea id="decision-statement" placeholder="Example: Should I stay in this situation, leave it, or create a defined pause while I reassess?">${escapeHtml(state.framing.statement)}</textarea>
        </div>
      </div>
      <div class="field-grid">
        <div class="field">
          <label for="decision-why">Why does this need attention now?</label>
          <textarea id="decision-why" placeholder="What changed, what deadline is approaching, or what pattern is no longer sustainable?">${escapeHtml(state.framing.whyNow)}</textarea>
        </div>
        <div class="field">
          <label for="decision-default">If you do nothing, what path happens by default?</label>
          <textarea id="decision-default" placeholder="Example: I effectively stay in the current arrangement and renew the lease.">${escapeHtml(state.framing.defaultPath)}</textarea>
        </div>
      </div>
      <div class="field-grid">
        <div class="field">
          <label for="decision-deadline">Deadline or decision window</label>
          <input id="decision-deadline" type="text" placeholder="Example: Within 6 weeks" value="${escapeHtml(state.framing.deadline)}" />
        </div>
        <div class="field">
          <label for="decision-urgency">Urgency level</label>
          <select id="decision-urgency">
            ${renderSelectOptions(
              [
                ["low", "Low: more open-ended"],
                ["medium", "Medium: some time pressure"],
                ["high", "High: concrete deadline or strong pressure"],
              ],
              state.framing.urgency,
            )}
          </select>
        </div>
      </div>
    </div>
  `;

  bindFraming();
}

function renderOptions() {
  stepContent.innerHTML = `
    <div class="form-block">
      <h3>Compare the three core paths</h3>
      <p class="helper">This generic free tool keeps the option structure simple. The user writes what each of the three paths would actually mean in their case.</p>
      <div class="option-grid rows">
        ${state.options.map((option, index) => renderOptionCard(option, index)).join("")}
      </div>
    </div>
  `;
  bindOptions();
}

function renderOptionCard(option, index) {
  return `
    <div class="option-card row">
      <div class="field">
        <div class="option-title">${escapeHtml(option.label)}</div>
      </div>
      <div class="field">
        <label for="option-description-${index}">What does this mean in your case?</label>
        <textarea id="option-description-${index}" data-index="${index}" data-key="description" placeholder="Describe what this path would actually look like for you.">${escapeHtml(option.description)}</textarea>
      </div>
    </div>
  `;
}

function renderValues() {
  const selectedValues = state.values.filter((criterion) => criterion.selected);
  stepContent.innerHTML = `
    <div class="form-block">
      <h3>Define what matters before you compare outcomes</h3>
      <p class="helper">This step now works in two passes. First the user marks the values that truly matter. Then those values are sorted by importance.</p>
      <div class="criterion-stages">
        <button class="toggle-button ${state.valueStage === "select" ? "active" : ""}" data-value-stage="select" type="button">1. Select values</button>
        <button class="toggle-button ${state.valueStage === "rank" ? "active" : ""}" data-value-stage="rank" type="button">2. Sort by importance</button>
      </div>
      ${
        state.valueStage === "select"
          ? `
            <div class="form-block">
              <p class="helper">Tick every value that genuinely clicks. The user does not need to prioritize yet, just recognize what matters.</p>
              <div class="criterion-picker">
                ${state.values.map(renderCriterionCheck).join("")}
              </div>
            </div>
          `
          : `
            <div class="form-block">
              <p class="helper">Now sort the selected values into tiers. Non-negotiables are what the decision cannot violate without real cost to the user.</p>
              ${
                selectedValues.length
                  ? `<div class="criterion-grid">${selectedValues.map(renderCriterionCard).join("")}</div>`
                  : `<p class="empty-state">No values selected yet. Go back to the first pass and tick the ones that matter.</p>`
              }
            </div>
          `
      }
    </div>
  `;
  bindValues();
}

function renderCriterionCheck(criterion) {
  return `
    <label class="criterion-check ${criterion.selected ? "selected" : ""}">
      <input type="checkbox" data-action="select-criterion" data-criterion="${criterion.id}" ${criterion.selected ? "checked" : ""} />
      <span>
        <strong>${criterion.label}</strong>
        <span class="helper">${capitalize(criterion.category)}</span>
      </span>
    </label>
  `;
}

function renderCriterionCard(criterion) {
  return `
    <div class="criterion-card ${criterion.selected ? "selected" : ""}" data-criterion="${criterion.id}">
      <div class="card-header">
        <div>
          <h4>${criterion.label}</h4>
          <p>${capitalize(criterion.category)}</p>
        </div>
      </div>
      <div class="inline-selects">
        <select data-action="tier" data-criterion="${criterion.id}">
          ${renderSelectOptions(
            [
              ["non-negotiable", "Non-negotiable"],
              ["important", "Important"],
              ["nice-to-have", "Nice to have"],
            ],
            criterion.tier,
          )}
        </select>
      </div>
    </div>
  `;
}

function renderEvidence() {
  const prompts = getEvidencePrompts();
  if (state.evidenceIndex >= prompts.length) {
    state.evidenceIndex = prompts.length - 1;
  }
  const prompt = prompts[state.evidenceIndex];
  stepContent.innerHTML = `
    <div class="form-block">
      <h3>Quick signal check</h3>
      <p class="helper">These signal questions help separate emotional intensity from decision-relevant evidence.</p>
      <div class="signal-grid single-card">
        ${renderEvidencePrompt(prompt, state.evidenceIndex)}
      </div>
    </div>
  `;
  bindEvidence();
}

function renderEvidencePrompt(prompt, index) {
  const prompts = getEvidencePrompts();
  const current = state.evidence[prompt.id];
  return `
    <div class="signal-card">
      <div class="prompt-progress">
        <div>
          <p class="section-kicker">Question</p>
          <h4>${prompt.title}</h4>
        </div>
        <div class="mini-dots">
          ${prompts
            .map((item, dotIndex) => {
              let status = "";
              if (dotIndex === state.evidenceIndex) status = "active";
              if (state.evidence[item.id] && dotIndex !== state.evidenceIndex) status = "done";
              return `<span class="mini-dot ${status}"></span>`;
            })
            .join("")}
        </div>
      </div>
      <div class="card-header">
        <div>
          <p>${prompt.prompt}</p>
        </div>
      </div>
      <div class="stack">
        ${prompt.choices
          .map(
            (choice) => `
            <button class="choice-button ${current === choice.value ? "active" : ""}" data-prompt="${prompt.id}" data-choice="${choice.value}" type="button">
              ${choice.label}
            </button>
          `,
          )
          .join("")}
      </div>
      <div class="toggle-row">
        <button class="secondary-button" data-evidence-nav="back" type="button">Previous question</button>
        <button class="secondary-button" data-evidence-nav="next" type="button">Next question</button>
      </div>
    </div>
  `;
}

function renderConstraints() {
  stepContent.innerHTML = `
    <div class="form-block">
      <h3>Add the practical realities</h3>
      <p class="helper">Constraints do not decide the answer, but they shape transition cost, timing, and feasibility. Instead of a simple on/off toggle, rate how hard each obstacle would be to handle.</p>
      <div class="constraint-grid">
        ${constraintLibrary.map(renderConstraintCard).join("")}
      </div>
    </div>
  `;
  bindConstraints();
}

function renderConstraintCard(constraint) {
  const current = state.constraints[constraint.id] || "";
  return `
    <div class="constraint-card ${current ? "selected" : ""}">
      <div class="card-header">
        <div>
          <h4>${constraint.label}</h4>
        </div>
      </div>
      <div class="field">
        <label for="constraint-${constraint.id}">Difficulty to handle</label>
        <select id="constraint-${constraint.id}" data-constraint-select="${constraint.id}">
          ${renderSelectOptions(
            [
              ["", "Not marked"],
              ["a", "A. Not an issue"],
              ["b", "B. Easily solved issue"],
              ["c", "C. It will create waves, but manageable"],
              ["d", "D. Hard obstacle to get over"],
              ["e", "E. Feels impossible to solve right now"],
            ],
            current,
          )}
        </select>
      </div>
    </div>
  `;
}

function renderConsequences() {
  stepContent.innerHTML = `
    <div class="form-block">
      <h3>Score each option</h3>
      <p class="helper">Score each option on a few clear dimensions. The app then compares least resistance, safety, long-term upside, and values fit.</p>
      ${state.options.map((option, index) => renderConsequenceCard(option, index)).join("")}
    </div>
  `;
  bindConsequences();
}

function renderConsequenceCard(option, index) {
  const optionName = optionDisplayName(option, index);
  const value = state.consequences[option.id] || {
    short: "",
    medium: "",
    long: "",
    friction: "",
    valuesFit: "",
    upside: "",
    risk: "",
    reversibility: "",
  };
  return `
    <div class="report-section">
      <p class="section-kicker">Option ${index + 1}</p>
      <h3>${escapeHtml(optionName)}</h3>
      <div class="field-grid">
        <div class="field">
          <label for="consequence-friction-${index}">Short-term friction</label>
          <select id="consequence-friction-${index}" data-option="${option.id}" data-metric="friction">
            ${renderSelectOptions(metricScale("friction"), value.friction)}
          </select>
        </div>
        <div class="field">
          <label for="consequence-valuesFit-${index}">Fit with your values</label>
          <select id="consequence-valuesFit-${index}" data-option="${option.id}" data-metric="valuesFit">
            ${renderSelectOptions(metricScale("valuesFit"), value.valuesFit)}
          </select>
        </div>
      </div>
      <div class="field-grid">
        <div class="field">
          <label for="consequence-upside-${index}">Long-term upside</label>
          <select id="consequence-upside-${index}" data-option="${option.id}" data-metric="upside">
            ${renderSelectOptions(metricScale("upside"), value.upside)}
          </select>
        </div>
        <div class="field">
          <label for="consequence-risk-${index}">Risk / uncertainty</label>
          <select id="consequence-risk-${index}" data-option="${option.id}" data-metric="risk">
            ${renderSelectOptions(metricScale("risk"), value.risk)}
          </select>
        </div>
      </div>
      <div class="field-grid single">
        <div class="field">
          <label for="consequence-reversibility-${index}">Reversibility</label>
          <select id="consequence-reversibility-${index}" data-option="${option.id}" data-metric="reversibility">
            ${renderSelectOptions(metricScale("reversibility"), value.reversibility)}
          </select>
        </div>
      </div>
      <div class="field-grid">
        <div class="field">
          <label for="consequence-short-${index}">Near term</label>
          <textarea id="consequence-short-${index}" data-option="${option.id}" data-horizon="short" placeholder="What is likely to happen soon after choosing this path?">${escapeHtml(value.short)}</textarea>
        </div>
        <div class="field">
          <label for="consequence-medium-${index}">Decision window</label>
          <textarea id="consequence-medium-${index}" data-option="${option.id}" data-horizon="medium" placeholder="What is likely around the deadline or decision window you named?">${escapeHtml(value.medium)}</textarea>
        </div>
      </div>
      <div class="field-grid single">
        <div class="field">
          <label for="consequence-long-${index}">Long term</label>
          <textarea id="consequence-long-${index}" data-option="${option.id}" data-horizon="long" placeholder="What is the likely long-term outcome or tradeoff?">${escapeHtml(value.long)}</textarea>
        </div>
      </div>
    </div>
  `;
}

function renderBias() {
  stepContent.innerHTML = `
    <div class="form-block">
      <h3>Check the quality of the thinking process</h3>
      <p class="helper">This step checks whether pressure, fear, urgency, or other people's voices may be distorting the analysis.</p>
      <div class="field-grid">
        <div class="field ${state.bias.timelinePressure ? "selected" : ""}">
          <label for="bias-pressure">How pressured does the timing feel?</label>
          <select id="bias-pressure">
            ${renderSelectOptions(
              [
                ["", "Choose one"],
                ["steady", "I have enough time to think"],
                ["tight", "It feels tight, but still manageable"],
                ["urgent", "I feel pushed to decide quickly"],
                ["reactive", "I feel like I must decide right now"],
              ],
              state.bias.timelinePressure,
            )}
          </select>
        </div>
        <div class="field ${state.bias.triggerEvent ? "selected" : ""}">
          <label for="bias-trigger">What best describes the timing of this decision?</label>
          <select id="bias-trigger">
            ${renderSelectOptions(
              [
                ["", "Choose one"],
                ["slow-build", "This comes from a long pattern"],
                ["recent-event", "This follows a recent event or shock"],
                ["deadline", "This is mainly driven by an outside deadline"],
                ["mixed", "It is both a pattern and a recent trigger"],
              ],
              state.bias.triggerEvent,
            )}
          </select>
        </div>
      </div>
      <div class="field-grid">
        <div class="field ${state.bias.clarityState ? "selected" : ""}">
          <label for="bias-clarity">Right now, which feels most true?</label>
          <select id="bias-clarity">
            ${renderSelectOptions(
              [
                ["", "Choose one"],
                ["clear", "I have been thinking about this for a while"],
                ["foggy", "I feel emotionally foggy or overwhelmed"],
                ["split", "Part of me feels clear, part of me keeps doubting"],
                ["numb", "I feel numb, shut down, or detached"],
              ],
              state.bias.clarityState,
            )}
          </select>
        </div>
        <div class="field ${state.bias.outsideVoices ? "selected" : ""}">
          <label for="bias-voices">Whose voice is loudest in this decision?</label>
          <select id="bias-voices">
            ${renderSelectOptions(
              [
                ["", "Choose one"],
                ["mine", "Mostly my own judgment"],
                ["shared", "A mix of my own voice and others"],
                ["others", "Other people’s expectations feel very loud"],
                ["fear", "Fear feels louder than anyone else"],
              ],
              state.bias.outsideVoices,
            )}
          </select>
        </div>
      </div>
      <div class="field-grid">
        <div class="field ${state.bias.safeToRemain ? "selected" : ""}">
          <label for="bias-safety">Do you feel safe to remain in the situation?</label>
          <select id="bias-safety">
            ${renderSelectOptions(
              [
                ["", "Choose one"],
                ["yes", "Yes, I feel basically safe"],
                ["mostly", "Mostly safe, but not fully settled"],
                ["unsure", "I am not sure"],
                ["no", "No, I do not feel safe staying"],
              ],
              state.bias.safeToRemain || "",
            )}
          </select>
        </div>
        <div class="field ${state.bias.escalation ? "selected" : ""}">
          <label for="bias-escalation">Does the pattern feel stable, improving, or escalating?</label>
          <select id="bias-escalation">
            ${renderSelectOptions(
              [
                ["", "Choose one"],
                ["stable", "It feels mostly stable"],
                ["improving", "It seems to be improving"],
                ["mixed", "It changes back and forth"],
                ["escalating", "It feels like it is escalating"],
              ],
              state.bias.escalation || "",
            )}
          </select>
        </div>
      </div>
      ${state.showReadiness ? renderReadinessNotice() : ""}
    </div>
  `;
  bindBias();
}

function renderReport() {
  const report = generateReport();
  stepContent.innerHTML = `
    <div class="report-card">
      <div class="report-section">
        <p class="section-kicker">Decision</p>
        <h3>${escapeHtml(report.title)}</h3>
        <p class="report-intro">${escapeHtml(report.intro)}</p>
      </div>

      <div class="report-section">
        <p class="section-kicker">What your answers suggest</p>
        <p>${escapeHtml(report.summary)}</p>
        <ul class="report-list">
          ${report.optionNames.map((name) => `<li>${escapeHtml(name)}</li>`).join("")}
        </ul>
      </div>

      <div class="report-section">
        <p class="section-kicker">Current strongest path</p>
        <h3>${escapeHtml(report.recommendation.title)}</h3>
        <p>${escapeHtml(report.recommendation.body)}</p>
      </div>

      <div class="report-section">
        <p class="section-kicker">Option snapshot</p>
        <div class="score-grid">
          ${report.optionSummaries.map(renderOptionSummary).join("")}
        </div>
      </div>

      <div class="report-section">
        <p class="section-kicker">Watch-outs</p>
        <ul class="report-list">
          ${report.watchouts.map((note) => `<li>${escapeHtml(note)}</li>`).join("")}
        </ul>
      </div>

    </div>
  `;
}

function renderOptionSummary(summary) {
  return `
    <div class="score-card">
      <h3>${escapeHtml(summary.label)}</h3>
      <div class="score-line"><span class="badge ${summary.fitBadge.kind}">${summary.fitBadge.label}</span></div>
      <ul class="plain-list">
        <li><strong>Values alignment:</strong> ${escapeHtml(summary.valuesLabel)}</li>
        <li><strong>Long-term gain:</strong> ${escapeHtml(summary.upsideLabel)}</li>
        <li><strong>Short-term friction:</strong> ${escapeHtml(summary.frictionLabel)}</li>
        <li><strong>Near term:</strong> ${escapeHtml(summary.short)}</li>
        <li><strong>Decision window:</strong> ${escapeHtml(summary.medium)}</li>
        <li><strong>Long term:</strong> ${escapeHtml(summary.long)}</li>
      </ul>
    </div>
  `;
}

function bindFraming() {
  document.getElementById("decision-statement").addEventListener("input", (event) => {
    state.framing.statement = event.target.value;
  });
  document.getElementById("decision-why").addEventListener("input", (event) => {
    state.framing.whyNow = event.target.value;
  });
  document.getElementById("decision-default").addEventListener("input", (event) => {
    state.framing.defaultPath = event.target.value;
  });
  document.getElementById("decision-deadline").addEventListener("input", (event) => {
    state.framing.deadline = event.target.value;
  });
  document.getElementById("decision-urgency").addEventListener("change", (event) => {
    state.framing.urgency = event.target.value;
  });
}

function bindOptions() {
  stepContent.querySelectorAll("input[data-index], textarea[data-index], select[data-index]").forEach((element) => {
    element.addEventListener("input", handleOptionInput);
    element.addEventListener("change", handleOptionInput);
  });
}

function handleOptionInput(event) {
  const index = Number(event.target.dataset.index);
  const key = event.target.dataset.key;
  state.options[index][key] = event.target.value;
}

function bindValues() {
  stepContent.querySelectorAll("[data-value-stage]").forEach((button) => {
    button.addEventListener("click", () => {
      state.valueStage = button.dataset.valueStage;
      render();
    });
  });

  stepContent.querySelectorAll("[data-action='select-criterion']").forEach((input) => {
    input.addEventListener("change", (event) => {
      const criterion = state.values.find((item) => item.id === event.target.dataset.criterion);
      criterion.selected = event.target.checked;
      render();
    });
  });

  stepContent.querySelectorAll("select[data-action='tier']").forEach((select) => {
    select.addEventListener("change", (event) => {
      const criterion = state.values.find((item) => item.id === event.target.dataset.criterion);
      criterion.tier = event.target.value;
    });
  });
}

function bindEvidence() {
  const prompts = getEvidencePrompts();
  stepContent.querySelectorAll(".choice-button").forEach((button) => {
    button.addEventListener("click", () => {
      state.evidence[button.dataset.prompt] = button.dataset.choice;
      if (state.evidenceIndex < prompts.length - 1) {
        state.evidenceIndex += 1;
      }
      render();
    });
  });

  stepContent.querySelectorAll("[data-evidence-nav]").forEach((button) => {
    button.addEventListener("click", () => {
      if (button.dataset.evidenceNav === "back" && state.evidenceIndex > 0) {
        state.evidenceIndex -= 1;
      }
      if (button.dataset.evidenceNav === "next" && state.evidenceIndex < prompts.length - 1) {
        state.evidenceIndex += 1;
      }
      render();
    });
  });
}

function bindConstraints() {
  stepContent.querySelectorAll("[data-constraint-select]").forEach((select) => {
    select.addEventListener("change", (event) => {
      const key = event.target.dataset.constraintSelect;
      state.constraints[key] = event.target.value;
      render();
    });
  });
}

function bindConsequences() {
  stepContent.querySelectorAll("textarea[data-option]").forEach((textarea) => {
    textarea.addEventListener("input", (event) => {
      const optionId = event.target.dataset.option;
      const horizon = event.target.dataset.horizon;
      ensureConsequence(optionId);
      state.consequences[optionId][horizon] = event.target.value;
    });
  });

  stepContent.querySelectorAll("select[data-option][data-metric]").forEach((select) => {
    select.addEventListener("change", (event) => {
      const optionId = event.target.dataset.option;
      const metric = event.target.dataset.metric;
      ensureConsequence(optionId);
      state.consequences[optionId][metric] = event.target.value;
    });
  });
}

function bindBias() {
  document.getElementById("bias-pressure").addEventListener("change", (event) => {
    state.bias.timelinePressure = event.target.value;
    render();
  });
  document.getElementById("bias-trigger").addEventListener("change", (event) => {
    state.bias.triggerEvent = event.target.value;
    render();
  });
  document.getElementById("bias-clarity").addEventListener("change", (event) => {
    state.bias.clarityState = event.target.value;
    render();
  });
  document.getElementById("bias-voices").addEventListener("change", (event) => {
    state.bias.outsideVoices = event.target.value;
    render();
  });
  document.getElementById("bias-safety").addEventListener("change", (event) => {
    state.bias.safeToRemain = event.target.value;
    render();
  });
  document.getElementById("bias-escalation").addEventListener("change", (event) => {
    state.bias.escalation = event.target.value;
    render();
  });
}

function generateReport() {
  const selectedCriteria = state.values.filter((criterion) => criterion.selected);
  const priorityCriteria = [...selectedCriteria]
    .sort((a, b) => tierWeight(b.tier) - tierWeight(a.tier))
    .slice(0, 5)
    .map((criterion) => criterion.label);

  const prompts = getEvidencePrompts();
  const evidenceScore = prompts.reduce((total, prompt) => {
    const choice = prompt.choices.find((item) => item.value === state.evidence[prompt.id]);
    return total + (choice ? choice.tone : 0);
  }, 0);

  const activeConstraints = constraintLibrary
    .filter((constraint) => state.constraints[constraint.id])
    .map((constraint) => ({
      ...constraint,
      level: state.constraints[constraint.id],
      pressure: constraint.weight * constraintLevelWeight(state.constraints[constraint.id]),
    }));
  const constraintPressure = activeConstraints.reduce((total, item) => total + item.pressure, 0);
  const optionSummaries = state.options.map((option, index) => {
    const consequence = normalizedConsequence(option.id);
    const metricValues = {
      friction: numericMetric(consequence.friction, null),
      valuesFit: numericMetric(consequence.valuesFit, null),
      upside: numericMetric(consequence.upside, null),
      risk: numericMetric(consequence.risk, null),
      reversibility: numericMetric(consequence.reversibility, null),
    };
    const completedMetrics = Object.values(metricValues).filter((value) => value !== null).length;
    const hasMinimumScoring = completedMetrics >= 3;
    const friction = metricValues.friction ?? 3;
    const valuesFit = metricValues.valuesFit ?? 3;
    const upside = metricValues.upside ?? 3;
    const risk = metricValues.risk ?? 3;
    const reversibility = metricValues.reversibility ?? 3;

    const leastResistance = Math.max(0, 6 - friction) * 1.5 - constraintPressure * 0.4;
    const saferPath = Math.max(0, 6 - risk) * 1.4 + reversibility * 0.8 - constraintPressure * 0.3;
    const longTermGain = upside * 1.7 + valuesFit * 1.1 - risk * 0.4;
    const overallScoreRaw = leastResistance * 1.2 + saferPath * 1.2 + longTermGain * 1.4 + (evidenceScore + 4);
    const score = Math.max(10, Math.min(100, Math.round(overallScoreRaw * 2)));

    let fitBadge = { label: "Needs more scoring", kind: "" };
    if (hasMinimumScoring) fitBadge = { label: "Balanced tradeoff", kind: "" };
    if (hasMinimumScoring && score >= 70) fitBadge = { label: "Stronger fit", kind: "success" };
    if (hasMinimumScoring && score <= 45) fitBadge = { label: "Higher friction", kind: "warning" };

    return {
      label: optionDisplayName(option, index),
      score,
      hasMinimumScoring,
      completedMetrics,
      fitBadge,
      optionType: option.type,
      leastResistance,
      saferPath,
      longTermGain,
      valuesFit,
      risk,
      reversibility,
      frictionLabel: metricLabel("friction", friction),
      upsideLabel: metricLabel("upside", upside),
      valuesLabel: metricLabel("valuesFit", valuesFit),
      riskLabel: metricLabel("risk", risk),
      reversibilityLabel: metricLabel("reversibility", reversibility),
      short: consequence.short || "No short-term outcome entered yet.",
      medium: consequence.medium || "No medium-term outcome entered yet.",
      long: consequence.long || "No long-term outcome entered yet.",
    };
  });

  const scoredOptions = optionSummaries.filter((option) => option.hasMinimumScoring);
  scoredOptions.sort((a, b) => b.score - a.score);
  const displayOptions = [...optionSummaries].sort((a, b) => {
    if (a.hasMinimumScoring && b.hasMinimumScoring) return b.score - a.score;
    if (a.hasMinimumScoring) return -1;
    if (b.hasMinimumScoring) return 1;
    return 0;
  });

  const watchouts = [];
  if (scoredOptions.length < 2) {
    watchouts.push("You need to score at least two options on a few key dimensions before the comparison becomes meaningful.");
  }
  if (evidenceScore <= -3) {
    watchouts.push("Your signal answers lean toward strain, caution, or avoidance.");
  } else if (evidenceScore >= 3) {
    watchouts.push("Your signal answers lean toward steadiness or workable alignment.");
  }
  if (constraintPressure >= 5) {
    watchouts.push("Practical entanglements are likely to make change harder in the short term.");
  }
  if (state.bias.safeToRemain === "no" || state.bias.escalation === "escalating") {
    watchouts.push("Safety or escalation concerns deserve extra weight in how you interpret the options.");
  }
  const changeOption = optionSummaries[1];
  const defaultOption = optionSummaries[0];
  if (
    changeOption?.hasMinimumScoring &&
    changeOption.valuesFit >= 4 &&
    changeOption.longTermGain >= 5 &&
    (state.evidence["postpone-honesty"] === "mostly-delay" || state.evidence["postpone-honesty"] === "avoidance" || state.evidence["default-why"] === "fear")
  ) {
    watchouts.push("You may be leaning away from change even though your own answers suggest you see strong value in it.");
  }
  if (
    changeOption?.hasMinimumScoring &&
    changeOption.valuesFit >= 4 &&
    changeOption.longTermGain >= 4 &&
    changeOption.risk <= 3
  ) {
    watchouts.push("Your answers suggest you may already see action as the stronger direction, even if it still feels costly.");
  }
  if (activeConstraints.length) {
    watchouts.push(`Practical constraints marked: ${activeConstraints.map((item) => `${item.label.toLowerCase()} (${constraintLevelLabel(item.level).toLowerCase()})`).join(", ")}.`);
  }

  const intro = state.framing.statement
    ? `Decision: "${state.framing.statement}". The tool compares the options using values alignment, long-term gain, short-term friction, signal checks, and practical constraints.`
    : "The tool compares the options using values alignment, long-term gain, short-term friction, signal checks, and practical constraints.";

  const summary = buildConclusion(scoredOptions, priorityCriteria, evidenceScore, constraintPressure);
  const recommendation = buildRecommendation(scoredOptions);

  return {
    title: state.framing.statement || "Decision report",
    intro,
    summary,
    recommendation,
    optionNames: state.options.map((option, index) => optionDisplayName(option, index)),
    optionSummaries: displayOptions,
    watchouts,
  };
}

function buildRecommendation(scoredOptions) {
  if (scoredOptions.length < 2) {
    return {
      title: "Not enough signal yet",
      body: "Score at least two paths before treating the report as a comparison. Until then, use this as an analysis draft.",
    };
  }

  const [top, runnerUp] = scoredOptions;
  const lead = top.score - runnerUp.score;
  if (lead < 8) {
    return {
      title: `${top.label} is slightly ahead`,
      body: `The difference is narrow, so treat this as a close tradeoff rather than a clear answer. Compare what would need to change for ${runnerUp.label} to become the better path.`,
    };
  }

  return {
    title: `${top.label} currently has the strongest support`,
    body: "Based on your values, risk, friction, reversibility, and signal checks, this path has the clearest overall support right now. Use the watch-outs below before acting on it.",
  };
}

function buildConclusion(optionSummaries, priorityCriteria, evidenceScore, constraintPressure) {
  const criteriaText = priorityCriteria.length
    ? `Your current priorities center on ${priorityCriteria.slice(0, 3).join(", ")}.`
    : "Your priority criteria have not been fully defined yet.";

  if (optionSummaries.length < 2) {
    return `${criteriaText} Score at least two options on values alignment, long-term gain, and short-term friction to get a useful comparison.`;
  }

  const defaultPath = optionSummaries.find((option) => option.optionType === "commit") || optionSummaries[0];
  const changePath = optionSummaries.find((option) => option.optionType === "exit") || optionSummaries[1];
  const postponePath = optionSummaries.find((option) => option.optionType === "delay");
  const bits = [criteriaText];

  if (defaultPath && changePath) {
    if (changePath.valuesFit > defaultPath.valuesFit || changePath.longTermGain > defaultPath.longTermGain) {
      bits.push(`${changePath.label} looks stronger on values alignment or long-term gain.`);
    } else if (defaultPath.valuesFit > changePath.valuesFit || defaultPath.longTermGain > changePath.longTermGain) {
      bits.push(`${defaultPath.label} currently looks stronger on values alignment or long-term gain.`);
    }

    if (defaultPath.leastResistance > changePath.leastResistance) {
      bits.push(`${defaultPath.label} looks easier in the short term.`);
    } else if (changePath.leastResistance > defaultPath.leastResistance) {
      bits.push(`${changePath.label} looks easier in the short term.`);
    }
  }

  if (postponePath) {
    if (state.evidence["postpone-honesty"] === "real-data") {
      bits.push(`${postponePath.label} may help if it is used to gather real new information.`);
    } else if (state.evidence["postpone-honesty"] === "mostly-delay" || state.evidence["postpone-honesty"] === "avoidance") {
      bits.push(`${postponePath.label} may function more as delay than clarity.`);
    }
  }

  if (evidenceScore <= -3) {
    bits.push("Your signal answers lean toward strain or caution.");
  } else if (evidenceScore >= 3) {
    bits.push("Your signal answers lean toward steadiness.");
  }

  if (constraintPressure >= 5) {
    bits.push("Practical constraints are likely to matter in the short term.");
  }

  return bits.join(" ");
}

function constraintLevelWeight(level) {
  const map = { a: 0, b: 0.5, c: 1, d: 1.5, e: 2 };
  return map[level] ?? 0;
}

function constraintLevelLabel(level) {
  const map = {
    a: "not an issue",
    b: "easily solved",
    c: "manageable waves",
    d: "hard obstacle",
    e: "feels impossible",
  };
  return map[level] || "not marked";
}

function describePressure(value) {
  const map = {
    steady: "The timing appears steady enough to leave room for reflection instead of pure reaction.",
    tight: "There is some time pressure, but it still appears possible to slow the decision process down.",
    urgent: "Strong time pressure may pull attention toward relief and away from long-term fit.",
    reactive: "The decision currently feels highly reactive, which raises the risk of choosing under emotional compression.",
  };
  return map[value] || "The current level of time pressure has not been described yet.";
}

function describeTrigger(value) {
  const map = {
    "slow-build": "This decision seems tied to a longer pattern, which usually makes the analysis more reliable.",
    "recent-event": "A recent event may be shaping the emotional intensity of the decision, so it is worth checking whether it reflects a pattern or a spike.",
    deadline: "An outside deadline appears to be driving the timing of the decision.",
    mixed: "The decision appears to come from both a longer pattern and a recent trigger.",
  };
  return map[value] || "The balance between long-term pattern and recent trigger has not been clarified yet.";
}

function describeClarity(value) {
  const map = {
    clear: "The user reports a relatively stable internal view, which can support cleaner judgment.",
    foggy: "Emotional fog or overwhelm may make the current analysis less settled than it appears.",
    split: "Part of the decision process seems clear, while another part remains internally divided.",
    numb: "Numbness or shutdown may hide important signals that deserve slower review.",
  };
  return map[value] || "Current clarity versus overwhelm has not been captured yet.";
}

function describeVoices(value) {
  const map = {
    mine: "The decision currently seems anchored mostly in the user’s own judgment.",
    shared: "The decision appears to involve both the user’s own judgment and outside influence.",
    others: "Other people’s expectations may be exerting significant pressure on the analysis.",
    fear: "Fear appears to be especially loud in the decision process right now.",
  };
  return map[value] || "It is not yet clear whose voice is shaping the decision most strongly.";
}

function describeSafety(value) {
  const map = {
    yes: "The user currently reports feeling basically safe remaining in the situation.",
    mostly: "The user reports partial safety, but not full ease or steadiness.",
    unsure: "Safety in the current situation is uncertain and deserves more careful attention.",
    no: "The user does not currently feel safe remaining in the situation.",
  };
  return map[value] || "The user has not yet assessed whether remaining feels safe.";
}

function describeEscalation(value) {
  const map = {
    stable: "The pattern currently appears relatively stable rather than intensifying.",
    improving: "The user perceives signs of improvement in the pattern.",
    mixed: "The pattern seems inconsistent, which may make it harder to interpret cleanly.",
    escalating: "The user perceives the pattern as escalating, which raises the importance of caution.",
  };
  return map[value] || "The user has not yet assessed whether the situation is stable or escalating.";
}

function tierWeight(tier) {
  const map = {
    "non-negotiable": 5,
    important: 3,
    "nice-to-have": 1,
  };
  return map[tier] ?? 0;
}

function ensureConsequence(optionId) {
  if (!state.consequences[optionId]) {
    state.consequences[optionId] = {
      short: "",
      medium: "",
      long: "",
      friction: "",
      valuesFit: "",
      upside: "",
      risk: "",
      reversibility: "",
    };
  }
}

function normalizedConsequence(optionId) {
  ensureConsequence(optionId);
  return state.consequences[optionId];
}

function optionDisplayName(option, index) {
  const description = option.description?.trim();
  return description || option.label || `Option ${index + 1}`;
}

function metricScale(kind) {
  const maps = {
    friction: [
      ["1", "1. Very low friction"],
      ["2", "2. Low friction"],
      ["3", "3. Moderate friction"],
      ["4", "4. High friction"],
      ["5", "5. Very high friction"],
    ],
    valuesFit: [
      ["1", "1. Weak fit with my values"],
      ["2", "2. Partial fit"],
      ["3", "3. Mixed fit"],
      ["4", "4. Strong fit"],
      ["5", "5. Very strong fit"],
    ],
    upside: [
      ["1", "1. Very little upside"],
      ["2", "2. Limited upside"],
      ["3", "3. Moderate upside"],
      ["4", "4. Strong upside"],
      ["5", "5. Very strong upside"],
    ],
    risk: [
      ["1", "1. Very low risk"],
      ["2", "2. Low risk"],
      ["3", "3. Moderate risk"],
      ["4", "4. High risk"],
      ["5", "5. Very high risk"],
    ],
    reversibility: [
      ["1", "1. Very hard to reverse"],
      ["2", "2. Hard to reverse"],
      ["3", "3. Partly reversible"],
      ["4", "4. Mostly reversible"],
      ["5", "5. Easy to reverse"],
    ],
  };
  return [["", "Choose one"], ...(maps[kind] || [])];
}

function numericMetric(value, fallback) {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

function metricLabel(kind, value) {
  const labels = {
    friction: ["very low", "low", "moderate", "high", "very high"],
    valuesFit: ["weak", "partial", "mixed", "strong", "very strong"],
    upside: ["very low", "limited", "moderate", "strong", "very strong"],
    risk: ["very low", "low", "moderate", "high", "very high"],
    reversibility: ["very hard", "hard", "partly reversible", "mostly reversible", "easy"],
  };
  return labels[kind]?.[value - 1] || "not scored";
}

function genericOptionSummary({ option, friction, valuesFit, upside, risk, reversibility, constraintPressure }) {
  const parts = [];
  if (friction <= 2) parts.push("This path looks comparatively easier to live through in the short term.");
  if (friction >= 4) parts.push("This path may create significant short-term friction or disruption.");
  if (valuesFit >= 4) parts.push("It appears to align relatively well with the values you marked.");
  if (upside >= 4) parts.push("You scored it as having strong long-term upside.");
  if (risk >= 4) parts.push("You also marked it as carrying meaningful risk or uncertainty.");
  if (reversibility >= 4) parts.push("It appears more reversible than some alternatives.");
  if (reversibility <= 2) parts.push("It may be difficult to reverse once chosen.");
  if (constraintPressure >= 5) parts.push("Practical constraints may materially affect how realistic or manageable it feels.");
  if (!parts.length) {
    parts.push("This option currently sits in the middle: neither clearly easy nor clearly high-upside from your scoring.");
  }
  return parts.join(" ");
}

function optionTypeLabel(type) {
  const map = {
    commit: "Default path",
    exit: "Make the change",
    delay: "Gather more data",
    conditional: "Conditional path",
  };
  return map[type] || "Decision path";
}

function renderSelectOptions(options, currentValue) {
  return options
    .map(([value, label]) => `<option value="${value}" ${value === currentValue ? "selected" : ""}>${label}</option>`)
    .join("");
}

function capitalize(value) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function escapeHtml(value) {
  return String(value || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

backButton.addEventListener("click", () => {
  state.showReadiness = false;
  if (steps[state.currentStep]?.id === "values" && state.valueStage === "rank") {
    state.valueStage = "select";
    render();
    return;
  }
  if (state.currentStep > 0) {
    state.currentStep -= 1;
    render();
  }
});

nextButton.addEventListener("click", () => {
  if (steps[state.currentStep]?.id === "values" && state.valueStage === "select") {
    state.valueStage = "rank";
    render();
    return;
  }
  if (steps[state.currentStep]?.id === "bias" && getReportReadinessIssues().length) {
    state.showReadiness = true;
    render();
    return;
  }
  if (state.currentStep < steps.length - 1) {
    state.showReadiness = false;
    state.currentStep += 1;
  } else {
    state = createInitialState();
  }
  render();
});

function closeFeedback() {
  feedbackDialog.close();
  feedbackError.hidden = true;
}

feedbackButton.addEventListener("click", () => {
  feedbackDialog.showModal();
  feedbackMessage.focus();
  track("feedback_opened");
});

document.getElementById("feedback-close").addEventListener("click", closeFeedback);
document.getElementById("feedback-cancel").addEventListener("click", closeFeedback);

feedbackDialog.addEventListener("click", (event) => {
  if (event.target === feedbackDialog) closeFeedback();
});

feedbackForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const message = feedbackMessage.value.trim();
  if (!message) return;
  if (!feedbackEmail || !feedbackEmail.includes("@")) {
    feedbackError.textContent = "The feedback email has not been configured yet.";
    feedbackError.hidden = false;
    return;
  }

  const subject = encodeURIComponent("Decision Clarity feedback");
  const body = encodeURIComponent(message);
  track("feedback_email_opened");
  window.location.href = `mailto:${feedbackEmail}?subject=${subject}&body=${body}`;
  feedbackMessage.value = "";
  closeFeedback();
});

async function loadExternalEvidencePrompts() {
  try {
    const response = await fetch("./quick_signal_check_questions.json", { cache: "no-store" });
    if (!response.ok) return;
    const data = await response.json();
    if (Array.isArray(data) && data.length) {
      externalEvidencePrompts = data;
    }
  } catch {
    // Fallback to built-in questions when the external file is missing or invalid.
  } finally {
    render();
  }
}

track("app_opened");
loadExternalEvidencePrompts();
