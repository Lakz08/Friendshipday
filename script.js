const title = document.getElementById("title");
const subtitle = document.getElementById("subtitle");
const question = document.getElementById("question");
const buttons = document.getElementById("buttons");
const memeBox = document.getElementById("memeBox");
const memeImg = document.getElementById("memeImg");
const memeCaption = document.getElementById("memeCaption");
const stepLabel = document.getElementById("stepLabel");
const friendshipPct = document.getElementById("friendshipPct");
const progressFill = document.getElementById("progressFill");
const footerHint = document.getElementById("footerHint");
const bgHearts = document.querySelector(".bg-hearts");

const questions = [
  {
    q: "Who is the bigger idiot? 🤔 ",
    yes: "You 😂",
    no: "Me 😇",
    yesCaption:"Correct answer ! I know you'd admit it 🤣",
    noCaption: "Aww... trying to be nice? Nice try. 😏",
    meme: "memes/reels-cat.jpg",
    noCaptionType: "meme",
  },

  
  {
    q: "Who sends better reels?",
    yes: "Me, obviously 😌",
    no: "You? Bold choice 😭",
    noCaption: "Interesting opinion... let's pretend I did not read that.",
    meme: "memes/chaos-cat.jpg",
    yesCaption: "Correct. I knew you were smart.",
    noCaptionType: "meme",
  },
  {
    q: "Have we ever had a normal conversation?",
    yes: "No, and that is the best part 😂",
    no: "Normal? Us? Never.",
    noCaption: "Exactly. That would be suspicious.",
    meme: "memes/creepy.cat.jpg",
    yesCaption: "Absolutely not. That would ruin the vibe.",
    noCaptionType: "meme",
  },

  {
    q: "Am I your favorite human?",
    yes: "Obviously 😎",
    noCaption: "Wrong answer 😂 Try again.",
    meme: "memes/crying-cat.jpg",
    noCaptionType: "meme",
  },

  {
    q: "Will you stay my best friend forever?",
    yes: "Yes ❤️",
    no: "No 🙈",
    noCaption: "Hmm... this button is allowed too. But it leads somewhere cute 😌",
    meme: null,
    yesCaption: null,
    noCaptionType: "letter",
  }
];

const memeNames = [
  "criying-cat.jpg",
  "reels-cat.jpg",
  "creepy.cat.jpg",
  "chaos-cat.jpg"
];

let step = -1;
let noCountFinal = 0;

function setProgress(stepIndex) {
  const total = questions.length;
  const pct = Math.round(((stepIndex + 1) / total) * 100);
  stepLabel.textContent = `Question ${Math.min(stepIndex + 1, total)} of ${total}`;
  friendshipPct.textContent = `${pct}%`;
  progressFill.style.width = `${pct}%`;
}

function sparkleConfetti() {
  if (typeof confetti !== "function") return;
  confetti({ particleCount: 90, spread: 85, origin: { y: 0.68 } });
  setTimeout(() => confetti({ particleCount: 45, spread: 95, origin: { y: 0.64 } }), 140);
}

function createHearts() {
  const emojis = ["❤", "💗", "✨"];
  for (let i = 0; i < 18; i++) {
    const el = document.createElement("div");
    el.className = "heart";
    el.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    el.style.left = Math.random() * 100 + "vw";
    el.style.fontSize = (14 + Math.random() * 18) + "px";
    el.style.animationDuration = (8 + Math.random() * 5) + "s";
    el.style.animationDelay = (Math.random() * 6) + "s";
    el.style.opacity = (0.25 + Math.random() * 0.45).toFixed(2);
    bgHearts.appendChild(el);
  }
}

function showMeme(src, caption) {
  if (!src) {
    memeBox.style.display = "none";
    return;
  }
  memeImg.src = src;
  memeCaption.textContent = caption || "";
  memeBox.style.display = "block";
}

function renderQuestion(index) {
  const item = questions[index];
  setProgress(index);
  title.textContent = index === 0 ? "Hey idiot 👀" : `Question ${index + 1}`;
  subtitle.textContent = index === 0
    ? "I have a very important friendship test."
    : "Choose carefully... or choose chaos.";
  question.textContent = item.q;

  if (index < 3) {
    buttons.innerHTML = `
      <button class="btn primary" id="yesBtn">${item.yes}</button>
      <button class="btn secondary" id="noBtn">${item.no}</button>
    `;
    document.getElementById("yesBtn").onclick = onYes;
    document.getElementById("noBtn").onclick = onNo;
  } else {
    buttons.innerHTML = `
      <button class="btn primary" id="yesBtn">${item.yes}</button>
      <button class="btn secondary" id="noBtn">${item.no}</button>
    `;
    document.getElementById("yesBtn").onclick = onFinalYes;
    document.getElementById("noBtn").onclick = onFinalNo;
  }

  showMeme(null);
  footerHint.textContent = index < 3
    ? "Hint: the “No” button is allowed... but it may be a trap 😌"
    : "Last one. Be honest. Or be cute. Both are acceptable.";
}

function onYes() {
  const item = questions[step];
  if (step === 0) {
    subtitle.textContent = item.yes;
    sparkleConfetti();
  } else if (step === 1) {
    subtitle.textContent = item.yesCaption;
    showMeme(item.meme, "Reels department: elite.");
  } else if (step === 2) {
    subtitle.textContent = item.yesCaption;
    showMeme(item.meme, "Normal conversation? We do not know her.");
  }
  sparkleConfetti();
  setTimeout(() => {
    step++;
    if (step < 3) renderQuestion(step);
    else renderQuestion(3);
  }, 5000);
}

function onNo() {
  const item = questions[step];
  subtitle.textContent = item.noCaption;
  showMeme(item.meme, item.noCaption);
  sparkleConfetti();
  setTimeout(() => {
    step++;
    if (step < 3) renderQuestion(step);
    else renderQuestion(3);
  }, 5000);
}

function letterScreen() {
  const app = document.getElementById("app");
  app.innerHTML = `
    <div class="badge">Message from your bestie 💌</div>
    <div class="letter">
      <div class="envelope">✉️</div>
      <h2>Oyiee Kuttee ❤️</h2>
      <div class="chat" id="chat"></div>
      <button class="btn primary" id="openBtn">Open Letter 🎉</button>
    </div>
  `;
  const chat = document.getElementById("chat");
  const openBtn = document.getElementById("openBtn");
  const msgs = [
    ["me", "Hey idiot..."],
    ["me", "Thank you for every laugh."],
    ["me", "Every stupid conversation."],
    ["me", "Every reel you send."],
    ["me", "And every time you put up with my chaos."],
    ["me", "I'm really lucky to have you."],
    ["me", "Here's to many more years of chaos, fun and friendships !!🍾."],
  ];

  let i = 0;
  function addMsg() {
    if (i >= msgs.length) return;
    const [cls, text] = msgs[i];
    const div = document.createElement("div");
    div.className = `bubble ${cls === "me" ? "me" : "them"}`;
    div.textContent = text;
    chat.appendChild(div);
    i++;
    setTimeout(addMsg, 420);
  }

  addMsg();

  openBtn.onclick = () => {
    const final = document.createElement("div");
    final.innerHTML = `
      <div class="final-title">🎉 HAPPY FRIENDSHIP DAY 🎉</div>
      <div class="final-sub">To my only harami ❤️</div>
      <p class="footer-hint" style="margin-top:10px;">You are stuck with me forever.</p>
    `;
    app.innerHTML = "";
    app.appendChild(final);
    sparkleConfetti();
    const burst = () => {
      if (typeof confetti !== "function") return;
      confetti({ particleCount: 140, spread: 110, origin: { y: 0.65 } });
      confetti({ particleCount: 80, spread: 70, origin: { y: 0.7 } });
    };
    burst();
    setTimeout(burst, 700);
    setTimeout(burst, 1300);
  };
}

function onFinalYes() {
  subtitle.textContent = "Correct answer ❤️";
  sparkleConfetti();
  setTimeout(letterScreen, 650);
}

function onFinalNo() {
  noCountFinal += 1;
  const noBtn = document.getElementById("noBtn");
  noBtn.classList.remove("no-bounce");
  void noBtn.offsetWidth;
  noBtn.classList.add("no-bounce");

  const prompts = [
    "Are you sure, Kuttee? 🥺",
    "Think carefully... ❤️",
    "Last chance before I get emotional 😌",
    "Fine. Read this cute message first."
  ];
  subtitle.textContent = prompts[Math.min(noCountFinal - 1, prompts.length - 1)];
  sparkleConfetti();

  if (noCountFinal >= 4) {
    setTimeout(letterScreen, 650);
  }
}

createHearts();
renderQuestion(step = 0);

// gentle floating hearts after first interaction
document.addEventListener("click", () => sparkleConfetti(), { once: true });
