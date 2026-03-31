const steps = [
  {
    id: 1,
    title: "Campaign Setup",
    description:
      "Capture your campaign objective and voice so every message stays consistent.",
    checklist: [
      "Brand objective (awareness, conversions, UGC, etc.)",
      "Campaign timeline (start date, content deadlines)",
      "Deliverables needed (post, story, reel, usage rights)",
      "Tone (friendly, professional, enthusiastic, concise)",
    ],
    outputPreview: `Questions to ask:
- What is your campaign goal?
- Which deliverables are required?
- What voice should messages use?`,
  },
  {
    id: 2,
    title: "Influencer Context",
    description:
      "Gather profile details before drafting outreach. If a profile link is shared, ask what to extract.",
    checklist: [
      "Influencer niche and content themes",
      "Audience fit with your brand",
      "Recent content tone/style",
      "Any constraints or brand-safety notes",
    ],
    outputPreview: `Message Draft:
Hi [Name], I love how you [specific detail]. We're launching [campaign] and thought your audience could be a great fit...`,
  },
  {
    id: 3,
    title: "Initial Outreach Draft",
    description:
      "Generate a personalized first message that feels human and avoids generic copy.",
    checklist: [
      "Personal opener tied to their content",
      "Clear campaign value and alignment",
      "Simple ask (interest + availability)",
      "No misleading claims or overpromises",
    ],
    outputPreview: `Why this works:
- Personalized opener builds trust
- Clear ask reduces back-and-forth
- Tone matches collaborative brand voice`,
  },
  {
    id: 4,
    title: "Follow-up Nudge",
    description:
      "If no reply, send a short follow-up that is respectful and low-pressure.",
    checklist: [
      "Friendly check-in after a reasonable gap",
      "Keep it concise (2-4 lines)",
      "Restate value briefly",
      "Offer easy next step",
    ],
    outputPreview: `Optional variations:
1) Friendly reminder
2) Professional check-in
3) Concise follow-up
4) Enthusiastic nudge`,
  },
  {
    id: 5,
    title: "Negotiation Support",
    description:
      "When pricing/scope discussions start, suggest frameworks and relationship-safe wording.",
    checklist: [
      "Ask budget range before suggesting specific numbers",
      "Compare flat fee vs performance/hybrid options",
      "Flag red flags (scope mismatch, unclear rights)",
      "Craft positive counter-offer language",
    ],
    outputPreview: `Negotiation reply:
Thanks for sharing your rate. Given the current scope, we can offer [X] with [deliverables]. If helpful, we can also explore [alternative structure].`,
  },
  {
    id: 6,
    title: "Round-Two & Close",
    description:
      "Summarize asks, align on next steps, and finalize details in clear language.",
    checklist: [
      "Summarize influencer asks and concerns",
      "Confirm agreed deliverables and timeline",
      "Confirm compensation and payment terms",
      "Close with appreciation and clear next action",
    ],
    outputPreview: `Closing message:
Amazing — we're aligned on [deliverables], [timeline], and [compensation]. We'll send the brief/contract next. Excited to collaborate!`,
  },
];

let currentStepIndex = 0;

const stepTitle = document.getElementById("step-title");
const stepDescription = document.getElementById("step-description");
const checklist = document.getElementById("checklist");
const outputPreview = document.getElementById("output-preview");
const progressText = document.getElementById("progress-text");
const progressBar = document.getElementById("progress-bar");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const resetBtn = document.getElementById("reset-btn");
const stepDots = document.getElementById("step-dots");

function renderDots() {
  stepDots.innerHTML = "";
  steps.forEach((step, index) => {
    const dot = document.createElement("button");
    dot.className = `dot ${index === currentStepIndex ? "active" : ""}`;
    dot.type = "button";
    dot.setAttribute("aria-label", `Go to step ${step.id}: ${step.title}`);
    dot.textContent = step.id;
    dot.addEventListener("click", () => {
      currentStepIndex = index;
      render();
    });
    stepDots.appendChild(dot);
  });
}

function renderChecklist(items) {
  checklist.innerHTML = "";
  items.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    checklist.appendChild(li);
  });
}

function updateProgress() {
  const current = currentStepIndex + 1;
  const total = steps.length;
  const percent = Math.round((current / total) * 100);
  progressText.textContent = `Step ${current} of ${total}`;
  progressBar.style.width = `${percent}%`;
  progressBar.setAttribute("aria-valuenow", percent.toString());
}

function updateButtons() {
  prevBtn.disabled = currentStepIndex === 0;
  nextBtn.textContent =
    currentStepIndex === steps.length - 1 ? "Finish" : "Next";
}

function render() {
  const step = steps[currentStepIndex];
  stepTitle.textContent = `${step.id}. ${step.title}`;
  stepDescription.textContent = step.description;
  renderChecklist(step.checklist);
  outputPreview.textContent = step.outputPreview;
  updateProgress();
  updateButtons();
  renderDots();
}

prevBtn.addEventListener("click", () => {
  if (currentStepIndex > 0) {
    currentStepIndex -= 1;
    render();
  }
});

nextBtn.addEventListener("click", () => {
  if (currentStepIndex < steps.length - 1) {
    currentStepIndex += 1;
    render();
  } else {
    currentStepIndex = 0;
    render();
  }
});

resetBtn.addEventListener("click", () => {
  currentStepIndex = 0;
  render();
});

render();
