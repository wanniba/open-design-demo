/* Banana page interactions (wireframe) */
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

const state = {
  lifeIndex: 0,
  when: "today",
  banana: "green",
  ripeness: 4,
  quiz: new Map()
};

const life = [
  {
    title: "育苗 / 种苗来源",
    desc: "多数栽培香蕉通过无性繁殖获得整齐一致的种苗（例如吸芽或组织培养苗）。",
    bullets: ["你能看到什么：苗圃出苗、统一规格的幼苗", "为什么重要：决定了抗病性与一致性", "家庭关联：你买到的“同一把香蕉口感接近”往往来自这种一致性"],
    note: "线框备注：如果你希望更科学化，可补一句“栽培品种多为三倍体、结籽能力弱”，但不必在首屏讲太深。"
  },
  {
    title: "营养生长：长叶、长“假茎”",
    desc: "植株快速生长，叶片是主要“工厂”。假茎来自叶鞘叠加，不是木质树干。",
    bullets: ["你能看到什么：巨大叶片、风大时叶片容易破裂（正常）", "为什么重要：叶片越健康，后续结果越稳定", "家庭关联：这阶段离你很远，但决定了果实大小/饱满度"],
    note: "线框备注：这一步适合用一张“草本 vs 木本”的对比小图。"
  },
  {
    title: "抽蕾：花序开始出现",
    desc: "开花前，花序（蕾）从假茎中伸出并逐渐下垂，进入“要结果”的阶段。",
    bullets: ["你能看到什么：花苞下垂，层层苞片", "为什么重要：后续每层花对应一把香蕉", "家庭关联：你听到的“一串有几把”从这里就基本定了"],
    note: "线框备注：用“串/把/根”的示意图可以让这段立刻变清楚。"
  },
  {
    title: "开花与坐果：一把一把成形",
    desc: "雌花在前，逐步形成果实；不同位置的果实往往有轻微差异。",
    bullets: ["你能看到什么：一把一把排列，果实弧度逐渐明显", "为什么重要：位置差异会影响成熟同步性", "家庭关联：同一把香蕉里，有时中间更先熟是正常现象"],
    note: "线框备注：可以在成熟度模块里呼应“同一把不完全同步”。"
  },
  {
    title: "果实膨大：还绿，但在“长肉”",
    desc: "此时果实多为绿色且硬，主要在积累淀粉和体积；离“好吃”还差一步。",
    bullets: ["你能看到什么：果指更饱满，棱角逐渐圆润", "为什么重要：决定后续甜度基础与口感", "家庭关联：超市买到的偏青香蕉，常接近这个状态的延伸"],
    note: "线框备注：这里不需要给出具体天数，避免不同产地/品种差异带来的误导。"
  },
  {
    title: "采收：多在偏绿阶段进行",
    desc: "为运输与货架管理，香蕉常在偏绿、较硬时采收，成熟会在后段“被安排”。",
    bullets: ["你能看到什么：切下整串、分把处理", "为什么重要：减少运输损耗与过熟风险", "家庭关联：你看到的“青香蕉”可能已经离开田间很久了"],
    note: "线框备注：建议加一句“看起来青≠刚摘”，帮助用户重设直觉。"
  },
  {
    title: "运输：控温 + 防压伤",
    desc: "运输阶段的关键是：控温、通风、避免压伤；压伤常会在后续显现成黑斑。",
    bullets: ["你能看到什么：箱装、泡沫/纸隔离", "为什么重要：压伤会成为“提前变黑”的触发点", "家庭关联：买的时候优先挑“无明显压伤”的把"],
    note: "线框备注：这里可以放一个“压伤 → 变黑”的简单因果箭头。"
  },
  {
    title: "催熟：乙烯让成熟更同步",
    desc: "在商业链路中，常用可控环境让香蕉在更接近上架时进入成熟进程，便于统一管理。",
    bullets: ["你能看到什么：同批次颜色更一致", "为什么重要：减少“这一箱熟过头、那一箱还硬”的波动", "家庭关联：纸袋催熟其实是在小规模复刻这个逻辑"],
    note: "线框备注：避免写“多久必黄”；不同条件差异很大。"
  },
  {
    title: "零售与家庭：继续成熟直到被吃掉",
    desc: "上架后成熟仍在继续：颜色变化、软化、风味增强。你要做的是：把成熟进度对齐你的时间表。",
    bullets: ["你能看到什么：从黄绿到黄到褐点", "为什么重要：过熟不一定坏，但用途不同", "家庭关联：用“成熟度 1–7 + 保存决策器”就够用了"],
    note: "线框备注：这一步可以用“时间轴 + 你的选择点”做收束。"
  }
];

const ripeness = {
  colors: {
    1: "oklch(78% 0.12 150)", // green
    2: "oklch(84% 0.12 135)",
    3: "oklch(90% 0.12 115)",
    4: "oklch(92% 0.10 105)",
    5: "oklch(90% 0.08 95)",
    6: "oklch(84% 0.06 70)",
    7: "oklch(74% 0.05 40)"
  },
  items: {
    1: { label: "阶段 1：全青偏硬", title: "适合：先放着（还没到口感最好）", desc: "果肉更硬、风味弱。你能做的是：让它在常温通风处慢慢变黄，必要时纸袋催熟。", uses: ["先放着", "切片烹饪（如果你习惯）", "不建议直接大量食用"] },
    2: { label: "阶段 2：青中带黄", title: "适合：买回家安排“后天吃”", desc: "外观开始转黄但仍偏硬。放 1–2 天后口感会明显变好。", uses: ["计划食用", "避免压伤", "纸袋轻催熟"] },
    3: { label: "阶段 3：黄绿相间", title: "适合：明后天吃（口感开始舒服）", desc: "甜味开始出现，但还保留一点脆感。", uses: ["日常水果", "切片酸奶", "带去通勤"] },
    4: { label: "阶段 4：黄多绿少", title: "适合：直接吃（甜度上升）", desc: "超市常见、也最“稳”的状态：带回家放一两天会更甜。", uses: ["直接吃", "早餐搭配", "给孩子切片"] },
    5: { label: "阶段 5：全黄", title: "适合：今天就吃（风味更足）", desc: "果肉更软，甜度更明显。想延缓变软，可冷藏（接受果皮变暗）。", uses: ["直接吃", "做燕麦/奶昔", "冷藏延缓变软"] },
    6: { label: "阶段 6：黄皮带褐点", title: "适合：更甜（但更容易压伤）", desc: "褐点往往意味着成熟度更高。若不打算马上吃，建议切段冷冻。", uses: ["更甜口感", "香蕉面包/松饼", "切段冷冻"] },
    7: { label: "阶段 7：褐点很多/皮暗", title: "适合：加工（奶昔/烘焙）", desc: "果肉可能非常软。只要没有霉味/渗液/霉变，仍可加工食用。", uses: ["奶昔", "烘焙", "冷冻存放"] }
  }
};

const adviceTable = {
  today: {
    green: {
      title: "建议：纸袋轻催熟 + 室温通风",
      body: "你想尽快吃但它还偏青：用纸袋轻包（留一点透气口），放在室温阴凉处。可同放 1 个苹果/梨帮助催熟；每天看一次颜色变化，避免闷出水汽。",
      copy: `香蕉保存小抄（想快吃）：
- 纸袋轻包，留透气口
- 可同放 1 个苹果/梨（加速成熟）
- 避免密封塑料袋（容易闷出水汽）
- 看到合适熟度后再冷藏延缓变软`
    },
    yellow: {
      title: "建议：室温放置，避免压伤",
      body: "今天/明天吃：室温阴凉通风处即可。尽量别和重物挤在一起；压伤会在后续变成黑斑。",
      copy: `香蕉保存小抄（今天/明天吃）：
- 室温阴凉通风
- 避免太阳直晒与压伤
- 想更甜：今晚室温放着即可`
    },
    spotty: {
      title: "建议：尽快吃或切段冷冻",
      body: "已经很甜、也更软：今天就吃最合适；吃不完就剥皮切段冷冻。冷冻后适合做奶昔/烘焙。",
      copy: `香蕉保存小抄（已经很甜）：
- 今天就吃最香
- 吃不完：剥皮切段冷冻
- 冷冻香蕉：奶昔/烘焙非常合适`
    }
  },
  soon: {
    green: {
      title: "建议：室温自然成熟（必要时轻催熟）",
      body: "2–3 天内吃：默认室温通风自然成熟即可。如果你希望更准时变黄，可在第 2 天用纸袋轻催熟半天到一天。",
      copy: `香蕉保存小抄（2–3 天内吃）：
- 室温通风自然成熟
- 想更准时：第 2 天纸袋轻催熟
- 避免压伤与闷袋`
    },
    yellow: {
      title: "建议：熟度对齐你的日程",
      body: "现在能吃、两三天内也能吃：室温放置即可；如果天气很热或你怕变软太快，放到较凉的房间角落（不是冷风直吹）。",
      copy: `香蕉保存小抄（2–3 天内吃）：
- 室温阴凉处放置
- 天热怕变软：找更凉的室内位置
- 不要放密封袋`
    },
    spotty: {
      title: "建议：冷藏延缓变软（接受果皮变暗）",
      body: "你想两三天内慢慢吃：可以冷藏延缓变软，但果皮会更快变暗。也可以“部分冷冻”，留一两根常温当天吃。",
      copy: `香蕉保存小抄（更甜但想慢慢吃）：
- 冷藏可延缓变软（果皮会更暗）
- 分批：留 1–2 根常温，其余冷藏/冷冻`
    }
  },
  later: {
    green: {
      title: "建议：分批成熟 + 预留冷冻出口",
      body: "超过 3 天：把一把香蕉分开摆放（降低互相催熟），保持通风。到适合熟度后再冷藏；如果出现大量褐点且吃不完，优先切段冷冻。",
      copy: `香蕉保存小抄（3 天以上）：
- 分开摆放，减少互相催熟
- 适合熟度后再冷藏延缓变软
- 吃不完：切段冷冻当“后备甜味”`
    },
    yellow: {
      title: "建议：尽快“锁住成熟度”",
      body: "现在已经能吃，想放更久：建议冷藏延缓变软（接受果皮变暗）；并准备冷冻方案，避免后期集中过熟浪费。",
      copy: `香蕉保存小抄（想放更久）：
- 冷藏延缓变软（果皮会变暗）
- 过熟预案：剥皮切段冷冻`
    },
    spotty: {
      title: "建议：直接转冷冻（最稳）",
      body: "已经很熟、还想放久：冷冻是最稳妥的“保质策略”。剥皮切段，装袋写日期。",
      copy: `香蕉保存小抄（想放久且已很熟）：
- 直接剥皮切段冷冻
- 装袋写日期
- 用途：奶昔/烘焙/冰沙`
    }
  }
};

const quiz = [
  {
    q: "看到香蕉果皮变黑，你的第一反应更应该是？",
    choices: ["立刻丢掉（一定坏了）", "闻一闻/看是否霉变，再判断用途", "一定是放冰箱才会这样，不能吃"],
    correct: 1,
    explain: "果皮变黑常与成熟度或低温有关，不等同于腐败。更可靠的判断是：是否霉变/渗液/异味，以及你要拿它做什么。"
  },
  {
    q: "想让偏青香蕉更快变黄，最实用的做法是？",
    choices: ["密封塑料袋闷着", "纸袋轻包并留透气口（可同放苹果/梨）", "放在阳光直晒的位置"],
    correct: 1,
    explain: "纸袋能聚集一定乙烯同时保持透气；密封塑料袋易积水汽，直晒则可能导致过热与局部变质。"
  },
  {
    q: "你计划 2–3 天后吃，超市更建议挑哪种？",
    choices: ["全黄且很多褐点", "黄绿相间或黄多绿少", "全青、很硬（越青越新）"],
    correct: 1,
    explain: "关键是“对齐时间表”。2–3 天后吃，挑黄绿或开始转黄的更稳；太熟容易过软，太青可能来不及到最佳口感。"
  },
  {
    q: "关于“挂着放”，更准确的说法是？",
    choices: ["必须挂着，否则会坏", "挂放主要是为了减少压伤与更通风", "挂着会让成熟变慢很多"],
    correct: 1,
    explain: "挂放的核心是减少压伤与保持通风；成熟速度主要由温度、通风与乙烯环境决定。"
  }
];

function setNavActive(id){
  $$("[data-nav]").forEach(a => a.dataset.active = (a.dataset.nav === id) ? "true" : "false");
}

function updateProgress(){
  const doc = document.documentElement;
  const max = doc.scrollHeight - doc.clientHeight;
  const p = max > 0 ? (doc.scrollTop / max) : 0;
  $("#bar").style.width = `${Math.max(0, Math.min(1, p)) * 100}%`;
}

function updateScrollSpy(){
  const sections = $$("[data-section]");
  const y = 86;
  let current = sections[0]?.dataset.section || "what";
  for(const s of sections){
    const r = s.getBoundingClientRect();
    if(r.top - y <= 0) current = s.dataset.section;
  }
  setNavActive(current);
}

function renderLife(){
  const root = $("#steps");
  root.innerHTML = "";
  life.forEach((item, idx) => {
    const b = document.createElement("button");
    b.type = "button";
    b.className = "step";
    b.setAttribute("role", "listitem");
    b.dataset.idx = String(idx);
    b.setAttribute("aria-current", idx === state.lifeIndex ? "true" : "false");
    b.innerHTML = `
      <span class="dot" aria-hidden="true"></span>
      <span>
        <h4><span class="mono">${String(idx+1).padStart(2,"0")}</span> ${item.title}</h4>
        <p>${item.desc}</p>
      </span>
    `;
    b.addEventListener("click", () => setLife(idx));
    root.appendChild(b);
  });
  paintLife();
}

function paintLife(){
  $$("#steps .step").forEach((b, idx) => b.setAttribute("aria-current", idx === state.lifeIndex ? "true" : "false"));
  const item = life[state.lifeIndex];
  $("#lifeIndex").textContent = `阶段 ${String(state.lifeIndex+1).padStart(2,"0")}`;
  $("#lifeTitle").textContent = item.title;
  $("#lifeDesc").textContent = item.desc;
  const ul = $("#lifeBullets");
  ul.innerHTML = "";
  item.bullets.forEach(t => {
    const li = document.createElement("li");
    li.textContent = t;
    ul.appendChild(li);
  });
  $("#lifeNote").textContent = item.note;
}

function setLife(idx){
  state.lifeIndex = idx;
  paintLife();
}

function paintRipeness(){
  const n = state.ripeness;
  const it = ripeness.items[n];
  $("#ripVal").textContent = String(n);
  $("#ripLabel").textContent = it.label;
  $("#ripTitle").textContent = it.title;
  $("#ripDesc").textContent = it.desc;
  const c = ripeness.colors[n] || "var(--accent)";
  $("#ripSwatch").style.background = c;
  $("#ripViz").style.borderColor = `color-mix(in oklch, ${c} 40%, var(--border))`;
  $("#ripViz").style.background = `linear-gradient(180deg, color-mix(in oklch, ${c} 12%, var(--surface)), color-mix(in oklch, var(--bg) 70%, var(--surface)))`;
  const uses = $("#ripUses");
  uses.innerHTML = "";
  it.uses.forEach(u => {
    const s = document.createElement("span");
    s.className = "use";
    s.textContent = u;
    uses.appendChild(s);
  });
}

function setRipeness(n){
  state.ripeness = n;
  paintRipeness();
}

function setChoice(stateKey, value, buttonGroup = stateKey){
  state[stateKey] = value;
  $$(`.opt[data-q="${buttonGroup}"]`).forEach(b => b.setAttribute("aria-pressed", b.dataset.v === value ? "true" : "false"));
  paintAdvice();
}

function paintAdvice(){
  const row = adviceTable[state.when]?.[state.banana];
  if(!row) return;
  $("#adviceTitle").textContent = `建议：${row.title.replace(/^建议：/, "")}`;
  $("#adviceBody").textContent = row.body;
  $("#adviceCopy").textContent = row.copy;
}

async function copyText(text){
  try{
    await navigator.clipboard.writeText(text);
    return true;
  }catch(e){
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.style.position = "fixed";
    ta.style.left = "-9999px";
    document.body.appendChild(ta);
    ta.focus();
    ta.select();
    const ok = document.execCommand("copy");
    ta.remove();
    return ok;
  }
}

function renderQuiz(){
  const root = $("#quizList");
  root.innerHTML = "";
  quiz.forEach((item, idx) => {
    const wrap = document.createElement("div");
    wrap.className = "qz";
    wrap.dataset.idx = String(idx);
    wrap.innerHTML = `
      <h3><span class="mono">Q${idx+1}</span> ${item.q}</h3>
      <div class="choices" role="group" aria-label="选择答案"></div>
      <div class="feedback" data-show="false"></div>
    `;
    const choices = $(".choices", wrap);
    item.choices.forEach((c, cidx) => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "choice";
      b.setAttribute("aria-pressed", "false");
      b.textContent = c;
      b.addEventListener("click", () => answer(idx, cidx));
      choices.appendChild(b);
    });
    root.appendChild(wrap);
  });
  paintScore();
}

function answer(qi, ci){
  state.quiz.set(qi, ci);
  const wrap = $(`.qz[data-idx="${qi}"]`);
  $$(".choice", wrap).forEach((b, idx) => b.setAttribute("aria-pressed", idx === ci ? "true" : "false"));
  paintFeedback(qi, false);
  paintScore();
}

function paintFeedback(qi, forceShow){
  const wrap = $(`.qz[data-idx="${qi}"]`);
  if(!wrap) return;
  const fb = $(".feedback", wrap);
  const ci = state.quiz.get(qi);
  if(ci === undefined && !forceShow){
    fb.dataset.show = "false";
    return;
  }
  const item = quiz[qi];
  const ok = ci === item.correct;
  fb.dataset.show = "true";
  fb.style.borderColor = ok
    ? "color-mix(in oklch, var(--success) 28%, var(--border))"
    : "color-mix(in oklch, var(--danger) 30%, var(--border))";
  fb.style.background = ok
    ? "color-mix(in oklch, var(--success) 10%, var(--surface))"
    : "color-mix(in oklch, var(--danger) 10%, var(--surface))";
  const picked = ci === undefined ? "—" : item.choices[ci];
  fb.textContent = `你的选择：${picked}。${ok ? "正确。" : "不太准确。"} 解析：${item.explain}`;
}

function paintScore(){
  const total = quiz.length;
  const answered = state.quiz.size;
  if(answered < total){
    $("#scoreStrong").textContent = "未完成";
    $("#scoreText").textContent = `已完成 ${answered}/${total} 题。`;
    return;
  }
  let correct = 0;
  for(let i=0;i<total;i++){
    if(state.quiz.get(i) === quiz[i].correct) correct++;
  }
  $("#scoreStrong").textContent = `得分：${correct}/${total}`;
  $("#scoreText").textContent = correct === total ? "全对。你已经能“买对 + 放对”了。" : "不必追求满分：重点是把判断逻辑用起来。";
}

function resetAll(){
  state.lifeIndex = 0;
  state.when = "today";
  state.banana = "green";
  state.ripeness = 4;
  state.quiz = new Map();
  renderLife();
  setChoice("when", "today");
  setChoice("banana", "green", "state");
  $("#ripenessRange").value = "4";
  paintRipeness();
  renderQuiz();
  $$("details.faq").forEach(d => d.removeAttribute("open"));
  updateProgress();
  updateScrollSpy();
}

function bind(){
  renderLife();
  paintRipeness();
  renderQuiz();
  paintAdvice();

  $("#ripenessRange").addEventListener("input", (e) => setRipeness(Number(e.target.value)));

  $$(".opt").forEach(b => {
    b.addEventListener("click", () => {
      const q = b.dataset.q;
      const v = b.dataset.v;
      if(q === "state") setChoice("banana", v, "state");
      else setChoice(q, v);
    });
  });

  $("#btnCopyAdvice").addEventListener("click", async () => {
    const ok = await copyText($("#adviceCopy").textContent);
    $("#btnCopyAdvice").textContent = ok ? "已复制" : "复制失败";
    setTimeout(() => ($("#btnCopyAdvice").textContent = "复制"), 900);
  });

  $("#btnCopySummary").addEventListener("click", async () => {
    const text = `香蕉的一生｜要点：
1) 买：先问“什么时候吃”，再选成熟度；优先避压伤与渗液。
2) 放：默认常温通风；想快纸袋轻催熟；熟了可冷藏延缓变软（接受果皮变暗）。
3) 吃不完：剥皮切段冷冻最稳，适合奶昔/烘焙。`;
    const ok = await copyText(text);
    const btn = $("#btnCopySummary");
    const prev = btn.textContent;
    btn.textContent = ok ? "要点已复制" : "复制失败";
    setTimeout(() => (btn.textContent = prev), 1000);
  });

  $("#btnReveal").addEventListener("click", () => {
    for(let i=0;i<quiz.length;i++) paintFeedback(i, true);
  });
  $("#btnRetry").addEventListener("click", () => {
    state.quiz = new Map();
    renderQuiz();
  });

  $("#btnReset").addEventListener("click", () => resetAll());

  window.addEventListener("scroll", () => {
    updateProgress();
    updateScrollSpy();
  }, { passive: true });

  window.addEventListener("resize", () => {
    updateProgress();
    updateScrollSpy();
  });

  updateProgress();
  updateScrollSpy();
  setNavActive("what");
}

bind();
