// ===== Multilíngue =====
const languages = {
  PT: {
    header: "Meu Perfil",
    firstName: "Nome",
    firstNamePlaceholder: "Nome como aparece em seu documento",
    lastName: "Sobrenome",
    lastNamePlaceholder: "Sobrenome como aparece em seu documento",
    email: "E-Mail",
    emailPlaceholder: "e-mail para notificações e recuperação de senha",
    country: "País de Residência",
    countryPlaceholder: "O país onde você mora",
    docType: "Tipo de Documento",
    cpf: "CPF",
    cpfPlaceholder: "O número do seu documento",
    countryCode: "Código do País",
    phone: "Telefone",
    phonePlaceholder: "Telefone para notificações e contato",
    saveBtn: "Salvar Alterações",
    resetBtn: "Redefinir Senha",
    tickets: "Meus Ingressos"
  },
  EN: {
    header: "My Profile",
    firstName: "First Name",
    firstNamePlaceholder: "First name as on your document",
    lastName: "Last Name",
    lastNamePlaceholder: "Last name as on your document",
    email: "E-Mail",
    emailPlaceholder: "Email for notifications and password recovery",
    country: "Country of Residence",
    countryPlaceholder: "The country you live in",
    docType: "Document Type",
    cpf: "CPF",
    cpfPlaceholder: "Your document number",
    countryCode: "Country Code",
    phone: "Phone",
    phonePlaceholder: "Phone for notifications and contact",
    saveBtn: "Save Changes",
    resetBtn: "Reset Password",
    tickets: "My Tickets"
  },
  ES: {
    header: "Mi Perfil",
    firstName: "Nombre",
    firstNamePlaceholder: "Nombre como aparece en su documento",
    lastName: "Apellido",
    lastNamePlaceholder: "Apellido como aparece en su documento",
    email: "E-Mail",
    emailPlaceholder: "Correo para notificaciones y recuperación de contraseña",
    country: "País de Residencia",
    countryPlaceholder: "El país donde vives",
    docType: "Tipo de Documento",
    cpf: "CPF",
    cpfPlaceholder: "Número de tu documento",
    countryCode: "Código del País",
    phone: "Teléfono",
    phonePlaceholder: "Teléfono para notificaciones y contacto",
    saveBtn: "Guardar Cambios",
    resetBtn: "Restablecer Contraseña",
    tickets: "Mis Entradas"
  }
};

function updateLanguage(lang){
  const texts = languages[lang];

  document.querySelector("header h1").textContent = texts.header;
  document.querySelector("label[for='firstName']").textContent = texts.firstName;
  document.getElementById("firstName").placeholder = texts.firstNamePlaceholder;
  document.querySelector("label[for='lastName']").textContent = texts.lastName;
  document.getElementById("lastName").placeholder = texts.lastNamePlaceholder;
  document.querySelector("label[for='email']").textContent = texts.email;
  document.getElementById("email").placeholder = texts.emailPlaceholder;
  document.querySelector("label[for='country']").textContent = texts.country;
  document.getElementById("country").placeholder = texts.countryPlaceholder;
  document.querySelector("label[for='docType']").textContent = texts.docType;
  document.querySelector("label[for='cpf']").textContent = texts.cpf;
  document.getElementById("cpf").placeholder = texts.cpfPlaceholder;
  document.querySelector("label[for='countryCode']").textContent = texts.countryCode;
  document.querySelector("label[for='phone']").textContent = texts.phone;
  document.getElementById("phone").placeholder = texts.phonePlaceholder;
  document.getElementById("saveProfileBtn").textContent = texts.saveBtn;
  document.getElementById("resetPasswordBtn").textContent = texts.resetBtn;
  document.querySelector(".tickets h2").textContent = texts.tickets;
}

// ===== Alterar foto de perfil =====
const fileInput = document.getElementById("fileInput");
const profileImage = document.getElementById("profileImage");

fileInput.addEventListener("change", function () {
  const file = this.files[0];
  if(file){
    const reader = new FileReader();
    reader.onload = function(e){
      profileImage.src = e.target.result;
      localStorage.setItem("profilePic", e.target.result);
    }
    reader.readAsDataURL(file);
  }
});

// ===== Salvar dados do perfil =====
document.getElementById("saveProfileBtn").addEventListener("click", () => {
  const profileData = {
    firstName: document.getElementById("firstName").value,
    lastName: document.getElementById("lastName").value,
    email: document.getElementById("email").value,
    country: document.getElementById("country").value,
    docType: document.getElementById("docType").value,
    cpf: document.getElementById("cpf").value,
    countryCode: document.getElementById("countryCode").value,
    phone: document.getElementById("phone").value
  };
  localStorage.setItem("profileData", JSON.stringify(profileData));
  alert("Perfil salvo com sucesso!");
});

// ===== Carregar dados salvos =====
window.addEventListener("load", () => {
  const savedPic = localStorage.getItem("profilePic");
  if(savedPic) profileImage.src = savedPic;

  const savedData = JSON.parse(localStorage.getItem("profileData"));
  if(savedData){
    document.getElementById("firstName").value = savedData.firstName || "";
    document.getElementById("lastName").value = savedData.lastName || "";
    document.getElementById("email").value = savedData.email || "";
    document.getElementById("country").value = savedData.country || "";
    document.getElementById("docType").value = savedData.docType || "CPF";
    document.getElementById("cpf").value = savedData.cpf || "";
    document.getElementById("countryCode").value = savedData.countryCode || "+55";
    document.getElementById("phone").value = savedData.phone || "";
  }

  // Aplicar linguagem salva
  const savedLang = localStorage.getItem("selectedLanguage") || "PT";
  updateLanguage(savedLang);
});

// ===== CPF apenas números =====
const cpfInput = document.getElementById("cpf");
cpfInput.addEventListener("input", () => {
  cpfInput.value = cpfInput.value.replace(/\D/g, "");
});

// ===== Telefone apenas números =====
const phoneInput = document.getElementById("phone");
phoneInput.addEventListener("input", () => {
  phoneInput.value = phoneInput.value.replace(/\D/g, "");
});

// ===== Botão redefinir senha =====
document.getElementById("resetPasswordBtn").addEventListener("click", () => {
  window.location.href = "senha.html";
});

// ===== Alternar idioma manual =====
const languageSelector = document.createElement("button");
languageSelector.id = "language-selector";
languageSelector.style.position = "fixed";
languageSelector.style.top = "10px";
languageSelector.style.right = "10px";
languageSelector.style.padding = "10px";
languageSelector.style.borderRadius = "6px";
languageSelector.style.border = "none";
languageSelector.style.background = "#ff00ff";
languageSelector.style.color = "#fff";
languageSelector.style.fontWeight = "bold";
languageSelector.style.cursor = "pointer";
languageSelector.textContent = localStorage.getItem("selectedLanguage") || "PT";
document.body.appendChild(languageSelector);

languageSelector.addEventListener("click", () => {
  const langs = ["PT","EN","ES"];
  let currentIndex = langs.indexOf(languageSelector.textContent);
  let nextIndex = (currentIndex+1)%langs.length;
  languageSelector.textContent = langs[nextIndex];
  localStorage.setItem("selectedLanguage", langs[nextIndex]);
  updateLanguage(langs[nextIndex]);
});
