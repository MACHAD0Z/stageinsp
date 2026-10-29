const supportForm = document.getElementById("supportForm");
const successMessage = document.getElementById("successMessage");

supportForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // Pega os valores
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const subject = document.getElementById("subject").value;
  const message = document.getElementById("message").value.trim();

  // Validação básica
  if(name === "" || email === "" || subject === "" || message === ""){
    alert("Preencha todos os campos antes de enviar!");
    return;
  }

  // Aqui poderia ir integração com backend / API
  console.log("Mensagem enviada:", { name, email, subject, message });

  supportForm.reset();
  successMessage.classList.remove("hidden");
  
  setTimeout(() => {
    successMessage.classList.add("hidden");
  }, 5000);
});
