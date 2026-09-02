/* ==========================================================================
   KALDY DIGITAL — LP EMPRESAS
   Script Principal de Alta Conversão e Interatividade B2B
   ========================================================================== */

// 1. Configurações Globais
const WHATSAPP_NUMBER = "5511999382989";
const DEFAULT_WHATSAPP_TEXT = "Olá! Conheci a Kaldy Digital pelo site empresarial e gostaria de receber uma proposta para minha empresa.";

// Atualiza links padrão com a mensagem inicial
document.querySelectorAll(".whatsappDirectLink").forEach(link => {
  link.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(DEFAULT_WHATSAPP_TEXT)}`;
  link.setAttribute("target", "_blank");
  link.setAttribute("rel", "noopener");
});

// 2. Navbar Scrolled State
const nav = document.querySelector(".nav");
if (nav) {
  window.addEventListener("scroll", () => {
    nav.classList.toggle("scrolled", window.scrollY > 30);
  }, { passive: true });
}

// 3. Efeito Typewriter Unificado B2B (Sem conflito)
const typewriterWords = [
  "Engajamento.",
  "Posicionamento.",
  "Crescimento.",
  "Faturamento.",
  "Autoridade."
];
let wordIdx = 0;
let letterIdx = 0;
let isDeleting = false;
const typewriterElem = document.getElementById("typewriter");

function typeStep() {
  if (!typewriterElem) return;
  const currentWord = typewriterWords[wordIdx];

  if (isDeleting) {
    typewriterElem.textContent = currentWord.substring(0, letterIdx - 1);
    letterIdx--;
  } else {
    typewriterElem.textContent = currentWord.substring(0, letterIdx + 1);
    letterIdx++;
  }

  let speed = isDeleting ? 45 : 95;

  if (!isDeleting && letterIdx === currentWord.length) {
    speed = 2000; // pausa no fim da palavra
    isDeleting = true;
  } else if (isDeleting && letterIdx === 0) {
    isDeleting = false;
    wordIdx = (wordIdx + 1) % typewriterWords.length;
    speed = 400; // pausa antes de começar a próxima
  }

  setTimeout(typeStep, speed);
}

// Inicia o typewriter apenas após o carregamento do DOM
if (typewriterElem) {
  typeStep();
}

// 4. Carrossel de Depoimentos Instagram (Tomadores de Decisão)
const testimonialsData = [
  {
    user: "dra.camilarocha",
    name: "Dra. Camila Rocha",
    role: "Diretora Clínica • Medicina Integrativa",
    time: "2 d",
    likes: 64,
    avatar: "CR",
    avatarBg: "linear-gradient(135deg, #a64c58, #590A16)",
    text: "A Kaldy Digital transformou totalmente a presença da nossa clínica. As captações no consultório com iluminação de cinema passaram uma autoridade que nunca tivemos antes. A facilidade de aprovar tudo no portal em 1 clique é sensacional! 👏🩺",
    reply: {
      user: "kaldydigital",
      time: "1 d",
      likes: 22,
      text: "Muito obrigado pela confiança, Dra. Camila! É uma honra construir a autoridade e o posicionamento da sua clínica 🎯✨"
    }
  },
  {
    user: "marcelo.silva.adv",
    name: "Dr. Marcelo Silva",
    role: "Sócio Fundador • Advocacia Corporativa",
    time: "4 d",
    likes: 58,
    avatar: "MS",
    avatarBg: "linear-gradient(135deg, #1b2838, #590A16)",
    text: "A transparência e velocidade da equipe é surreal. Saímos do zero no audiovisual para carrosséis de alto nível e Reels que geram novos contratos B2B todo mês. Os relatórios mensais mostram o ROI com muita clareza! ⚖️🚀",
    reply: {
      user: "kaldydigital",
      time: "3 d",
      likes: 19,
      text: "Foco em elegância e resultados reais sempre! Pra cima, Marcelo 👊"
    }
  },
  {
    user: "lucas.carvalho.bistro",
    name: "Lucas Carvalho",
    role: "Proprietário • Bistrô & Restaurante",
    time: "1 sem",
    likes: 82,
    avatar: "LC",
    avatarBg: "linear-gradient(135deg, #c45b23, #590A16)",
    text: "Pontualidade britânica, qualidade de cinema nas gravações dos pratos e atendimento extremamente ágil. Nossas reservas aos finais de semana dobraram depois que a Kaldy assumiu a gestão. Recomendo de olhos fechados! 🍷🔥",
    reply: {
      user: "kaldydigital",
      time: "6 d",
      likes: 31,
      text: "Tamo junto, Lucas! O audiovisual do bistrô está em outro patamar de desejo 🎬🍽️"
    }
  }
];

const testimonialTrack = document.getElementById("testimonialTrack");
const testimonialDots = document.getElementById("testimonialDots");
const testimonialCount = document.getElementById("testimonialCount");
let testimonialIndex = 0;
let autoAdvanceTimer = null;

if (testimonialTrack) {
  testimonialsData.forEach((c, i) => {
    testimonialTrack.insertAdjacentHTML("beforeend", `
      <div class="commentSlide">
        <div class="instaCommentCard">
          <div class="instaCardHeader">
            <div class="instaGrabBar"></div>
            <div class="instaHeaderTitle">
              <svg class="instaIconMini" viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
              <span>Depoimento Verificado</span>
              <span class="instaVerifiedDot">•</span>
              <span class="instaSubtitle">${c.role}</span>
            </div>
          </div>

          <div class="instaCommentsList">
            <!-- Comentário do Cliente -->
            <div class="instaCommentRow">
              <div class="instaAvatarRing">
                <div class="instaAvatar" style="background: ${c.avatarBg}">${c.avatar}</div>
              </div>
              <div class="instaCommentContent">
                <div class="instaCommentBubble">
                  <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:4px;">
                    <span class="instaUser">${c.user}</span>
                    <span style="font-size:11px; color:#e09a32; letter-spacing:1px;">★★★★★</span>
                  </div>
                  <span class="instaText">${c.text}</span>
                </div>
                <div class="instaCommentMeta">
                  <span class="instaTime">${c.time}</span>
                  <span class="instaActionBtn">Curtir</span>
                  <span class="instaActionBtn">Responder</span>
                </div>
              </div>
              <div class="instaLikeBox">
                <svg viewBox="0 0 24 24" width="14" height="14" fill="#ff3040" stroke="#ff3040">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
                <span>${c.likes}</span>
              </div>
            </div>

            <!-- Resposta Oficial Kaldy Digital -->
            <div class="instaCommentRow is-reply">
              <div class="instaAvatarRing kaldyRing">
                <img class="instaAvatarImg" src="logo-kaldy.png" alt="Kaldy Digital" onerror="this.src='https://kaldy-digital-preview.hugo0412victor.chatgpt.site/kaldy-preview/assets/logo-kaldy.png'">
              </div>
              <div class="instaCommentContent">
                <div class="instaCommentBubble">
                  <span class="instaUser">kaldydigital 
                    <svg class="instaVerifiedBadge" viewBox="0 0 24 24" width="11" height="11">
                      <circle cx="12" cy="12" r="10" fill="#0095f6"/>
                      <path d="M9 12l2 2 4-4" fill="none" stroke="#fff" stroke-width="2.5" stroke-linecap="round"/>
                    </svg>
                    <small class="instaAuthorBadge">Agência</small>
                  </span>
                  <span class="instaText"><b class="instaMention">@${c.user}</b> ${c.reply.text}</span>
                </div>
                <div class="instaCommentMeta">
                  <span class="instaTime">${c.reply.time}</span>
                  <span class="instaActionBtn">Curtir</span>
                </div>
              </div>
              <div class="instaLikeBox">
                <svg viewBox="0 0 24 24" width="14" height="14" fill="#ff3040" stroke="#ff3040">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
                <span>${c.reply.likes}</span>
              </div>
            </div>
          </div>

          <div class="instaBottomBar">
            <div class="instaBottomInput">
              <img src="logo-kaldy.png" class="instaMiniAvatar" alt="" onerror="this.src='https://kaldy-digital-preview.hugo0412victor.chatgpt.site/kaldy-preview/assets/logo-kaldy.png'">
              <span>Envie uma mensagem para a Kaldy...</span>
            </div>
            <div class="instaBottomEmojis">
              <span>❤️</span>
              <span>👏</span>
              <span>🔥</span>
            </div>
          </div>
        </div>
      </div>
    `);

    if (testimonialDots) {
      const dot = document.createElement("button");
      dot.setAttribute("aria-label", `Ver depoimento ${i + 1}`);
      dot.addEventListener("click", () => {
        showTestimonial(i);
        restartAutoAdvance();
      });
      testimonialDots.append(dot);
    }
  });

  function showTestimonial(index) {
    testimonialIndex = (index + testimonialsData.length) % testimonialsData.length;
    testimonialTrack.style.transform = `translateX(-${testimonialIndex * 100}%)`;
    
    if (testimonialDots) {
      [...testimonialDots.children].forEach((dot, i) => {
        dot.classList.toggle("active", i === testimonialIndex);
      });
    }

    if (testimonialCount) {
      testimonialCount.textContent = `${String(testimonialIndex + 1).padStart(2, "0")} / ${String(testimonialsData.length).padStart(2, "0")}`;
    }
  }

  const prevBtn = document.getElementById("testimonialPrev");
  const nextBtn = document.getElementById("testimonialNext");

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      showTestimonial(testimonialIndex - 1);
      restartAutoAdvance();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      showTestimonial(testimonialIndex + 1);
      restartAutoAdvance();
    });
  }

  function restartAutoAdvance() {
    if (autoAdvanceTimer) clearInterval(autoAdvanceTimer);
    autoAdvanceTimer = setInterval(() => showTestimonial(testimonialIndex + 1), 4800);
  }

  showTestimonial(0);
  restartAutoAdvance();
}

// 5. Filtro de Abas do Portfólio B2B
window.filterPortfolio = function(category, tabBtn) {
  const cards = document.querySelectorAll(".portfolioCard");
  const tabs = document.querySelectorAll(".portfolioTab");

  tabs.forEach(t => t.classList.remove("active"));
  if (tabBtn) tabBtn.classList.add("active");

  cards.forEach(card => {
    const cardCat = card.getAttribute("data-category");
    if (category === "all" || cardCat === category) {
      card.style.display = "flex";
      setTimeout(() => {
        card.style.opacity = "1";
        card.style.transform = "translateY(0)";
      }, 50);
    } else {
      card.style.opacity = "0";
      card.style.transform = "translateY(12px)";
      setTimeout(() => {
        card.style.display = "none";
      }, 250);
    }
  });
};

// 6. FAQ Accordion Interativo
window.toggleFaq = function(button) {
  const item = button.closest(".faqItem");
  if (!item) return;
  const wasOpen = item.classList.contains("open");
  
  document.querySelectorAll(".faqItem").forEach(i => i.classList.remove("open"));
  
  if (!wasOpen) {
    item.classList.add("open");
  }
};

// 7. Modal de Orçamento B2B & Seleção de Plano
window.openQuoteModal = function(e, preselectedPlan = "") {
  if (e && e.preventDefault) e.preventDefault();
  const modal = document.getElementById("quoteModal");
  if (!modal) return;

  if (preselectedPlan) {
    const select = document.getElementById("formPlano");
    if (select) select.value = preselectedPlan;
  }

  modal.classList.add("active");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
};

window.closeQuoteModal = function() {
  const modal = document.getElementById("quoteModal");
  if (!modal) return;
  modal.classList.remove("active");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
};

window.addEventListener("click", (e) => {
  const modal = document.getElementById("quoteModal");
  if (e.target === modal) closeQuoteModal();
});

window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeQuoteModal();
});

// 8. Máscara de Telefone Inteligente
window.maskPhone = function(input) {
  let v = input.value.replace(/\D/g, "");
  if (v.length > 11) v = v.slice(0, 11);
  if (v.length > 10) {
    v = v.replace(/^(\d\d)(\d{5})(\d{4})$/, "($1) $2-$3");
  } else if (v.length > 6) {
    v = v.replace(/^(\d\d)(\d{4})(\d{0,4})$/, "($1) $2-$3");
  } else if (v.length > 2) {
    v = v.replace(/^(\d\d)(\d{0,5})$/, "($1) $2");
  } else {
    v = v.replace(/^(\d*)$/, "$1");
  }
  input.value = v;
};

// 9. Envio Qualificado para WhatsApp B2B
window.handleQuoteSubmit = function(e) {
  e.preventDefault();
  const form = document.getElementById("quoteForm");
  if (!form) return;

  const nome = form.nome ? form.nome.value.trim() : "";
  const phone = form.telefone ? form.telefone.value.trim() : "";
  const email = form.email ? form.email.value.trim() : "";
  const plano = form.plano ? form.plano.value : "Não especificado";
  const tipoEmpresa = form.tipo_empresa ? form.tipo_empresa.value.trim() : "";
  const instaEmpresa = form.instagram_empresa ? form.instagram_empresa.value.trim() : "";
  const endereco = form.endereco_empresa ? form.endereco_empresa.value.trim() : "";
  const necessidade = form.necessidade ? form.necessidade.value.trim() : "";

  let msg = "🏛️ *SOLICITAÇÃO DE ORÇAMENTO EMPRESARIAL*\n";
  msg += "*Kaldy Digital — Gestão & Audiovisual*\n\n";
  msg += `👤 *Nome:* ${nome}\n`;
  msg += `📱 *WhatsApp:* ${phone}\n`;
  msg += `✉️ *E-mail:* ${email}\n`;
  msg += `🎯 *Plano de Interesse:* ${plano}\n`;
  msg += `🏢 *Segmento / Empresa:* ${tipoEmpresa}\n`;
  msg += `📸 *Instagram:* ${instaEmpresa}\n`;
  if (endereco) msg += `📍 *Localização:* ${endereco}\n`;
  if (necessidade) msg += `📝 *Necessidade:* ${necessidade}\n\n`;
  msg += "— Enviado via Landing Page Empresarial da Kaldy Digital";

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
  window.open(whatsappUrl, "_blank");
  
  closeQuoteModal();
  form.reset();
};

// 10. Sticky Mobile CTA Bar
const stickyMobileBar = document.getElementById("stickyMobileBar");
if (stickyMobileBar) {
  window.addEventListener("scroll", () => {
    if (window.scrollY > 450) {
      stickyMobileBar.classList.add("visible");
    } else {
      stickyMobileBar.classList.remove("visible");
    }
  }, { passive: true });
}
