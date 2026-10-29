// ===== Carousel =====
let currentSlide = 0;
const slides = document.getElementById("slides");
const totalSlides = slides.children.length;

function showSlide(index) {
  if (index < 0) currentSlide = totalSlides - 1;
  else if (index >= totalSlides) currentSlide = 0;
  else currentSlide = index;
  const offset = -currentSlide * (slides.children[0].offsetWidth + 40);
  slides.style.transform = `translateX(${offset}px)`;
}
function prevSlide() { showSlide(currentSlide - 1); }
function nextSlide() { showSlide(currentSlide + 1); }
showSlide(0);

// ===== Modal Login =====
const authModal = document.getElementById("auth-modal");
const loginLink = document.getElementById("login-link");
loginLink.addEventListener("click", (e) => {
  e.preventDefault();
  showLogin();
  authModal.style.display = "flex";
});
function closeModal() { authModal.style.display = "none"; }
function showLogin() {
  document.getElementById("login-form").style.display = "block";
  document.getElementById("cadastro-form").style.display = "none";
}
function showCadastro() {
  document.getElementById("login-form").style.display = "none";
  document.getElementById("cadastro-form").style.display = "block";
}

// ===== Multilíngue =====
const languages = {
  PT: {
    searchPlaceholder:"Pesquisar...",
    loginTitle:"Login",
    loginEmail:"Email",
    loginSenha:"Senha",
    loginBtn:"Entrar",
    noAccount:"Não tem conta?",
    register:"Cadastre-se",
    registerTitle:"Cadastro",
    regNome:"Nome",
    regCpf:"CPF",
    regEmail:"Email",
    regSenha:"Senha",
    regBtn:"Cadastrar",
    hasAccount:"Já tem conta?",
    loginLink:"Faça login",
    tickets:"Comprar Ingressos",
    support:"Suporte ao Fã",
    cookieBanner:"Este site usa cookies para melhorar sua experiência.",
    acceptCookies:"Aceitar",
    declineCookies:"Recusar"
  },
  EN: {
    searchPlaceholder:"Search...",
    loginTitle:"Login",
    loginEmail:"Email",
    loginSenha:"Password",
    loginBtn:"Sign In",
    noAccount:"Don't have an account?",
    register:"Register",
    registerTitle:"Register",
    regNome:"Name",
    regCpf:"CPF",
    regEmail:"Email",
    regSenha:"Password",
    regBtn:"Register",
    hasAccount:"Already have an account?",
    loginLink:"Sign in",
    tickets:"Buy Tickets",
    support:"Fan Support",
    cookieBanner:"This site uses cookies to improve your experience.",
    acceptCookies:"Accept",
    declineCookies:"Decline"
  },
  ES: {
    searchPlaceholder:"Buscar...",
    loginTitle:"Iniciar sesión",
    loginEmail:"Correo",
    loginSenha:"Contraseña",
    loginBtn:"Entrar",
    noAccount:"¿No tienes cuenta?",
    register:"Registrarse",
    registerTitle:"Registro",
    regNome:"Nombre",
    regCpf:"CPF",
    regEmail:"Correo",
    regSenha:"Contraseña",
    regBtn:"Registrar",
    hasAccount:"¿Ya tienes cuenta?",
    loginLink:"Inicia sesión",
    tickets:"Comprar Entradas",
    support:"Soporte al Fan",
    cookieBanner:"Este sitio usa cookies para mejorar tu experiencia.",
    acceptCookies:"Aceptar",
    declineCookies:"Rechazar"
  }
};

function updateLanguage(lang){
  const texts = languages[lang];
  document.getElementById("search-input").placeholder = texts.searchPlaceholder;
  document.getElementById("auth-title").textContent = texts.loginTitle;
  document.getElementById("loginEmail").placeholder = texts.loginEmail;
  document.getElementById("loginSenha").placeholder = texts.loginSenha;
  document.querySelector("#login-form button").textContent = texts.loginBtn;
  document.getElementById("no-account").innerHTML = `${texts.noAccount} <a href="#" onclick="showCadastro()">${texts.register}</a>`;
  document.querySelector("#cadastro-form h2").textContent = texts.registerTitle;
  document.getElementById("cadNome").placeholder = texts.regNome;
  document.getElementById("cadCpf").placeholder = texts.regCpf;
  document.getElementById("cadEmail").placeholder = texts.regEmail;
  document.getElementById("cadSenha").placeholder = texts.regSenha;
  document.querySelector("#cadastro-form button").textContent = texts.regBtn;
  document.getElementById("has-account").innerHTML = `${texts.hasAccount} <a href="#" onclick="showLogin()">${texts.loginLink}</a>`;
  document.getElementById("tickets-link").textContent = texts.tickets;
  document.getElementById("support-link").textContent = texts.support;
  document.getElementById("cookie-text").textContent = texts.cookieBanner;
  document.getElementById("accept-cookies").textContent = texts.acceptCookies;
  document.getElementById("decline-cookies").textContent = texts.declineCookies;
}

function toggleLanguage(){
  const btn = document.getElementById("language-selector");
  const langs = ["PT","EN","ES"];
  let currentIndex = langs.indexOf(btn.textContent);
  let nextIndex = (currentIndex+1)%langs.length;
  btn.textContent = langs[nextIndex];
  localStorage.setItem("selectedLanguage", langs[nextIndex]);
  updateLanguage(langs[nextIndex]);
}

window.addEventListener("load", ()=>{
  const savedLang = localStorage.getItem("selectedLanguage") || "PT";
  document.getElementById("language-selector").textContent = savedLang;
  updateLanguage(savedLang);
  if(localStorage.getItem("cookieAccepted")!=="true"){
    document.getElementById("cookie-banner").style.display="block";
  }
});

// ===== Login & Cadastro =====
function login(){
  const email=document.getElementById("loginEmail").value;
  const senha=document.getElementById("loginSenha").value;
  if(!email||!senha){ alert("Preencha todos os campos!"); return; }
  alert("Login não implementado ainda.");
}
async function cadastrar(){
  let nome=document.getElementById("cadNome").value.trim();
  let cpf=document.getElementById("cadCpf").value.trim();
  let email=document.getElementById("cadEmail").value.trim();
  let senha=document.getElementById("cadSenha").value.trim();
  if(!nome||!cpf||!email||!senha){ alert("Preencha todos os campos!"); return; }
  try{
    const response=await fetch("http://localhost:3000/usuarios",{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({nome,cpf,email,senha})
    });
    if(response.ok){ alert("Usuário cadastrado com sucesso!"); showLogin(); closeModal(); }
    else{ const erro=await response.text(); alert("Erro ao cadastrar: "+erro); }
  }catch(error){ alert("Erro na conexão com o servidor."); console.error(error);}
}

// ===== Cookies =====
function acceptCookies(){ localStorage.setItem("cookieAccepted","true"); document.getElementById("cookie-banner").style.display="none";}
function declineCookies(){ localStorage.setItem("cookieAccepted","false"); document.getElementById("cookie-banner").style.display="none";}

// ===== Voz =====
let currentLang = 'pt-BR';
let voices = [];

function populateVoices() {
  voices = window.speechSynthesis.getVoices();
}
window.speechSynthesis.onvoiceschanged = populateVoices;

function setLanguage(lang) {
  if (lang === 'pt') currentLang = 'pt-BR';
  if (lang === 'en') currentLang = 'en-US';
  if (lang === 'es') currentLang = 'es-ES';
}

function speak(text) {
  if (!voices.length) populateVoices();
  const msg = new SpeechSynthesisUtterance(text);
  const voice = voices.find(v => v.lang === currentLang) || voices[0];
  msg.voice = voice;
  msg.lang = currentLang;
  window.speechSynthesis.speak(msg);
}

function speakSelected() {
  let selectedText = window.getSelection().toString();
  if (!selectedText) selectedText = document.body.innerText;
  speak(selectedText);
}

function stopSpeaking() {
  window.speechSynthesis.cancel();
}

// ===== Inicialização após DOM carregado =====
window.addEventListener('DOMContentLoaded', () => {
  const voiceSelect = document.getElementById("voice-lang");
  const speakBtn = document.getElementById("speak-btn");
  const stopBtn = document.getElementById("stop-btn");

  if (voiceSelect) voiceSelect.addEventListener("change", (e) => setLanguage(e.target.value));
  if (speakBtn) speakBtn.addEventListener("click", speakSelected);
  if (stopBtn) stopBtn.addEventListener("click", stopSpeaking);
});


// ===== Botão de voz com select =====
function speakSelected() {
  let selectedText = window.getSelection().toString();
  if (!selectedText) {
    selectedText = document.body.innerText; // se não selecionar nada, lê todo o site
  }
  speak(selectedText);
}

function stopSpeaking() {
  window.speechSynthesis.cancel();
}

// Adiciona listener ao select de idioma
const voiceSelect = document.getElementById("voice-lang");
if (voiceSelect) {
  voiceSelect.addEventListener("change", (e) => {
    setLanguage(e.target.value);
  });
}

// Mantém a leitura automática ao passar mouse (opcional)
document.querySelectorAll('.news-item, .slides img, nav a, .buy-btn').forEach(el => {
  el.addEventListener('mouseenter', () => speak(el.innerText || el.alt || el.title));
});
