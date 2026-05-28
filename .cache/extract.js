
      const $$ = (sel, root=document) => root.querySelector(sel);
      const $$$ = (sel, root=document) => Array.from(root.querySelectorAll(sel));

      const moneyCNY = (n) => `¥${Math.round(n).toLocaleString('zh-CN')}`;
      const clamp = (n, a, b) => Math.max(a, Math.min(b, n));
      const uniq = (arr) => Array.from(new Set(arr));

      const DATA = [
        {
          id: "aw-invoice-copilot",
          name: "Invoice Copilot",
          vendor: "AgentWeave Verified",
          industry: ["财务共享", "制造业", "互联网"],
          task: ["发票识别", "对账", "费用报销"],
          compliance: ["SOC 2", "ISO 27001"],
          deploy: ["SaaS", "VPC"],
          pricing: { model: "按席位", price: 980, unit: "元/席位/月", annualDiscount: 0.86 },
          adoption: 184,
          newDays: 12,
          permissions: ["读取邮箱", "写入ERP", "访问对象存储"],
          desc: "从发票/附件抽取字段 → 规则校验 → 对账差异解释；可输出可审计的证据链与审批建议。",
          highlights: [
            { k: "适用场景", v: "三单匹配、专票/普票、费用报销" },
            { k: "输出", v: "字段明细、风险点、审批建议、凭证草稿" },
            { k: "权限", v: "邮箱(可选)、ERP、对象存储" },
          ],
        },
        {
          id: "proc-contract-review",
          name: "Contract Review Agent",
          vendor: "Lattice Legal AI",
          industry: ["采购", "金融", "互联网"],
          task: ["合同审阅", "条款比对", "风险标注"],
          compliance: ["ISO 27001"],
          deploy: ["SaaS", "本地部署"],
          pricing: { model: "按用量", price: 3.2, unit: "元/页", min: 2000 },
          adoption: 92,
          newDays: 33,
          permissions: ["访问文档库", "写入审阅意见"],
          desc: "对照公司模板与红线库自动标注风险条款；支持对比版本差异并生成可复核的审阅摘要。",
          highlights: [
            { k: "适用场景", v: "框架协议、供应商合同、NDA" },
            { k: "审阅维度", v: "责任限制、数据处理、交付验收、违约" },
            { k: "权限", v: "文档库(只读/读写可配)" },
          ],
        },
        {
          id: "cx-qc-audit",
          name: "CX Quality Auditor",
          vendor: "SentryOps",
          industry: ["电商", "互联网", "ToB SaaS"],
          task: ["客服质检", "话术合规", "工单归因"],
          compliance: ["SOC 2"],
          deploy: ["SaaS", "VPC"],
          pricing: { model: "按席位", price: 680, unit: "元/席位/月", annualDiscount: 0.88 },
          adoption: 141,
          newDays: 7,
          permissions: ["读取工单", "读取通话转写"],
          desc: "按策略抽检工单与通话转写，输出违规片段、原因归类与改进建议；支持一键生成质检报告。",
          highlights: [
            { k: "适用场景", v: "售后质检、销售外呼、投诉升级" },
            { k: "指标", v: "一次解决率、违规率、情绪波动点" },
            { k: "权限", v: "工单/录音转写(只读)" },
          ],
        },
        {
          id: "supplychain-risk-radar",
          name: "Supply Chain Risk Radar",
          vendor: "Northwind Analytics",
          industry: ["制造业", "零售", "物流"],
          task: ["供应链预警", "需求预测", "异常检测"],
          compliance: ["ISO 27001"],
          deploy: ["SaaS", "VPC"],
          pricing: { model: "按订阅", price: 16800, unit: "元/月（含 5 个项目）" },
          adoption: 63,
          newDays: 20,
          permissions: ["读取WMS", "读取ERP", "写入预警工单"],
          desc: "结合采购/库存/运输数据识别断供风险与异常波动；可解释驱动因素并生成应对方案草稿。",
          highlights: [
            { k: "适用场景", v: "断供预警、延迟风险、库存积压" },
            { k: "输出", v: "预警、解释、处置建议、工单" },
            { k: "权限", v: "ERP/WMS(只读)、工单(写入)" },
          ],
        },
        {
          id: "it-access-governor",
          name: "Access Governor",
          vendor: "BlueGate Security",
          industry: ["金融", "互联网", "制造业"],
          task: ["权限治理", "审计", "账号回收"],
          compliance: ["SOC 2", "ISO 27001"],
          deploy: ["本地部署", "VPC"],
          pricing: { model: "按席位", price: 1280, unit: "元/席位/月", annualDiscount: 0.84 },
          adoption: 38,
          newDays: 54,
          permissions: ["读取IAM", "写入IAM", "读取工单"],
          desc: "把“谁拥有哪些权限、为什么、有效期多久”变成可审计流程；支持自动回收与审批留痕。",
          highlights: [
            { k: "适用场景", v: "最小权限、临时权限、离职回收" },
            { k: "输出", v: "权限台账、审计日志、回收计划" },
            { k: "权限", v: "IAM 读写、工单系统" },
          ],
        },
        {
          id: "rpa-finops-keeper",
          name: "FinOps Keeper",
          vendor: "CloudLedger",
          industry: ["互联网", "ToB SaaS", "金融"],
          task: ["成本优化", "预算管控", "告警归因"],
          compliance: ["SOC 2"],
          deploy: ["SaaS"],
          pricing: { model: "按用量", price: 0.18, unit: "元/资源小时", min: 5000 },
          adoption: 205,
          newDays: 4,
          permissions: ["读取云账单", "写入告警规则"],
          desc: "把成本异常与变更、资源、团队归因关联；输出可执行的降本清单与回滚建议。",
          highlights: [
            { k: "适用场景", v: "突增归因、闲置资源、预算告警" },
            { k: "输出", v: "降本清单、Owner、预估节省" },
            { k: "权限", v: "账单(只读)、告警规则(写入)" },
          ],
        },
      ];

      const FACETS = {
        industry: { label: "行业", el: "#facetIndustry", countEl: "#countIndustry" },
        task: { label: "任务", el: "#facetTask", countEl: "#countTask" },
        compliance: { label: "合规", el: "#facetCompliance", countEl: "#countCompliance" },
        deploy: { label: "部署", el: "#facetDeploy", countEl: "#countDeploy" },
        pricingModel: { label: "计费", el: "#facetPricing", countEl: "#countPricing" },
        permissions: { label: "权限", el: "#facetPerm", countEl: "#countPerm" },
      };

      const state = {
        q: "",
        sort: "relevance",
        facets: {
          industry: new Set(),
          task: new Set(),
          compliance: new Set(),
          deploy: new Set(),
          pricingModel: new Set(),
          permissions: new Set(),
        },
        detailId: null,
        cart: new Map(), // id -> { seats, term, qtyUsage? }
        signedIn: false,
        checkoutStep: 1,
        checkout: {
          email: "",
          company: "",
          term: "年付",
          payment: "PO",
          poNumber: "",
          invoiceType: "增值税专票",
          taxId: "",
          address: "",
          receiver: "",
        }
      };

      function deriveOptions(){
        const industries = uniq(DATA.flatMap(a => a.industry)).sort((a,b)=>a.localeCompare(b,"zh"));
        const tasks = uniq(DATA.flatMap(a => a.task)).sort((a,b)=>a.localeCompare(b,"zh"));
        const comps = uniq(DATA.flatMap(a => a.compliance)).sort();
        const deploys = uniq(DATA.flatMap(a => a.deploy)).sort((a,b)=>a.localeCompare(b,"zh"));
        const pricingModels = uniq(DATA.map(a => a.pricing.model)).sort((a,b)=>a.localeCompare(b,"zh"));
        const perms = uniq(DATA.flatMap(a => a.permissions)).sort((a,b)=>a.localeCompare(b,"zh"));
        return { industries, tasks, comps, deploys, pricingModels, perms };
      }

      function renderFacet(containerSel, items, facetKey){
        const root = $$(containerSel);
        root.innerHTML = items.map((label) => {
          const id = `${facetKey}:${label}`;
          return `
            <label class="check">
              <input type="checkbox" data-facet="${facetKey}" value="${escapeHtml(label)}" id="${escapeAttr(id)}" />
              <span class="meta">
                <span>${escapeHtml(label)}</span>
                <span class="muted mono" data-count-for="${escapeAttr(id)}">—</span>
              </span>
            </label>
          `.trim();
        }).join("");
      }

      function escapeHtml(s){
        return String(s).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll("\"","&quot;").replaceAll("'","&#39;");
      }
      function escapeAttr(s){ return escapeHtml(s); }

      function matchesFacets(agent){
        const f = state.facets;
        const hit = (set, values) => set.size === 0 || values.some(v => set.has(v));
        const permHit = (set, values) => set.size === 0 || values.some(v => set.has(v));
        const pricingHit = (set, model) => set.size === 0 || set.has(model);
        return (
          hit(f.industry, agent.industry) &&
          hit(f.task, agent.task) &&
          hit(f.compliance, agent.compliance) &&
          hit(f.deploy, agent.deploy) &&
          pricingHit(f.pricingModel, agent.pricing.model) &&
          permHit(f.permissions, agent.permissions)
        );
      }

      function matchesQuery(agent){
        const q = state.q.trim().toLowerCase();
        if (!q) return true;
        const hay = [
          agent.name, agent.vendor, agent.desc,
          ...agent.industry, ...agent.task, ...agent.compliance, ...agent.deploy, agent.pricing.model,
          ...agent.permissions
        ].join(" ").toLowerCase();
        return hay.includes(q);
      }

      function scoreRelevance(agent){
        const q = state.q.trim().toLowerCase();
        if (!q) return 0;
        const s = q.split(/\s+/).filter(Boolean);
        const hay = (agent.name + " " + agent.desc + " " + agent.task.join(" ")).toLowerCase();
        let score = 0;
        for (const t of s) score += hay.includes(t) ? 1 : 0;
        return score;
      }

      function filtered(){
        return DATA
          .filter(a => matchesQuery(a) && matchesFacets(a));
      }

      function sorted(list){
        const l = list.slice();
        switch(state.sort){
          case "price_asc":
            l.sort((a,b)=>numericPrice(a)-numericPrice(b)); break;
          case "price_desc":
            l.sort((a,b)=>numericPrice(b)-numericPrice(a)); break;
          case "adoption_desc":
            l.sort((a,b)=>b.adoption-a.adoption); break;
          case "new_desc":
            l.sort((a,b)=>a.newDays-b.newDays); break;
          case "relevance":
          default:
            l.sort((a,b)=>scoreRelevance(b)-scoreRelevance(a)); break;
        }
        return l;
      }

      function numericPrice(agent){
        // Normalize different models into a comparable-ish number for sorting.
        if (agent.pricing.model === "按用量") return agent.pricing.price * 1000;
        return agent.pricing.price;
      }

      function activeFilterText(){
        const parts = [];
        for (const [k,set] of Object.entries(state.facets)){
          if (set.size === 0) continue;
          const label = FACETS[k]?.label || k;
          parts.push(`${label} ${set.size}项`);
        }
        if (state.q.trim()) parts.push(`关键词`);
        return parts.length ? parts.join(" · ") : "无筛选";
      }

      function renderResults(){
        const list = sorted(filtered());
        $$("#resultCount").textContent = String(list.length);
        $$("#activeFilters").textContent = activeFilterText();
        $$("#empty").hidden = list.length !== 0;
        const root = $$("#results");
        root.innerHTML = list.map(a => `
          <article class="card" role="button" tabindex="0" data-open-detail="${escapeAttr(a.id)}" aria-label="打开 ${escapeAttr(a.name)} 详情">
            <div class="card__top">
              <div>
                <h3>${escapeHtml(a.name)}</h3>
                <div class="vendor">${escapeHtml(a.vendor)}</div>
              </div>
              <span class="tag ${a.compliance.includes("SOC 2") ? "tag--success" : ""}">${escapeHtml(a.compliance[0] || "—")}</span>
            </div>
            <p class="desc">${escapeHtml(a.desc)}</p>
            <div class="card__tags">
              <span class="tag">${escapeHtml(a.task[0])}</span>
              <span class="tag">${escapeHtml(a.deploy.includes("VPC") ? "VPC 可选" : a.deploy[0])}</span>
              <span class="tag">${escapeHtml(a.pricing.model)}</span>
            </div>
            <div class="priceRow">
              <div>
                <span class="price">${escapeHtml(a.pricing.model === "按用量" ? moneyCNY(a.pricing.price) : moneyCNY(a.pricing.price))}</span>
                <span class="unit">${escapeHtml(a.pricing.unit)}</span>
              </div>
              <div class="small muted mono">${a.adoption} 家采用 · ${a.newDays} 天前上新</div>
            </div>
          </article>
        `).join("");

        // Make cards keyboard-openable
        $$$("[data-open-detail]").forEach((el) => {
          el.addEventListener("keydown", (e) => {
            if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openDetail(el.getAttribute("data-open-detail")); }
          });
        });
      }

      function countMatchesPerOption(){
        // For each option, show how many would match if we add it to current selection.
        const base = filtered();
        const index = new Map(); // facetKey:value -> count
        for (const agent of base){
          for (const v of agent.industry) bump(index, `industry:${v}`);
          for (const v of agent.task) bump(index, `task:${v}`);
          for (const v of agent.compliance) bump(index, `compliance:${v}`);
          for (const v of agent.deploy) bump(index, `deploy:${v}`);
          bump(index, `pricingModel:${agent.pricing.model}`);
          for (const v of agent.permissions) bump(index, `permissions:${v}`);
        }
        for (const [k, meta] of Object.entries(FACETS)){
          const total = uniq(DATA.flatMap(a => facetValues(a, k))).length;
          $$(meta.countEl).textContent = `${total}项`;
        }
        $$$("[data-count-for]").forEach((el) => {
          const key = el.getAttribute("data-count-for").replace(/^.*?:/, (m)=>m); // no-op
          el.textContent = String(index.get(key) || 0);
        });
      }

      function facetValues(agent, facetKey){
        switch(facetKey){
          case "industry": return agent.industry;
          case "task": return agent.task;
          case "compliance": return agent.compliance;
          case "deploy": return agent.deploy;
          case "pricingModel": return [agent.pricing.model];
          case "permissions": return agent.permissions;
          default: return [];
        }
      }
      function bump(map, k){ map.set(k, (map.get(k) || 0) + 1); }

      function openOverlay(){
        const overlay = $$("#overlay");
        overlay.dataset.open = "true";
        overlay.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";
      }
      function closeOverlay(){
        const overlay = $$("#overlay");
        overlay.dataset.open = "false";
        overlay.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "";
      }
      function anyDrawerOpen(){
        return ["detailDrawer","cartDrawer","checkoutDrawer"].some(id => $$("#"+id).dataset.open === "true");
      }
      function closeAllDrawers(){
        ["detailDrawer","cartDrawer","checkoutDrawer"].forEach(id => { $$("#"+id).dataset.open = "false"; });
        closeOverlay();
      }

      function openDetail(id){
        const agent = DATA.find(a => a.id === id);
        if (!agent) return;
        state.detailId = id;
        $$("#btnAddToCart").textContent = "加入购物车";
        $$("#detailTitle").textContent = agent.name;
        $$("#detailSubtitle").textContent = `${agent.vendor} · ${agent.industry[0]} · ${agent.task[0]}`;
        $$("#detailPrice").textContent = agent.pricing.model === "按用量" ? moneyCNY(agent.pricing.price) : moneyCNY(agent.pricing.price);
        $$("#detailUnit").textContent = agent.pricing.model === "按席位"
          ? `${agent.pricing.unit} · 年付 ${Math.round((agent.pricing.annualDiscount||0.88)*100)}折`
          : agent.pricing.unit;

        const permTags = agent.permissions.map(p => `<span class="tag">${escapeHtml(p)}</span>`).join("");
        const compTags = agent.compliance.map(c => `<span class="tag tag--success">${escapeHtml(c)}</span>`).join("");
        const depTags = agent.deploy.map(d => `<span class="tag">${escapeHtml(d)}</span>`).join("");
        const taskTags = agent.task.slice(0,3).map(t => `<span class="tag">${escapeHtml(t)}</span>`).join("");

        const pricing = renderPricing(agent);
        const permMatrix = renderPermissionMatrix(agent);

        $$("#detailBody").innerHTML = `
          <div class="section" aria-label="摘要">
            <h4>能力摘要</h4>
            <div class="kv">
              ${agent.highlights.map(x => `<div class="row"><span class="k">${escapeHtml(x.k)}</span><span class="v">${escapeHtml(x.v)}</span></div>`).join("")}
            </div>
          </div>
          <div class="section" aria-label="标签">
            <h4>标签</h4>
            <div class="seg" aria-label="标签列表">
              ${taskTags}${depTags}${compTags}
            </div>
            <div style="height:10px"></div>
            <div class="seg" aria-label="权限列表">
              ${permTags}
            </div>
          </div>
          <div class="section" aria-label="价格与订阅">
            <h4>价格与订阅</h4>
            ${pricing}
          </div>
          <div class="section" aria-label="权限清单">
            <h4>权限清单（可审计）</h4>
            ${permMatrix}
          </div>
        `;

        openOverlay();
        $$("#detailDrawer").dataset.open = "true";
      }

      function renderPricing(agent){
        const base = agent.pricing;
        if (base.model === "按席位"){
          const annual = Math.round(base.price * 12 * (base.annualDiscount || 0.88));
          return `
            <div class="kv">
              <div class="row"><span class="k">计费方式</span><span class="v">${escapeHtml(base.model)}</span></div>
              <div class="row"><span class="k">月付</span><span class="v mono">${moneyCNY(base.price)} / 席位</span></div>
              <div class="row"><span class="k">年付（折扣后）</span><span class="v mono">${moneyCNY(annual)} / 席位 / 年</span></div>
              <div class="row"><span class="k">最小采购</span><span class="v">10 席位（可改）</span></div>
            </div>
            <div style="height:10px"></div>
            <div class="seg" aria-label="订阅选项">\n              <button class=\"btn\" type=\"button\" data-term=\"月付\" aria-pressed=\"true\">月付</button>\n              <button class=\"btn\" type=\"button\" data-term=\"年付\" aria-pressed=\"false\">年付</button>\n            </div>
            <div style="height:10px"></div>
            <div class="field">\n              <label for=\"seats\">席位数</label>\n              <input class=\"input mono\" id=\"seats\" type=\"number\" min=\"1\" value=\"10\" />\n              <div class=\"err\">席位数至少为 1</div>\n            </div>
          `.trim();
        }
        return `
          <div class="kv">
            <div class="row"><span class="k">计费方式</span><span class="v">${escapeHtml(base.model)}</span></div>
            <div class="row"><span class="k">单价</span><span class="v mono">${moneyCNY(base.price)} ${escapeHtml(base.unit)}</span></div>
            <div class="row"><span class="k">最低用量</span><span class="v mono">${moneyCNY(base.min || 0)} / 月</span></div>
          </div>
          <div style="height:10px"></div>
          <div class="field">\n            <label for=\"usage\">预计月用量（页/资源小时）</label>\n            <input class=\"input mono\" id=\"usage\" type=\"number\" min=\"1\" value=\"5000\" />\n            <div class=\"err\">用量至少为 1</div>\n          </div>
        `.trim();
      }

      function renderPermissionMatrix(agent){
        return `
          <div class="kv">
            ${agent.permissions.map((p) => `
              <div class="row">
                <span class="k mono">${escapeHtml(p)}</span>
                <span class="v">
                  <span class="tag ${p.includes("写入") ? "tag--danger" : "tag--success"}">
                    ${p.includes("写入") ? "写入" : "只读"}
                  </span>
                </span>
              </div>
            `).join("")}
            <div class="row">
              <span class="k">审计记录</span>
              <span class="v">保留 180 天 · 可导出</span>
            </div>
          </div>
        `.trim();
      }

      function cartCount(){
        let n = 0;
        for (const [, item] of state.cart) n += (item.qty || 1);
        return n;
      }

      function cartTotal(){
        let total = 0;
        for (const [id, item] of state.cart){
          const agent = DATA.find(a => a.id === id);
          if (!agent) continue;
          if (agent.pricing.model === "按席位"){
            const seats = clamp(Number(item.seats || 10) || 10, 1, 9999);
            const annual = item.term === "年付";
            const unit = annual
              ? Math.round(agent.pricing.price * 12 * (agent.pricing.annualDiscount || 0.88))
              : agent.pricing.price;
            total += unit * seats;
          } else if (agent.pricing.model === "按用量"){
            const usage = clamp(Number(item.usage || 5000) || 5000, 1, 1e9);
            const monthly = Math.max(agent.pricing.min || 0, usage * agent.pricing.price);
            total += monthly;
          } else {
            total += agent.pricing.price;
          }
        }
        return total;
      }

      function renderCart(){
        const items = Array.from(state.cart.entries()).map(([id, cfg]) => {
          const agent = DATA.find(a => a.id === id);
          if (!agent) return "";
          const isSeat = agent.pricing.model === "按席位";
          const seats = clamp(Number(cfg.seats || 10) || 10, 1, 9999);
          const usage = clamp(Number(cfg.usage || 5000) || 5000, 1, 1e9);
          const term = cfg.term || "年付";
          const unit = isSeat
            ? (term === "年付"
                ? Math.round(agent.pricing.price * 12 * (agent.pricing.annualDiscount || 0.88))
                : agent.pricing.price)
            : agent.pricing.price;
          const line = isSeat ? unit * seats : Math.max(agent.pricing.min || 0, usage * unit);
          return `
            <div class="section">
              <div style="display:flex; justify-content:space-between; gap: 10px; align-items:flex-start;">
                <div>
                  <div style="font-weight:650; letter-spacing:-0.01em;">${escapeHtml(agent.name)}</div>
                  <div class="small muted">${escapeHtml(agent.vendor)} · ${escapeHtml(agent.pricing.model)}</div>
                </div>
                <button class="btn btn--ghost" type="button" data-remove="${escapeAttr(id)}">移除</button>
              </div>
              <div style="height:10px"></div>
              <div class="kv">
                ${isSeat ? `
                  <div class="row"><span class="k">订阅</span><span class="v">${escapeHtml(term)} · ${escapeHtml(agent.pricing.unit)}</span></div>
                  <div class="row"><span class="k">席位数</span><span class="v"><input class="input mono" style="width:120px" type="number" min="1" value="${seats}" data-seats="${escapeAttr(id)}" /></span></div>
                ` : `
                  <div class="row"><span class="k">单价</span><span class="v mono">${moneyCNY(unit)} ${escapeHtml(agent.pricing.unit)}</span></div>
                  <div class="row"><span class="k">预计月用量</span><span class="v"><input class="input mono" style="width:160px" type="number" min="1" value="${usage}" data-usage="${escapeAttr(id)}" /></span></div>
                `}
                <div class="row"><span class="k">小计</span><span class="v mono">${moneyCNY(line)}</span></div>
              </div>
            </div>
          `.trim();
        }).join("");

        const count = cartCount();
        $$("#cartSummary").textContent = `${count} 项`;
        $$("#cartTotal").textContent = moneyCNY(cartTotal());
        $$("#btnCheckout").disabled = count === 0;

        $$("#cartBody").innerHTML = items || `
          <div class="empty">
            <strong>购物车为空</strong>
            <p>从列表打开详情，选择订阅方式与席位/用量后加入购物车。</p>
          </div>
        `;

        $$$("[data-remove]").forEach(btn => btn.addEventListener("click", () => {
          state.cart.delete(btn.getAttribute("data-remove"));
          syncCartUI();
        }));
        $$$("[data-seats]").forEach(inp => inp.addEventListener("input", () => {
          const id = inp.getAttribute("data-seats");
          const item = state.cart.get(id);
          if (!item) return;
          item.seats = clamp(Number(inp.value || 1), 1, 9999);
          syncCartUI(false);
        }));
        $$$("[data-usage]").forEach(inp => inp.addEventListener("input", () => {
          const id = inp.getAttribute("data-usage");
          const item = state.cart.get(id);
          if (!item) return;
          item.usage = clamp(Number(inp.value || 1), 1, 1e9);
          syncCartUI(false);
        }));
      }

      function syncCartUI(rerender=true){
        const n = cartCount();
        $$("#cartCount").textContent = String(n);
        $$("#cartCount2").textContent = String(n);
        if (rerender) renderCart();
        else {
          $$("#cartTotal").textContent = moneyCNY(cartTotal());
          $$("#cartSummary").textContent = `${n} 项`;
        }
      }

      function openCart(){
        renderCart();
        openOverlay();
        $$("#detailDrawer").dataset.open = "false";
        $$("#checkoutDrawer").dataset.open = "false";
        $$("#cartDrawer").dataset.open = "true";
      }

      function addToCartFromDetail(){
        const id = state.detailId;
        const agent = DATA.find(a => a.id === id);
        if (!agent) return;
        const item = state.cart.get(id) || { qty: 1, seats: 10, term: "年付", usage: 5000 };
        if (agent.pricing.model === "按席位"){
          const termBtn = $$$('[data-term]', $$("#detailBody")).find(b => b.getAttribute("aria-pressed") === "true");
          item.term = termBtn ? termBtn.getAttribute("data-term") : "月付";
          const seats = $$("#seats", $$("#detailBody"));
          item.seats = clamp(Number(seats?.value || 10), 1, 9999);
        } else if (agent.pricing.model === "按用量"){
          const usage = $$("#usage", $$("#detailBody"));
          item.usage = clamp(Number(usage?.value || 5000), 1, 1e9);
        }
        state.cart.set(id, item);
        syncCartUI();
        // move user to cart, since procurement flow is the point
        $$("#detailDrawer").dataset.open = "false";
        openCart();
      }

      function wireDetailControls(){
        $$("#detailBody").addEventListener("click", (e) => {
          const btn = e.target.closest("[data-term]");
          if (!btn) return;
          const term = btn.getAttribute("data-term");
          $$$("[data-term]", $$("#detailBody")).forEach(b => b.setAttribute("aria-pressed", String(b === btn)));
          if (term === "年付") state.checkout.term = "年付";
        });
      }

      function openCheckout(){
        if (cartCount() === 0) return;
        state.checkoutStep = state.signedIn ? 2 : 1;
        renderCheckout();
        openOverlay();
        $$("#detailDrawer").dataset.open = "false";
        $$("#cartDrawer").dataset.open = "false";
        $$("#checkoutDrawer").dataset.open = "true";
      }

      function renderCheckout(){
        const s = state.checkoutStep;
        setStepUI(s);

        const total = moneyCNY(cartTotal());
        $$("#checkoutHint").textContent = `合计 ${total} · 可编辑 PO/发票信息（原型）`;
        $$("#btnCheckoutBack").disabled = s === 1;
        $$("#btnCheckoutNext").textContent = s === 3 ? "提交订单" : "下一步";

        if (s === 1){
          $$("#checkoutBody").innerHTML = `
            <div class="section">
              <h4>账号（用于交付与权限管理）</h4>
              <div class="field" data-field="email">
                <label for="email">企业邮箱</label>
                <input class="input" id="email" type="email" placeholder="name@company.com" value="${escapeAttr(state.checkout.email)}" />
                <div class="err">请输入有效邮箱</div>
              </div>
              <div style="height:10px"></div>
              <div class="field" data-field="company">
                <label for="company">公司名称</label>
                <input class="input" id="company" type="text" placeholder="例如：某某科技有限公司" value="${escapeAttr(state.checkout.company)}" />
                <div class="err">请填写公司名称</div>
              </div>
              <div style="height:12px"></div>
              <button class="btn btn--primary" id="btnDoSignIn" type="button">登录并继续</button>
              <div class="small muted" style="margin-top:10px">说明：这是原型，不会实际发送验证码。</div>
            </div>
          `;
          $$("#btnDoSignIn").addEventListener("click", () => {
            const ok = validateCheckoutStep1();
            if (!ok) return;
            state.signedIn = true;
            state.checkoutStep = 2;
            renderCheckout();
            $$("#btnSignIn").textContent = "已登录";
          });
          return;
        }

        if (s === 2){
          $$("#checkoutBody").innerHTML = `
            <div class="section">
              <h4>付款与订阅</h4>
              <div class="kv">
                <div class="row"><span class="k">支付方式</span><span class="v">
                  <span class="seg" style="justify-content:flex-end">
                    <button class="btn" type="button" data-pay="PO" aria-pressed="${state.checkout.payment === "PO"}">PO</button>
                    <button class="btn" type="button" data-pay="银行卡" aria-pressed="${state.checkout.payment === "银行卡"}">银行卡</button>
                    <button class="btn" type="button" data-pay="对公转账" aria-pressed="${state.checkout.payment === "对公转账"}">对公转账</button>
                  </span>
                </span></div>
                <div class="row"><span class="k">订阅周期</span><span class="v">
                  <span class="seg" style="justify-content:flex-end">
                    <button class="btn" type="button" data-term2="月付" aria-pressed="${state.checkout.term === "月付"}">月付</button>
                    <button class="btn" type="button" data-term2="年付" aria-pressed="${state.checkout.term === "年付"}">年付</button>
                  </span>
                </span></div>
              </div>
              <div style="height:10px"></div>
              <div class="field" data-field="poNumber" ${state.checkout.payment === "PO" ? "" : "hidden"}>
                <label for="poNumber">PO 编号</label>
                <input class="input mono" id="poNumber" type="text" placeholder="PO-2026-000128" value="${escapeAttr(state.checkout.poNumber)}" />
                <div class="err">PO 编号必填（选择 PO 时）</div>
              </div>
              <div style="height:12px"></div>
              <div class="kv">
                <div class="row"><span class="k">合计</span><span class="v mono">${total}</span></div>
                <div class="row"><span class="k">交付</span><span class="v">管理员控制台 · 可分配席位</span></div>
              </div>
            </div>
          `;

          $$("#checkoutBody").addEventListener("click", (e) => {
            const pay = e.target.closest("[data-pay]")?.getAttribute("data-pay");
            const term = e.target.closest("[data-term2]")?.getAttribute("data-term2");
            if (pay){
              state.checkout.payment = pay;
              renderCheckout();
            }
            if (term){
              state.checkout.term = term;
              renderCheckout();
            }
          });
          return;
        }

        // Step 3
        $$("#checkoutBody").innerHTML = `
          <div class="section">
            <h4>发票信息</h4>
            <div class="kv">
              <div class="row"><span class="k">发票类型</span><span class="v">
                <span class="seg" style="justify-content:flex-end">
                  <button class="btn" type="button" data-inv="增值税专票" aria-pressed="${state.checkout.invoiceType === "增值税专票"}">专票</button>
                  <button class="btn" type="button" data-inv="增值税普票" aria-pressed="${state.checkout.invoiceType === "增值税普票"}">普票</button>
                </span>
              </span></div>
            </div>
            <div style="height:10px"></div>
            <div class="field" data-field="taxId">
              <label for="taxId">纳税人识别号</label>
              <input class="input mono" id="taxId" type="text" placeholder="9131XXXXXXXXXXXXXX" value="${escapeAttr(state.checkout.taxId)}" />
              <div class="err">纳税人识别号必填</div>
            </div>
            <div style="height:10px"></div>
            <div class="field" data-field="address">
              <label for="address">开票地址（收件信息）</label>
              <textarea class="textarea" id="address" placeholder="省市区 + 详细地址" rows="3">${escapeHtml(state.checkout.address)}</textarea>
              <div class="err">请填写地址</div>
            </div>
            <div style="height:10px"></div>
            <div class="field" data-field="receiver">
              <label for="receiver">收件人 / 电话</label>
              <input class="input" id="receiver" type="text" placeholder="张三 13800000000" value="${escapeAttr(state.checkout.receiver)}" />
              <div class="err">请填写收件信息</div>
            </div>
            <div style="height:12px"></div>
            <div class="kv">
              <div class="row"><span class="k">订单合计</span><span class="v mono">${total}</span></div>
              <div class="row"><span class="k">付款方式</span><span class="v">${escapeHtml(state.checkout.payment)}</span></div>
              <div class="row"><span class="k">订阅周期</span><span class="v">${escapeHtml(state.checkout.term)}</span></div>
            </div>
          </div>
        `;

        $$("#checkoutBody").addEventListener("click", (e) => {
          const inv = e.target.closest("[data-inv]")?.getAttribute("data-inv");
          if (!inv) return;
          state.checkout.invoiceType = inv;
          renderCheckout();
        });
      }

      function setStepUI(step){
        [$$("#step1"), $$("#step2"), $$("#step3")].forEach((el, i) => {
          el.dataset.active = String(i+1 === step);
        });
      }

      function validateCheckoutStep1(){
        const email = $$("#email")?.value?.trim() || "";
        const company = $$("#company")?.value?.trim() || "";
        state.checkout.email = email;
        state.checkout.company = company;
        const okEmail = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email);
        const okCompany = company.length >= 2;
        setFieldError("email", !okEmail);
        setFieldError("company", !okCompany);
        return okEmail && okCompany;
      }

      function validateCheckoutStep2(){
        state.checkout.poNumber = $$("#poNumber")?.value?.trim() || state.checkout.poNumber;
        const needsPO = state.checkout.payment === "PO";
        const okPO = !needsPO || (state.checkout.poNumber.trim().length >= 3);
        setFieldError("poNumber", !okPO);
        return okPO;
      }

      function validateCheckoutStep3(){
        state.checkout.taxId = $$("#taxId")?.value?.trim() || "";
        state.checkout.address = $$("#address")?.value?.trim() || "";
        state.checkout.receiver = $$("#receiver")?.value?.trim() || "";
        const okTax = state.checkout.taxId.length >= 10;
        const okAddr = state.checkout.address.length >= 6;
        const okRecv = state.checkout.receiver.length >= 6;
        setFieldError("taxId", !okTax);
        setFieldError("address", !okAddr);
        setFieldError("receiver", !okRecv);
        return okTax && okAddr && okRecv;
      }

      function setFieldError(fieldKey, isError){
        const el = $$(`[data-field="${fieldKey}"]`);
        if (!el) return;
        el.dataset.error = isError ? "true" : "false";
      }

      function submitOrder(){
        // Acknowledge as prototype
        $$("#checkoutBody").innerHTML = `
          <div class="section">
            <h4>已提交（原型）</h4>
            <div class="kv">
              <div class="row"><span class="k">公司</span><span class="v">${escapeHtml(state.checkout.company || "—")}</span></div>
              <div class="row"><span class="k">邮箱</span><span class="v">${escapeHtml(state.checkout.email || "—")}</span></div>
              <div class="row"><span class="k">支付</span><span class="v">${escapeHtml(state.checkout.payment)}</span></div>
              <div class="row"><span class="k">发票</span><span class="v">${escapeHtml(state.checkout.invoiceType)}</span></div>
              <div class="row"><span class="k">合计</span><span class="v mono">${moneyCNY(cartTotal())}</span></div>
            </div>
            <div style="height:12px"></div>
            <div class="tag tag--success">下一步：管理员审批 → 生成合同/PO → 开通席位与审计策略（示例）</div>
          </div>
        `;
        $$("#btnCheckoutNext").disabled = true;
        $$("#btnCheckoutBack").disabled = true;
        $$("#checkoutHint").textContent = "已提交：你可以关闭抽屉继续浏览。";
      }

      function bindEvents(){
        // Search
        const q = $$("#q");
        q.addEventListener("input", () => { state.q = q.value; refresh(); });

        // Keyboard shortcut
        document.addEventListener("keydown", (e) => {
          if (e.key === "/" && !["INPUT","TEXTAREA"].includes(document.activeElement?.tagName || "")) {
            e.preventDefault(); q.focus();
          }
          if (e.key === "Escape" && anyDrawerOpen()) closeAllDrawers();
        });

        // Sort
        $$("#sort").addEventListener("change", (e) => { state.sort = e.target.value; renderResults(); });

        // Facets change
        document.addEventListener("change", (e) => {
          const cb = e.target.closest("input[type=\"checkbox\"][data-facet]");
          if (!cb) return;
          const key = cb.getAttribute("data-facet");
          const val = cb.value;
          const set = state.facets[key];
          if (!set) return;
          if (cb.checked) set.add(val); else set.delete(val);
          refresh();
        });

        // Clear
        $$("#btnClear").addEventListener("click", () => {
          state.q = "";
          q.value = "";
          for (const set of Object.values(state.facets)) set.clear();
          $$$("input[type=\"checkbox\"][data-facet]").forEach(cb => cb.checked = false);
          refresh();
        });

        // Open detail by click
        $$("#results").addEventListener("click", (e) => {
          const card = e.target.closest("[data-open-detail]");
          if (!card) return;
          openDetail(card.getAttribute("data-open-detail"));
          wireDetailControls();
        });

        // Drawers
        $$("#btnDetailClose").addEventListener("click", closeAllDrawers);
        $$("#btnCartClose").addEventListener("click", closeAllDrawers);
        $$("#btnCheckoutClose").addEventListener("click", closeAllDrawers);
        $$("#overlay").addEventListener("click", closeAllDrawers);

        $$("#btnCart").addEventListener("click", () => { openCart(); });
        $$("#btnCartMobile").addEventListener("click", () => { openCart(); });

        $$("#btnAddToCart").addEventListener("click", () => {
          // In mobile filter sheet we reuse the detail drawer; no "add to cart" there.
          if (!state.detailId) { closeAllDrawers(); return; }
          addToCartFromDetail();
        });

        $$("#btnCheckout").addEventListener("click", () => { $$("#cartDrawer").dataset.open = "false"; openCheckout(); });

        $$("#btnCheckoutBack").addEventListener("click", () => {
          state.checkoutStep = clamp(state.checkoutStep - 1, 1, 3);
          renderCheckout();
        });
        $$("#btnCheckoutNext").addEventListener("click", () => {
          if (state.checkoutStep === 1){
            if (!validateCheckoutStep1()) return;
            state.signedIn = true;
            state.checkoutStep = 2;
            $$("#btnSignIn").textContent = "已登录";
            renderCheckout();
            return;
          }
          if (state.checkoutStep === 2){
            if (!validateCheckoutStep2()) return;
            state.checkoutStep = 3;
            renderCheckout();
            return;
          }
          if (state.checkoutStep === 3){
            if (!validateCheckoutStep3()) return;
            submitOrder();
          }
        });

        // Filters mobile opens cart drawer reused as filter sheet? We'll use detail drawer? Better: open a lightweight overlay modal built on checkoutDrawer? We'll repurpose detail drawer content for mobile filter sheet.
        const openMobileFilters = () => openFilterSheet();
        $$("#btnFiltersMobile").addEventListener("click", openMobileFilters);
        $$("#btnFiltersMobile2").addEventListener("click", openMobileFilters);

        // Sign in toggles
        $$("#btnSignIn").addEventListener("click", () => {
          state.signedIn = !state.signedIn;
          $$("#btnSignIn").textContent = state.signedIn ? "已登录" : "登录";
        });
      }

      function openFilterSheet(){
        // Render a compact filter+sort sheet into the detail drawer for mobile.
        state.detailId = null;
        $$("#detailTitle").textContent = "筛选与排序";
        $$("#detailSubtitle").textContent = "移动端 · 选择后即时生效";
        $$("#detailPrice").textContent = "";
        $$("#detailUnit").textContent = "";
        $$("#btnAddToCart").textContent = "完成";

        const opts = deriveOptions();
        const sheet = (title, key, items) => `
          <div class="section">
            <h4>${escapeHtml(title)}</h4>
            <div class="checks">
              ${items.map(v => `
                <label class="check">
                  <input type="checkbox" data-facet="${escapeAttr(key)}" value="${escapeAttr(v)}" ${state.facets[key].has(v) ? "checked" : ""} />
                  <span class="meta"><span>${escapeHtml(v)}</span></span>
                </label>
              `).join("")}
            </div>
          </div>
        `;

        $$("#detailBody").innerHTML = `
          <div class="section">
            <h4>排序</h4>
            <select class="select" id="sortMobile" style="width:100%">
              <option value="relevance" ${state.sort==="relevance"?"selected":""}>相关度</option>
              <option value="price_asc" ${state.sort==="price_asc"?"selected":""}>价格：低→高</option>
              <option value="price_desc" ${state.sort==="price_desc"?"selected":""}>价格：高→低</option>
              <option value="adoption_desc" ${state.sort==="adoption_desc"?"selected":""}>采用量：高→低</option>
              <option value="new_desc" ${state.sort==="new_desc"?"selected":""}>上新：最近</option>
            </select>
            <div style="height:10px"></div>
            <button class="btn" type="button" id="btnClearMobile">清空筛选</button>
          </div>
          ${sheet("行业", "industry", opts.industries)}
          ${sheet("任务", "task", opts.tasks)}
          ${sheet("合规", "compliance", opts.comps)}
          ${sheet("部署", "deploy", opts.deploys)}
          ${sheet("计费", "pricingModel", opts.pricingModels)}
        `;

        $$("#sortMobile").addEventListener("change", (e) => { state.sort = e.target.value; renderResults(); });
        $$("#btnClearMobile").addEventListener("click", () => {
          for (const set of Object.values(state.facets)) set.clear();
          state.q = "";
          $$("#q").value = "";
          refresh();
          openFilterSheet(); // rerender
        });

        openOverlay();
        $$("#detailDrawer").dataset.open = "true";

        // “完成” is handled by the shared footer button listener.
      }

      function initFacets(){
        const opts = deriveOptions();
        renderFacet(FACETS.industry.el, opts.industries, "industry");
        renderFacet(FACETS.task.el, opts.tasks, "task");
        renderFacet(FACETS.compliance.el, opts.comps, "compliance");
        renderFacet(FACETS.deploy.el, opts.deploys, "deploy");
        renderFacet(FACETS.pricingModel.el, opts.pricingModels, "pricingModel");
        renderFacet(FACETS.permissions.el, opts.perms.slice(0, 10), "permissions");
      }

      function refresh(){
        renderResults();
        countMatchesPerOption();
      }

      function main(){
        initFacets();
        bindEvents();
        refresh();
        syncCartUI(false);
      }

      main();
    