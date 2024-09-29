const result = document.getElementById("result");
const inputQuestion = document.getElementById("inputQuestion");

let atendimentoIniciado = false;
let respostaEsperada = false;
let totalCompra = 0;
let planosSelecionados = [];
let duvidasSelecionadas = false;
let aguardandoPlano = false;
let aguardandoVoltarMenu = false; // Nova variável para controle de retorno ao menu

// Função que envia a mensagem do usuário
function sendMessage() {
  const message = inputQuestion.value.trim();
  if (message !== "") {
    displayUserMessage(message);
    if (!atendimentoIniciado) {
      initiateChat(message);
    } else {
      if (aguardandoVoltarMenu && message === "5") {
        voltarAoMenuAnterior(); // Função para voltar ao menu
      } else {
        respondToUser(message.toLowerCase());
      }
    }
    inputQuestion.value = "";
  } else {
    displayBotMessage("Por favor, digite uma mensagem antes de enviar.");
  }
}

// Função para exibir a mensagem do usuário
function displayUserMessage(message) {
  result.innerHTML += `<div class="message user">Você: ${message}</div>`;
  result.scrollTop = result.scrollHeight;
}

// Função para exibir a mensagem do bot
function displayBotMessage(message) {
  result.innerHTML += `<div class="message bot">Sara: ${message}</div>`;
  result.scrollTop = result.scrollHeight;
}

// Função para exibir imagens e textos
function displayImageAndText(imageSrc, text) {
  result.innerHTML += `
    <div class="message bot">
      <img src="${imageSrc}" alt="Imagem de navegação" style="width:100%; height:auto;">
      <p>${text}</p>
    </div>
  `;
  result.scrollTop = result.scrollHeight;
}

// Função que exibe a sequência de navegação desktop
function showNavigationSequence() {
  const navigationSteps = [
    { image: "/img/nav1.png", text: "Este é o menu principal do site." },
    {
      image: "./img/nav2.png",
      text: "Aqui você pode acessar as opções de serviços.",
    },
    {
      image: "./img/nav3.png",
      text: "Esta seção é onde ficam as informações de contato.",
    },
    {
      image: "./img/nav4.png",
      text: "Aqui você encontra o rodapé com links úteis. Pressione 8 para voltar ao menu anterior.",
    },
  ];

  let currentStep = 0;

  function showNextStep() {
    if (currentStep < navigationSteps.length) {
      const { image, text } = navigationSteps[currentStep];
      displayImageAndText(image, text);
      currentStep++;
    } else {
      displayBotMessage(
        "Essas são as principais seções do site. Pressione 8 para voltar ao menu anterior."
      );
      aguardandoVoltarMenu = true; // Espera pela entrada do usuário
    }
  }

  // Exibe cada passo da sequência com um intervalo de 3 segundos
  const intervalId = setInterval(() => {
    showNextStep();
    if (currentStep >= navigationSteps.length) {
      clearInterval(intervalId);
    }
  }, 3000);
}

// Função que exibe a sequência de navegação mobile
function showMobileNavigationSequence() {
  const mobileNavigationSteps = [
    {
      image: "./img/mobileNav1.png",
      text: "Estas 3 listras é o menu para dispositivos móveis.",
    },
    {
      image: "./img/mobileNav2.png",
      text: "Aqui você pode acessar as opções do menu. Pressione 8 para voltar ao menu anterior.",
    },
  ];

  let currentStep = 0;

  function showNextStep() {
    if (currentStep < mobileNavigationSteps.length) {
      const { image, text } = mobileNavigationSteps[currentStep];
      displayImageAndText(image, text);
      currentStep++;
    } else {
      displayBotMessage(
        "Essas são as principais seções da navegação mobile. Pressione 8 para voltar ao menu anterior."
      );
      aguardandoVoltarMenu = true; // Espera pela entrada do usuário
    }
  }

  // Exibe cada passo da sequência com um intervalo de 3 segundos
  const intervalId = setInterval(() => {
    showNextStep();
    if (currentStep >= mobileNavigationSteps.length) {
      clearInterval(intervalId);
    }
  }, 3000);
}

// Função que exibe o QR-code da versão mobile
function showQRCode() {
  const qrCodeSteps = [
    {
      image: "/img/qrcode.png",
      text: "Aqui está o QR-code para acessar a versão mobile do site. Use seu smartphone para escanear e acessar rapidamente.",
    },
  ];

  qrCodeSteps.forEach(({ image, text }) => {
    displayImageAndText(image, text);
  });

  displayBotMessage("Pressione 8 para voltar ao menu anterior.");
  aguardandoVoltarMenu = true; // Espera pela entrada do usuário
}

// Inicia o atendimento
function initiateChat(message) {
  console.log("Iniciando o chat com a mensagem:", message); // Para depuração
  if (message === "1") {
    displayBotMessage(
      "Escolha um serviço: \n1 - Desenvolvimento de Software\n2 - Consultoria\n3 - Teste de Software\n4 - Dúvidas\nDigite o número correspondente. Pressione 8 para voltar ao menu anterior."
    );
    atendimentoIniciado = true;
    respostaEsperada = true;
  } else if (message === "0") {
    displayBotMessage("Obrigado pela atenção! Volte sempre.");
  } else {
    displayBotMessage("Escolha 1 para iniciar o atendimento ou 0 para sair.");
  }
}

// Responde de acordo com as escolhas do usuário
function respondToUser(message) {
  if (respostaEsperada) {
    if (duvidasSelecionadas) {
      handleDuvidas(message);
    } else if (aguardandoPlano) {
      handlePlanoSelection(message);
    } else {
      switch (message) {
        case "1":
          displayBotMessage(
            "Serviço de Desenvolvimento selecionado.\nEscolha o plano:\n4 - START (R$ 500)\n5 - MEGA (R$ 1000)\n6 - ULTRA (R$ 1500)\nDigite o número correspondente. Pressione 8 para voltar ao menu anterior."
          );
          aguardandoPlano = true;
          break;
        case "2":
          displayBotMessage(
            "Serviço de Consultoria selecionado.\nEscolha o plano:\n4 - START (R$ 500)\n5 - MEGA (R$ 1000)\n6 - ULTRA (R$ 1500)\nDigite o número correspondente. Pressione 8 para voltar ao menu anterior."
          );
          aguardandoPlano = true;
          break;
        case "3":
          displayBotMessage(
            "Serviço de Teste de Software selecionado.\nEscolha o plano:\n4 - START (R$ 500)\n5 - MEGA (R$ 1000)\n6 - ULTRA (R$ 1500)\nDigite o número correspondente. Pressione 8 para voltar ao menu anterior."
          );
          aguardandoPlano = true;
          break;
        case "4":
          displayBotMessage(
            "Escolha sua dúvida:\n1 - Navegação Desktop\n2 - Navegação Mobile\n3 - Acessar QR-Code versão mobile. Digite o número correspondente. Pressione 8 para voltar ao menu anterior."
          );
          duvidasSelecionadas = true;
          break;
        case "8":
          voltarAoMenuAnterior();
          break;
        default:
          displayBotMessage("Escolha uma das opções válidas.");
          break;
      }
    }
  }
}

// Função para lidar com dúvidas
function handleDuvidas(message) {
  if (message === "1") {
    displayBotMessage(
      "Dúvida de Navegação Desktop selecionada. Aqui está um guia:"
    );
    showNavigationSequence();
  } else if (message === "2") {
    displayBotMessage(
      "Dúvida de Navegação Mobile selecionada. Aqui está um guia:"
    );
    showMobileNavigationSequence(); // Chama a função de navegação mobile
  } else if (message === "3") {
    displayBotMessage("Acessar QR-code versão mobile selecionado.");
    showQRCode(); // Chama a função de exibição do QR-code
  } else if (message === "8") {
    voltarAoMenuAnterior();
  } else {
    displayBotMessage("Escolha uma dúvida válida.");
  }
  duvidasSelecionadas = false;
}

// Função para lidar com seleção de planos
function handlePlanoSelection(message) {
  switch (message) {
    case "4":
      adicionarPlano("START", 500);
      break;
    case "5":
      adicionarPlano("MEGA", 1000);
      break;
    case "6":
      adicionarPlano("ULTRA", 1500);
      break;
    case "7":
      encerrarCompra();
      break;
    case "8":
      voltarAoMenuAnterior();
      break;
    default:
      displayBotMessage(
        "Escolha uma das opções válidas ou pressione 7 para encerrar. Pressione 8 para voltar ao menu anterior."
      );
  }
}

// Adiciona o plano ao carrinho
function adicionarPlano(nomePlano, valorPlano) {
  planosSelecionados.push({ nome: nomePlano, valor: valorPlano });
  totalCompra += valorPlano;
  displayBotMessage(
    `Plano ${nomePlano} adicionado. Total: R$ ${totalCompra}. Pressione 7 para encerrar a compra ou 8 para voltar ao menu anterior.`
  );
}

// Encerra a compra
function encerrarCompra() {
  displayBotMessage(
    `Compra finalizada. Total a pagar: R$ ${totalCompra}. Obrigado!`
  );
  atendimentoIniciado = false; // Reinicia o atendimento
}

// Função para voltar ao menu anterior
function voltarAoMenuAnterior() {
  displayBotMessage("Voltando ao menu anterior...");
  atendimentoIniciado = false;
  duvidasSelecionadas = false;
  aguardandoPlano = false;
  aguardandoVoltarMenu = false; // Reseta a espera do usuário
  displayBotMessage(
    "Escolha um serviço: \n1 - Desenvolvimento de Software\n2 - Consultoria\n3 - Teste de Software\n4 - Dúvidas\nDigite o número correspondente. Pressione 8 para voltar ao menu anterior."
  );
}

document.addEventListener("DOMContentLoaded", function () {
  displayBotMessage(
    "Olá! Sou um chatbot de atendimento ao cliente. Posso ajudar?"
  );
});
