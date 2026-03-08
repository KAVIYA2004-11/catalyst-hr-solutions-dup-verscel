/* ─── GLOBAL CSS STYLES ─────────────────────────────────────── */
/* All colour values are hardcoded here to avoid ESLint no-undef  */
/* errors from using T (design tokens) inside a CSS string.       */
/* If you change brand colours in config.js, update them here too */

const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,800;1,600&family=DM+Sans:wght@300;400;500;600;700&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
body{font-family:'DM Sans',system-ui,sans-serif;background:#F8FAFC;color:#0F172A}
::selection{background:#4DB6AC;color:#fff}
::-webkit-scrollbar{width:5px}
::-webkit-scrollbar-thumb{background:#4DB6AC;border-radius:3px}

@keyframes fadeUp{from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:translateY(0)}}
@keyframes fadeIn{from{opacity:0}to{opacity:1}}
@keyframes slideL{from{opacity:0;transform:translateX(-44px)}to{opacity:1;transform:translateX(0)}}
@keyframes slideR{from{opacity:0;transform:translateX(44px)}to{opacity:1;transform:translateX(0)}}
@keyframes scaleIn{from{opacity:0;transform:scale(0.9)}to{opacity:1;transform:scale(1)}}
@keyframes spin{to{transform:rotate(360deg)}}
@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-14px)}}
@keyframes gradShift{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}
@keyframes shimmer{0%{background-position:-200% center}100%{background-position:200% center}}
@keyframes ripple{0%{opacity:0;transform:scale(0.3)}60%{opacity:0.4}100%{opacity:0;transform:scale(2.2)}}
@keyframes countUp{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
@keyframes borderPulse{0%,100%{box-shadow:0 0 0 0 rgba(0,137,123,0.4)}50%{box-shadow:0 0 0 8px rgba(0,137,123,0)}}
@keyframes imgReveal{from{opacity:0;transform:scale(1.06)}to{opacity:1;transform:scale(1)}}
@keyframes marquee{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}

.page{animation:fadeUp .55s cubic-bezier(.16,1,.3,1) both}
.fade-up{animation:fadeUp .6s ease both}
.fade-in{animation:fadeIn .4s ease both}
.slide-l{animation:slideL .55s cubic-bezier(.16,1,.3,1) both}
.slide-r{animation:slideR .55s cubic-bezier(.16,1,.3,1) both}
.scale-in{animation:scaleIn .35s cubic-bezier(.16,1,.3,1) both}
.float{animation:float 5s ease-in-out infinite}
.img-reveal{animation:imgReveal .8s ease both}

.s1{animation-delay:.05s}.s2{animation-delay:.1s}.s3{animation-delay:.15s}
.s4{animation-delay:.2s}.s5{animation-delay:.25s}.s6{animation-delay:.3s}

.hover-card{transition:transform .3s cubic-bezier(.34,1.56,.64,1),box-shadow .3s ease}
.hover-card:hover{transform:translateY(-6px) scale(1.01);box-shadow:0 24px 56px rgba(0,137,123,.13)}

.btn-shine{position:relative;overflow:hidden;transition:transform .2s,box-shadow .2s}
.btn-shine::after{content:'';position:absolute;inset:0;background:linear-gradient(120deg,transparent 30%,rgba(255,255,255,.22) 50%,transparent 70%);transform:translateX(-100%);transition:transform .5s ease}
.btn-shine:hover::after{transform:translateX(100%)}
.btn-shine:hover{transform:translateY(-2px);box-shadow:0 10px 28px rgba(0,137,123,.32)}
.btn-shine:active{transform:translateY(0)}

.nav-link{position:relative;transition:color .2s}
.nav-link::after{content:'';position:absolute;bottom:-2px;left:0;right:0;height:2px;background:#00897B;transform:scaleX(0);transition:transform .25s ease;transform-origin:center}
.nav-link:hover::after,.nav-link.on::after{transform:scaleX(1)}

.field{transition:border-color .2s,box-shadow .2s,transform .15s}
.field:focus{border-color:#00897B!important;box-shadow:0 0 0 3px rgba(0,137,123,0.16);transform:translateY(-1px);outline:none}

.hero-grad{background:linear-gradient(-45deg,#004D40,#00897B,#00695C,#005f52);background-size:400% 400%;animation:gradShift 9s ease infinite}
.shimmer-txt{background:linear-gradient(90deg,#fff 0%,#4DB6AC 30%,#fff 50%,#4DB6AC 70%,#fff 100%);background-size:200% auto;-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;animation:shimmer 4s linear infinite}
.grad-txt{background:linear-gradient(135deg,#00897B,#4DB6AC);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}

.dot-bg{background-image:radial-gradient(circle,rgba(0,137,123,.1) 1px,transparent 1px);background-size:26px 26px}
.grid-bg{background-image:linear-gradient(rgba(0,137,123,.05) 1px,transparent 1px),linear-gradient(90deg,rgba(0,137,123,.05) 1px,transparent 1px);background-size:44px 44px}
.diag{background:repeating-linear-gradient(45deg,transparent,transparent 8px,rgba(0,137,123,.03) 8px,rgba(0,137,123,.03) 16px)}
.glass{background:rgba(255,255,255,.8);backdrop-filter:blur(20px)}

.modal-wrap{animation:fadeIn .22s ease both}
.modal-box{animation:scaleIn .3s cubic-bezier(.16,1,.3,1) both}

.img-cover{width:100%;height:100%;object-fit:cover;display:block;transition:transform .5s ease}
.img-cover:hover{transform:scale(1.04)}

.marquee-track{display:flex;gap:32px;animation:marquee 28s linear infinite;width:max-content}
.marquee-track:hover{animation-play-state:paused}

.tag{display:inline-flex;align-items:center;gap:4px;padding:3px 10px;border-radius:20px;font-size:11px;font-weight:700;letter-spacing:.5px;text-transform:uppercase}

.pulse-dot{animation:borderPulse 2s infinite}
`;

export const injectStyles = () => {
  if (document.getElementById("chs-styles")) return;
  const s = document.createElement("style");
  s.id = "chs-styles";
  s.textContent = STYLES;
  document.head.appendChild(s);
};