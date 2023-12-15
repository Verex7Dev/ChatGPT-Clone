const chatLog = document.getElementById("chat-log"),
  userInput = document.getElementById("user-input"),
  sendButton = document.getElementById("send-button"),
  buttonIcon = document.getElementById("button-icon"),
  info = document.querySelector(".info");

// Adiciona um ouvinte de evento para o clique no botão "Enviar"
sendButton.addEventListener("click", sendMessage);
// Adiciona um ouvinte de evento para a tecla "Enter" pressionada no campo de entrada do usuário
userInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    sendMessage();
  }
});

// Função que envia a mensagem
function sendMessage() {
  const message = userInput.value.trim();
  // Se a mensagem estiver vazia, não faz nada
  if (message === "") {
    return;
  }
  // Se a mensagem for 'developer', exibe a nossa mensagem
  else if (message === "dev") {
    // Limpa o valor de entrada
    userInput.value = "";
    // Adiciona a mensagem como usuário - vamos codificar a função
    appendMessage("user", message);
    // Define um tempo fictício que exibe o carregamento no botão de envio
    setTimeout(() => {
      // Envia a nossa mensagem como bot (remetente: bot)
      appendMessage("bot", "Verex7");
      // Altera o ícone do botão para o padrão
      buttonIcon.classList.add("fa-solid", "fa-paper-plane");
      buttonIcon.classList.remove("fas", "fa-spinner", "fa-pulse");
    }, 2000);
    return;
  } else if (message === "oi") {
    // Limpa o valor de entrada
    userInput.value = "";
    // Adiciona a mensagem como usuário - vamos codificar a função
    appendMessage("user", message);
    // Define um tempo fictício que exibe o carregamento no botão de envio
    setTimeout(() => {
      // Envia a nossa mensagem como bot (remetente: bot)
      appendMessage("bot", "Create by Verex7);
      // Altera o ícone do botão para o padrão
      buttonIcon.classList.add("fa-solid", "fa-paper-plane");
      buttonIcon.classList.remove("fas", "fa-spinner", "fa-pulse");
    }, 2000);
    return;
  }

  // Senão, se nenhum dos casos acima
  // Adiciona a mensagem do usuário à tela
  appendMessage("user", message);
  userInput.value = "";

  const options = {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "X-RapidAPI-Key": "cf7bf6f5a5msh21bb0dfb81662c1p131879jsbd3dcc0ac8295",
      "X-RapidAPI-Host": "chatgpt53.p.rapidapi.com",
      // Se você quiser usar a API oficial
      /*
            'content-type': 'application/json',
            'X-RapidAPI-Key': 'Sua Chave',
            'X-RapidAPI-Host': 'openai80.p.rapidapi.com'
            */
    },
    body: `{"messages":[{"role":"user","content":"${message}"}]}`,
    // Se você quiser usar a API oficial, você precisa ter esse corpo
    // `{"model":"gpt-3.5-turbo","messages":[{"role":"user","content":"${message}"}]}`
  };
  // API oficial: 'https://openai80.p.rapidapi.com/chat/completions';
  fetch("https://chatgpt53.p.rapidapi.com/", options)
    .then((response) => response.json())
    .then((response) => {
      appendMessage("bot", response.choices[0].message.content);

      buttonIcon.classList.add("fa-solid", "fa-paper-plane");
      buttonIcon.classList.remove("fas", "fa-spinner", "fa-pulse");
    })
    .catch((err) => {
      if (err.name === "TypeError") {
        appendMessage("bot", "Erro: Verifique sua chave de API!");
        buttonIcon.classList.add("fa-solid", "fa-paper-plane");
        buttonIcon.classList.remove("fas", "fa-spinner", "fa-pulse");
      }
    });
}

// Função que adiciona uma mensagem ao registro de bate-papo
function appendMessage(sender, message) {
  info.style.display = "none";
  // Altera o ícone do botão de envio para carregamento usando o FontAwesome
  buttonIcon.classList.remove("fa-solid", "fa-paper-plane");
  buttonIcon.classList.add("fas", "fa-spinner", "fa-pulse");

  const messageElement = document.createElement("div");
  const iconElement = document.createElement("div");
  const chatElement = document.createElement("div");
  const icon = document.createElement("i");

  chatElement.classList.add("chat-box");
  iconElement.classList.add("icon");
  messageElement.classList.add(sender);
  messageElement.innerText = message;

  // Adiciona ícones dependendo de quem enviou a mensagem, usuário ou bot
  if (sender === "user") {
    icon.classList.add("fa-regular", "fa-user");
    iconElement.setAttribute("id", "user-icon");
  } else {
    icon.classList.add("fa-solid", "fa-robot");
    iconElement.setAttribute("id", "bot-icon");
  }

  iconElement.appendChild(icon);
  chatElement.appendChild(iconElement);
  chatElement.appendChild(messageElement);
  chatLog.appendChild(chatElement);
  chatLog.scrollTo = chatLog.scrollHeight;
}
