const steps = [
  { id: "topic", title: "What area of life is troubling you at the moment?", navTitle: "Life area" },
  { id: "timing", title: "How soon does this need a decision?" },
  { id: "shape", title: "What kind of decision is this?" },
  { id: "pressure", title: "What is influencing this decision?" },
  { id: "sentence", title: "Name the choice" },
  { id: "result", title: "Your next step" },
];

const topics = [
  ["love", "Love / relationships", "A partner, dating, staying, leaving, repair, or commitment."],
  ["work", "Work", "A job, project, client, career move, study, or business choice."],
  ["family", "Family", "A family conversation, boundary, responsibility, or change."],
  ["future", "Future", "A direction, identity, plan, or bigger life question."],
  ["moving", "Moving", "A place, home, city, travel, or relocation decision."],
  ["money", "Money", "A purchase, risk, saving, debt, investment, or financial tradeoff."],
  ["health", "Health / wellbeing", "Energy, care, burnout, habits, or support."],
  ["other", "Something else", "Use this if the topic does not fit neatly anywhere."],
];

const timingOptions = [
  ["days", "Within days", "The window is tight. The tool will favor a practical next step."],
  ["weeks", "Within weeks", "There is time to check the pressure without turning it into a long project."],
  ["months", "Within months", "You may need a first experiment more than a final answer today."],
  ["not-sensitive", "It is not time-sensitive", "Nothing major changes if you wait."],
];

const shapes = [
  ["between-options", "I am choosing between options", "There are two or more paths and none feels easy."],
  ["whether-to-act", "I am unsure whether to act", "The question is whether to change something or leave it for now."],
  ["overthinking", "I need to stop overthinking", "The loop is louder than the actual decision."],
  ["conversation", "I need to talk to someone", "The next step may be a conversation, boundary, or request."],
  ["unclear", "I do not know yet", "The decision still feels foggy."],
];

const pressureStatements = [
  { id: "cost", text: "Staying as things are is costing me something important." },
  { id: "gain", text: "Making a change would clearly improve something." },
  { id: "delay", text: "If I delay, something important may change without my input." },
  { id: "fear", text: "I already know what I want, but I am afraid of the consequences." },
  { id: "info", text: "I need more information before I can choose responsibly." },
  { id: "voices", text: "Other people's opinions are making this harder to judge." },
  { id: "stakes", text: "The consequences of this decision feel hard to undo." },
  { id: "support", text: "I have enough stability and support to take the next step safely." },
];

const answerLabels = {
  yes: "Yes",
  maybe: "Maybe",
  no: "No",
};

function createInitialState() {
  return {
    currentStep: 0,
    pressureIndex: 0,
    topic: "",
    timing: "",
    shape: "",
    statement: "",
    pressure: {},
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
  const stepNumber = String(properties.number || "").padStart(2, "0");
  const event = eventName === "app_opened"
    ? { path: location.pathname, title: document.title }
    : {
        path: eventName === "step_viewed"
          ? `quick-step-${stepNumber}-${properties.step}`
          : `quick-${eventName.replaceAll("_", "-")}`,
        title: eventName === "step_viewed"
          ? `Quick step ${properties.number}: ${properties.step}`
          : `Quick ${eventName.replaceAll("_", " ")}`,
        event: true,
      };

  if (!sendAnalyticsEvent(event)) pendingAnalytics.push(event);
}

document.getElementById("goatcounter-script")?.addEventListener("load", flushAnalytics);

function trackStep() {
  const step = steps[state.currentStep];
  const id = step.id === "pressure" ? `${step.id}-${state.pressureIndex + 1}` : step.id;
  if (trackedSteps.has(id)) return;
  trackedSteps.add(id);
  track("step_viewed", { step: id, number: state.currentStep + 1 });
}

function render() {
  const step = steps[state.currentStep];
  stepKicker.textContent = `Step ${state.currentStep + 1}`;
  stepTitle.textContent = step.title;
  stepCount.textContent = `${state.currentStep + 1} / ${steps.length}`;
  renderStepList();
  renderStepContent(step.id);
  renderButtons(step.id);
  trackStep();
}

function renderStepList() {
  stepList.innerHTML = "";
  steps.forEach((step, index) => {
    const item = document.createElement("li");
    item.textContent = `${index + 1}. ${step.navTitle || step.title}`;
    item.tabIndex = 0;
    item.setAttribute("role", "button");
    const openStep = () => {
      state.currentStep = index;
      render();
    };
    item.addEventListener("click", openStep);
    item.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openStep();
      }
    });
    if (index === state.currentStep) item.classList.add("active");
    if (index < state.currentStep) item.classList.add("completed");
    stepList.appendChild(item);
  });
}

function furthestAvailableStep() {
  if (!state.topic) return 0;
  if (!state.timing) return 1;
  if (!state.shape) return 2;
  if (answeredPressureCount() < pressureStatements.length) return 3;
  return state.statement.trim() ? 5 : 4;
}

function renderStepContent(stepId) {
  if (stepId === "topic") {
    renderChoiceStep({
      lead: "",
      options: topics,
      currentValue: state.topic,
      layout: "list",
      showDescriptions: false,
      onChoose: (value) => {
        state.topic = value;
        track("topic_selected", { value });
        goNext();
        render();
      },
    });
  }

  if (stepId === "timing") {
    renderChoiceStep({
      lead: "This decides whether the tool should push toward action, testing, or a slower version.",
      options: timingOptions,
      currentValue: state.timing,
      layout: "list",
      showDescriptions: false,
      onChoose: (value) => {
        state.timing = value;
        track("timing_selected", { value });
        goNext();
        render();
      },
    });
  }

  if (stepId === "shape") {
    renderChoiceStep({
      lead: "Choose the closest shape. It does not need to be perfect.",
      options: shapes,
      currentValue: state.shape,
      layout: "list",
      onChoose: (value) => {
        state.shape = value;
        track("shape_selected", { value });
        goNext();
        render();
      },
    });
  }

  if (stepId === "pressure") renderPressure();
  if (stepId === "sentence") renderSentence();
  if (stepId === "result") renderResult();
}

function renderChoiceStep({ lead, options, currentValue, onChoose, layout = "grid", showDescriptions = true }) {
  stepContent.innerHTML = `
    ${lead ? `<p class="lead">${escapeHtml(lead)}</p>` : ""}
    <div class="${layout === "list" ? "choice-list" : "choice-grid"}">
      ${options.map(([value, label, description]) => `
        <button class="choice-card ${value === currentValue ? "selected" : ""}" type="button" data-value="${escapeHtml(value)}">
          <strong>${escapeHtml(label)}</strong>
          ${showDescriptions ? `<span>${escapeHtml(description)}</span>` : ""}
        </button>
      `).join("")}
    </div>
  `;

  stepContent.querySelectorAll("[data-value]").forEach((button) => {
    button.addEventListener("click", () => onChoose(button.dataset.value));
  });
}

function renderPressure() {
  stepContent.innerHTML = `
    <div class="pressure-wrap">
      <div class="prompt-progress">
        <span>Answer each statement in the way that feels closest.</span>
        <span>${answeredPressureCount()} of ${pressureStatements.length} answered</span>
      </div>
      <div class="pressure-list">
        ${pressureStatements.map((statement, index) => {
          const current = state.pressure[statement.id] || "";
          return `
            <div class="pressure-row">
              <h3><span class="statement-number">${index + 1}.</span> ${escapeHtml(statement.text)}</h3>
              <div class="answer-row" aria-label="Answer choices for statement ${index + 1}">
                ${["yes", "maybe", "no"].map((value) => `
                  <button class="answer-button ${value === current ? "selected" : ""}" type="button" data-statement="${escapeHtml(statement.id)}" data-answer="${value}">
                    <strong>${answerLabels[value]}</strong>
                  </button>
                `).join("")}
              </div>
            </div>
          `;
        }).join("")}
      </div>
    </div>
  `;

  stepContent.querySelectorAll("[data-answer]").forEach((button) => {
    button.addEventListener("click", () => {
      const statementId = button.dataset.statement;
      state.pressure[statementId] = button.dataset.answer;
      track("pressure_answered", { id: statementId, value: button.dataset.answer });
      render();
    });
  });
}

function renderSentence() {
  stepContent.innerHTML = `
    <p class="lead">Now put the decision into one plain sentence. This can be rough.</p>
    <div class="field">
      <label for="decision-statement">What choice are you facing?</label>
      <textarea id="decision-statement" placeholder="Example: Should I stay in this job for now, ask for changes, or start looking seriously?">${escapeHtml(state.statement)}</textarea>
      <p class="field-note">One sentence is enough. The point is to make the choice visible.</p>
    </div>
  `;

  document.getElementById("decision-statement").addEventListener("input", (event) => {
    state.statement = event.target.value;
    renderButtons("sentence");
  });
}

function renderResult() {
  const result = buildResult();
  stepContent.innerHTML = `
    <ul class="summary-strip">
      <li>${escapeHtml(labelFor(topics, state.topic))}</li>
      <li>${escapeHtml(labelFor(timingOptions, state.timing))}</li>
      <li>${escapeHtml(labelFor(shapes, state.shape))}</li>
    </ul>
    <div class="result-grid">
      <article class="result-card featured">
        <p class="section-kicker">Most useful next move</p>
        <h3>${escapeHtml(result.title)}</h3>
        <p>${escapeHtml(result.body)}</p>
      </article>
      <article class="result-card ${result.warning ? "warning" : ""}">
        <h3>Why this direction</h3>
        <ul class="plain-list">
          ${result.reasons.map((reason) => `<li>${escapeHtml(reason)}</li>`).join("")}
        </ul>
      </article>
      <article class="result-card">
        <h3>Do this next</h3>
        <p>${escapeHtml(result.nextStep)}</p>
      </article>
      <article class="result-card">
        <h3>Decision sentence</h3>
        <p>${escapeHtml(state.statement.trim() || "No sentence added yet.")}</p>
      </article>
    </div>
    <div class="extended-tool">
      <a class="primary-button extended-tool-link" href="full-version/">Go deeper - extended analytical tool</a>
    </div>
  `;

  stepContent.querySelector(".extended-tool-link")?.addEventListener("click", () => {
    track("extended_tool_opened");
  });
}

function renderButtons(stepId) {
  backButton.disabled = state.currentStep === 0 && state.pressureIndex === 0;
  nextButton.textContent = stepId === "pressure"
    ? "Continue"
    : state.currentStep === steps.length - 1 ? "Start over" : "Next";
  nextButton.hidden = ["topic", "timing", "shape"].includes(stepId);
  nextButton.disabled = !canGoNext(stepId);
}

function canGoNext(stepId) {
  if (stepId === "topic") return Boolean(state.topic);
  if (stepId === "timing") return Boolean(state.timing);
  if (stepId === "shape") return Boolean(state.shape);
  if (stepId === "pressure") return answeredPressureCount() === pressureStatements.length;
  if (stepId === "sentence") return Boolean(state.statement.trim());
  return true;
}

function goNext() {
  if (state.currentStep < steps.length - 1) {
    state.currentStep += 1;
  }
}

function goBack() {
  if (steps[state.currentStep]?.id === "pressure" && state.pressureIndex > 0) {
    state.pressureIndex -= 1;
    render();
    return;
  }
  if (state.currentStep > 0) {
    state.currentStep -= 1;
    render();
  }
}

function answeredPressureCount() {
  return pressureStatements.filter((statement) => state.pressure[statement.id]).length;
}

function buildResult() {
  const yes = (id) => state.pressure[id] === "yes";
  const maybe = (id) => state.pressure[id] === "maybe";
  const no = (id) => state.pressure[id] === "no";
  const reasons = [];
  let warning = false;

  if (no("support")) {
    warning = true;
    return {
      title: "Get support before forcing a decision",
      body: "The next move should protect your stability before it tries to settle the whole question.",
      reasons: [
        "You marked support or stability as not enough right now.",
        "Urgent decisions become harder to judge when the basic safety of the next step is uncertain.",
      ],
      nextStep: "Contact one trusted person or relevant support service, then decide only the smallest safe action.",
      warning,
    };
  }

  if (yes("info")) {
    reasons.push("You said more information is needed before choosing responsibly.");
    if (yes("stakes") || maybe("stakes")) {
      reasons.push("The decision also feels hard to undo, so a reversible information-gathering step matters.");
    }
    return {
      title: "Learn one missing thing first",
      body: "Your next decision is not the final choice. It is what information would make the choice responsible.",
      reasons,
      nextStep: "Write one question you need answered, then choose the fastest honest way to get that answer.",
      warning,
    };
  }

  if (yes("fear")) {
    reasons.push("You may already know the direction, but the consequences feel loud.");
    if (yes("voices") || maybe("voices")) reasons.push("Other people's reactions may be mixing with your own judgment.");
    return {
      title: "Prepare for the consequence, not the whole decision",
      body: "The choice may be clearer than it feels. The work is making the next step survivable.",
      reasons,
      nextStep: "Name the consequence you fear most, then plan one boundary, conversation, or fallback that would reduce its power.",
      warning,
    };
  }

  if (yes("cost") && yes("gain") && (yes("delay") || state.timing === "days")) {
    reasons.push("Staying has a cost, change has a clear gain, and delay may remove some agency.");
    if (yes("stakes") || maybe("stakes")) reasons.push("Because the stakes feel high, the first move should still be controlled.");
    return {
      title: yes("stakes") ? "Take a small controlled action" : "Act on the clearest next step",
      body: "This looks less like a lack of clarity and more like a need to move without overcommitting.",
      reasons,
      nextStep: "Choose one action you can take in the next 24-48 hours that creates movement without locking you into everything.",
      warning,
    };
  }

  if (yes("voices")) {
    reasons.push("Other people's opinions are making the decision harder to judge.");
    if (!yes("cost") && !yes("gain")) reasons.push("The internal signal is not strong enough yet to let outside voices lead.");
    return {
      title: "Separate your voice from the room",
      body: "Before choosing, reduce the noise around the decision so you can hear your own stake in it.",
      reasons,
      nextStep: "Write two short lists: what I would choose if nobody reacted, and what changes because people will react.",
      warning,
    };
  }

  if (yes("stakes")) {
    reasons.push("The consequences feel hard to undo.");
    if (state.timing === "months" || state.timing === "not-sensitive") reasons.push("The timing gives you room to test before committing.");
    return {
      title: "Test before committing",
      body: "When the stakes feel high, the best urgent move is often a reversible experiment.",
      reasons,
      nextStep: "Design the smallest test: a conversation, trial period, budget check, visit, draft, or temporary boundary.",
      warning,
    };
  }

  const maybeCount = Object.values(state.pressure).filter((value) => value === "maybe").length;
  if (maybeCount >= 4 || state.shape === "unclear" || state.shape === "overthinking") {
    reasons.push("Several answers are uncertain, so the decision may still be too broad.");
    if (state.shape === "overthinking") reasons.push("The current problem may be the loop, not the lack of effort.");
    return {
      title: "Narrow the decision",
      body: "The useful next move is to make the choice smaller and more concrete.",
      reasons,
      nextStep: "Rewrite the question as two real options: do X by this date, or do Y by this date.",
      warning,
    };
  }

  if (no("cost") && no("delay") && !yes("gain")) {
    reasons.push("Delay does not seem to carry a major cost right now.");
    reasons.push("Change does not yet have a clear enough gain to justify urgency.");
    return {
      title: "Pause without abandoning the decision",
      body: "This may not need an urgent answer. It may need a defined review point.",
      reasons,
      nextStep: "Set a date to revisit the question and decide what evidence would make the answer clearer by then.",
      warning,
    };
  }

  reasons.push("Your answers point to movement, but not necessarily a final commitment.");
  if (maybe("support")) reasons.push("Support is not fully clear, so keep the next step small.");
  return {
    title: "Choose the next honest step",
    body: "You do not need to solve the whole decision in one move. You need one step that creates more truth.",
    reasons,
    nextStep: "Pick the action that makes the situation clearer within one week: ask, test, schedule, compare, or set a boundary.",
    warning,
  };
}

function labelFor(options, value) {
  return options.find((item) => item[0] === value)?.[1] || "Not answered";
}

function escapeHtml(value) {
  return String(value || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

backButton.addEventListener("click", goBack);

nextButton.addEventListener("click", () => {
  const stepId = steps[state.currentStep]?.id;
  if (state.currentStep === steps.length - 1) {
    state = createInitialState();
    trackedSteps.clear();
    track("restart");
    render();
    return;
  }
  if (!canGoNext(stepId)) return;
  goNext();
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

  const subject = encodeURIComponent("Decision Clarity quick flow feedback");
  const body = encodeURIComponent(message);
  track("feedback_email_opened");
  window.location.href = `mailto:${feedbackEmail}?subject=${subject}&body=${body}`;
  feedbackMessage.value = "";
  closeFeedback();
});

track("app_opened");
render();
