const savePasswordBtn = document.getElementById("savePasswordBtn");
const newPasswordInput = document.getElementById("newPassword");
const confirmPasswordInput = document.getElementById("confirmPassword");

// Ícones de olho
const newPasswordEye = document.getElementById("newPasswordEye");
const confirmPasswordEye = document.getElementById("confirmPasswordEye");

// ===== Multilíngue =====
const languages = {
  PT: {
    header: "Redefinir Senha",
    passwordTitle: "Digite a nova senha",
    newPasswordPlaceholder: "Digite a nova senha",
    confirmPasswordPlaceholder: "Repita a senha",
    emptyFields: "Preencha ambos os campos!",
    mismatch: "As senhas não coincidem!",
    success: "Senha redefinida com sucesso!"
  },
  EN: {
    header: "Reset Password",
    passwordTitle: "Enter New Password",
    newPasswordPlaceholder: "Enter new password",
    confirmPasswordPlaceholder: "Repeat the password",
    emptyFields: "Fill in both fields!",
    mismatch: "Passwords do not match!",
    success: "Password successfully reset!"
  },
  ES: {
    header: "Restablecer Contraseña",
    passwordTitle: "Ingrese la nueva contraseña",
    newPasswordPlaceholder: "Ingrese la nueva contraseña",
    confirmPasswordPlaceholder: "Repita la contraseña",
    emptyFields: "¡Complete ambos campos!",
    mismatch: "¡Las contraseñas no coinciden!",
    success: "¡Contraseña restablecida con éxito!"
  }
};

// Atualiza textos da página
function updateLanguage(lang) {
  const texts = languages[lang];
  document.querySelector("header h1").textContent = texts.header;
  document.querySelector(".personal-info h2").textContent = texts.passwordTitle;
  newPasswordInput.placeholder = texts.newPasswordPlaceholder;
  confirmPasswordInput.placeholder = texts.confirmPasswordPlaceholder;
}

// Alterna entre idiomas
function toggleLanguage() {
  const btn = document.getElementById("language-selector");
  const langs = ["PT","EN","ES"];
  let currentIndex = langs.indexOf(btn.textContent);
  let nextIndex = (currentIndex + 1) % langs.length;
  btn.textContent = langs[nextIndex];
  localStorage.setItem("selectedLanguage", langs[nextIndex]);
  updateLanguage(langs[nextIndex]);
}

// Adiciona evento ao botão de idioma
document.getElementById("language-selector").addEventListener("click", toggleLanguage);

// Alternar visibilidade da senha
newPasswordEye.addEventListener("click", () => {
  if(newPasswordInput.type === "password"){
    newPasswordInput.type = "text";
    newPasswordEye.textContent = "🙈";
  } else {
    newPasswordInput.type = "password";
    newPasswordEye.textContent = "👁️";
  }
});

confirmPasswordEye.addEventListener("click", () => {
  if(confirmPasswordInput.type === "password"){
    confirmPasswordInput.type = "text";
    confirmPasswordEye.textContent = "🙈";
  } else {
    confirmPasswordInput.type = "password";
    confirmPasswordEye.textContent = "👁️";
  }
});

// Carregar senha salva e idioma
window.addEventListener("load", () => {
  const savedPassword = localStorage.getItem("userPassword");
  if(savedPassword){
    newPasswordInput.value = savedPassword;
    confirmPasswordInput.value = savedPassword;
  }
  const savedLang = localStorage.getItem("selectedLanguage") || "PT";
  if(document.getElementById("language-selector")) {
    document.getElementById("language-selector").textContent = savedLang;
  }
  updateLanguage(savedLang);
});

// Salvar nova senha
savePasswordBtn.addEventListener("click", () => {
  const newPassword = newPasswordInput.value.trim();
  const confirmPassword = confirmPasswordInput.value.trim();
  const lang = localStorage.getItem("selectedLanguage") || "PT";
  const texts = languages[lang];

  if(newPassword === "" || confirmPassword === ""){
    alert(texts.emptyFields);
    return;
  }
  if(newPassword !== confirmPassword){
    alert(texts.mismatch);
    return;
  }

  localStorage.setItem("userPassword", newPassword);
  alert(texts.success);
  window.location.href = "perfil.html";
});
