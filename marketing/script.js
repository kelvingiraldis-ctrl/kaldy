const WHATSAPP_NUMBER = "5511945367699"; // Número oficial de atendimento com DDI + DDD
const WHATSAPP_TEXT = "Olá! Conheci a Kaldy pelo site e gostaria de solicitar um diagnóstico estratégico.";
document.querySelectorAll(".whatsappLink").forEach(link => link.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_TEXT)}`);

const videos = [...document.querySelectorAll(".videoFrame video")];
function pauseOthers(active) { videos.forEach(video => { if (video !== active) video.pause(); }); }
videos.forEach(video => {
  const frame = video.closest(".videoFrame");
  const play = frame.querySelector(".playToggle");
  const sound = frame.querySelector(".soundToggle");
  const playIcon = play.querySelector("i");
  const soundIcon = sound.querySelector("i");
  
  const syncPlay = () => { 
    playIcon.className = video.paused ? "iconPlay" : "iconPause"; 
    play.setAttribute("aria-label", video.paused ? "Reproduzir vídeo" : "Pausar vídeo"); 
    if (video.paused) frame.classList.remove('is-playing');
    else frame.classList.add('is-playing');
  };
  
  const syncSound = () => { 
    soundIcon.className = video.muted ? "iconSound muted" : "iconSound"; 
    sound.setAttribute("aria-pressed", String(!video.muted)); 
    sound.setAttribute("aria-label", video.muted ? "Ativar som" : "Desativar som"); 
  };
  
  const togglePlay = () => { if (video.paused) { pauseOthers(video); video.play(); } else video.pause(); };
  
  play.addEventListener("click", togglePlay);
  video.addEventListener("click", togglePlay); // Allow clicking video to pause/play
  sound.addEventListener("click", () => { video.muted = !video.muted; syncSound(); });
  
  video.addEventListener("play", syncPlay); 
  video.addEventListener("pause", syncPlay); 
  syncPlay(); 
  syncSound();
});

const observer = new IntersectionObserver(entries => entries.forEach(entry => {
  const video = entry.target;
  if (!entry.isIntersecting) video.pause(); // Only pause when out of view, no autoplay
}), { threshold: 0.15 });
videos.forEach(video => observer.observe(video));

const comments = [
  {
    user: "lucas.albuquerque",
    time: "2 d",
    likes: 42,
    avatar: "LA",
    avatarBg: "linear-gradient(135deg, #FF512F, #DD2476)",
    text: "Que trabalho impecável! Cada detalhe da captação ficou perfeito. Superou tudo! ❤️🔥",
    reply: {
      user: "kaldydigital",
      time: "1 d",
      likes: 12,
      text: "Obrigado pela confiança irmão! Prazer imenso registrar esse momento 🚀"
    }
  },
  {
    user: "mariana_cerimonial",
    time: "4 d",
    likes: 38,
    avatar: "MC",
    avatarBg: "linear-gradient(135deg, #833ab4, #fd1d1d, #fcb045)",
    text: "Vocês conseguiram registrar exatamente a emoção desse dia! A entrega em tempo real salvou o engajamento.",
    reply: {
      user: "kaldydigital",
      time: "3 d",
      likes: 9,
      text: "A energia do evento estava surreal! Muito bom viver isso com vocês! ✨"
    }
  },
  {
    user: "grupo.lifestyle",
    time: "1 sem",
    likes: 56,
    avatar: "GL",
    avatarBg: "linear-gradient(135deg, #11998e, #38ef7d)",
    text: "Profissionalismo, sensibilidade criativa e uma velocidade de post que nunca vi igual. Parabéns time Kaldy!",
    reply: {
      user: "kaldydigital",
      time: "6 d",
      likes: 15,
      text: "Pra cima! Construir narrativas fortes é o nosso propósito 👊"
    }
  },
  {
    user: "camila.brandao",
    time: "2 sem",
    likes: 47,
    avatar: "CB",
    avatarBg: "linear-gradient(135deg, #f857a6, #ff5858)",
    text: "O conteúdo dos stories bateu recorde de visualizações e directs na nossa história. Trabalho de outro nível 👏😍",
    reply: {
      user: "kaldydigital",
      time: "1 sem",
      likes: 11,
      text: "Esses números foram impressionantes! Muito feliz com o resultado 🎯"
    }
  },
  {
    user: "felipe.showmaker",
    time: "3 sem",
    likes: 64,
    avatar: "FM",
    avatarBg: "linear-gradient(135deg, #4facfe, #00f2fe)",
    text: "Sem palavras para esse resultado. A edição dos reels tem um ritmo cinematográfico absurdo! 🎬🚀",
    reply: {
      user: "kaldydigital",
      time: "2 sem",
      likes: 18,
      text: "Valeu demais meu parceiro! Cada frame pensado estrategicamente 🎥"
    }
  }
];

const track = document.querySelector("#testimonialTrack"), dots = document.querySelector("#testimonialDots"), count = document.querySelector("#testimonialCount"); let current = 0;
comments.forEach((c, i) => {
  track.insertAdjacentHTML("beforeend", `
    <div class="commentSlide">
      <div class="instaCommentCard">
        <div class="instaCardHeader">
          <div class="instaGrabBar"></div>
          <div class="instaHeaderTitle">
            <svg class="instaIconMini" viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
            <span>Comentários</span>
            <span class="instaVerifiedDot">•</span>
            <span class="instaSubtitle">@kaldydigital</span>
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
                <span class="instaUser">${c.user}</span>
                <span class="instaText">${c.text}</span>
              </div>
              <div class="instaCommentMeta">
                <span class="instaTime">${c.time}</span>
                <span class="instaActionBtn">Responder</span>
                <span class="instaActionBtn">Enviar</span>
              </div>
            </div>
            <div class="instaLikeBox">
              <svg viewBox="0 0 24 24" width="13" height="13" fill="#ff3040" stroke="#ff3040"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
              <span>${c.likes}</span>
            </div>
          </div>

          <!-- Resposta Oficial da Kaldy Digital -->
          <div class="instaCommentRow is-reply">
            <div class="instaAvatarRing kaldyRing">
              <img class="instaAvatarImg" src="https://kaldy-digital-preview.hugo0412victor.chatgpt.site/kaldy-preview/assets/logo-kaldy.png" alt="Kaldy Digital">
            </div>
            <div class="instaCommentContent">
              <div class="instaCommentBubble">
                <span class="instaUser">kaldydigital <svg class="instaVerifiedBadge" viewBox="0 0 24 24" width="11" height="11"><circle cx="12" cy="12" r="10" fill="#0095f6"/><path d="M9 12l2 2 4-4" fill="none" stroke="#fff" stroke-width="2.5" stroke-linecap="round"/></svg><small class="instaAuthorBadge">Criador</small></span>
                <span class="instaText"><b class="instaMention">@${c.user}</b> ${c.reply.text}</span>
              </div>
              <div class="instaCommentMeta">
                <span class="instaTime">${c.reply.time}</span>
                <span class="instaActionBtn">Responder</span>
              </div>
            </div>
            <div class="instaLikeBox">
              <svg viewBox="0 0 24 24" width="13" height="13" fill="#ff3040" stroke="#ff3040"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
              <span>${c.reply.likes}</span>
            </div>
          </div>
        </div>

        <div class="instaBottomBar">
          <div class="instaBottomInput">
            <img src="https://kaldy-digital-preview.hugo0412victor.chatgpt.site/kaldy-preview/assets/logo-kaldy.png" class="instaMiniAvatar" alt="">
            <span>Adicione um comentário...</span>
          </div>
          <div class="instaBottomEmojis">
            <span>❤️</span>
            <span>🙌</span>
            <span>🔥</span>
          </div>
        </div>
      </div>
    </div>
  `);
  const dot = document.createElement("button");
  dot.setAttribute("aria-label", `Ver comentário ${i + 1}`);
  dot.addEventListener("click", () => show(i));
  dots.append(dot);
});

function show(index) {
  current = (index + comments.length) % comments.length;
  track.style.transform = `translateX(-${current * 100}%)`;
  [...dots.children].forEach((dot, i) => dot.classList.toggle("active", i === current));
  count.textContent = `${String(current + 1).padStart(2, "0")} / ${String(comments.length).padStart(2, "0")}`;
}
document.querySelector("#testimonialPrev").addEventListener("click", () => show(current - 1));
document.querySelector("#testimonialNext").addEventListener("click", () => show(current + 1));
show(0);
setInterval(() => show(current + 1), 3500);

const nav=document.querySelector(".nav"); addEventListener("scroll",()=>nav.classList.toggle("scrolled",scrollY>30),{passive:true});

const influencerSlides = [...document.querySelectorAll(".influencerProfile")];
const influencerViewport = document.querySelector("#influencerFanViewport") || document.querySelector(".influencerFanViewport");
let influencerCurrent = 0;

function showInfluencer(index) {
  const total = influencerSlides.length;
  if (!total) return;
  influencerCurrent = (index + total) % total;
  
  influencerSlides.forEach((card, i) => {
    let diff = (i - influencerCurrent + total) % total;
    if (diff > total / 2) diff -= total;
    
    let positionClass = "card-hidden";
    if (diff === 0) {
      positionClass = "card-center";
    } else if (diff === -1) {
      positionClass = "card-left-1";
    } else if (diff === -2) {
      positionClass = "card-left-2";
    } else if (diff === 1) {
      positionClass = "card-right-1";
    } else if (diff === 2) {
      positionClass = "card-right-2";
    }
    
    card.className = `influencerProfile ${positionClass}`;
  });
}

// Click on any side card to bring it to center
influencerSlides.forEach((card, i) => {
  card.addEventListener("click", () => {
    showInfluencer(i);
  });
});

// Touch swipe support
let influencerStartX = 0;
const stageContainer = document.querySelector(".influencerStageBg") || document.querySelector(".influencerShowcase");
if (stageContainer) {
  stageContainer.addEventListener("touchstart", e => {
    influencerStartX = e.touches[0].clientX;
  }, { passive: true });

  stageContainer.addEventListener("touchend", e => {
    const distance = e.changedTouches[0].clientX - influencerStartX;
    if (Math.abs(distance) > 35) {
      showInfluencer(influencerCurrent + (distance < 0 ? 1 : -1));
    }
  }, { passive: true });
}

showInfluencer(0);
let influencerTimer = setInterval(() => showInfluencer(influencerCurrent + 1), 3200);

if (stageContainer) {
  stageContainer.addEventListener("mouseenter", () => clearInterval(influencerTimer));
  stageContainer.addEventListener("mouseleave", () => {
    clearInterval(influencerTimer);
    influencerTimer = setInterval(() => showInfluencer(influencerCurrent + 1), 3200);
  });
}


// Typewriter Effect
const words = ["Social Media", "Tráfego Pago", "Storymaker", "Filmmaker"];
let i = 0, timer;
const typewriterElement = document.getElementById("typewriter");

function typingEffect() {
  if (!typewriterElement) return;
  let word = words[i].split("");
  var loopTyping = function() {
    if (word.length > 0) {
      typewriterElement.innerHTML += word.shift();
    } else {
      setTimeout(deletingEffect, 2000); // Wait 2s before deleting
      return false;
    }
    timer = setTimeout(loopTyping, 90); // Typing speed
  };
  loopTyping();
}

function deletingEffect() {
  if (!typewriterElement) return;
  let word = words[i].split("");
  var loopDeleting = function() {
    if (word.length > 0) {
      word.pop();
      typewriterElement.innerHTML = word.join("");
    } else {
      if (words.length > (i + 1)) { i++; } else { i = 0; }
      setTimeout(typingEffect, 400); // Wait 0.4s before typing next word
      return false;
    }
    timer = setTimeout(loopDeleting, 45); // Deleting speed
  };
  loopDeleting();
}

typingEffect();


// ---------------------------------------------------------------------------
// GLOBAL BIDIRECTIONAL SCROLL REVEAL (Fade in ao descer, fade out suave ao subir)
// ---------------------------------------------------------------------------
const revealTargets = document.querySelectorAll('.reveal, .reveal-group');

if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const rect = entry.target.getBoundingClientRect();
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        if (entry.target.classList.contains('services')) {
          entry.target.querySelectorAll('article').forEach(a => a.classList.add('active'));
        }
      } else {
        // Quando o elemento está abaixo da tela (ao rolar para cima), reseta para re-animar
        if (rect.top > 0) {
          entry.target.classList.remove('is-visible');
          if (entry.target.classList.contains('services')) {
            entry.target.querySelectorAll('article').forEach(a => a.classList.remove('active'));
          }
        }
      }
    });
  }, {
    threshold: 0.08,
    rootMargin: '0px 0px -30px 0px'
  });

  revealTargets.forEach(el => revealObserver.observe(el));
} else {
  revealTargets.forEach(el => el.classList.add('is-visible'));
}

