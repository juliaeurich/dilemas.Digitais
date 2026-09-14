const dilemmas = [
  {
    category: "PRIVACIDADE",
    question:
      "Um aplicativo pede acesso aos seus contatos para funcionar corretamente. Você permitiria?",
    options: [
      {
        title: "Sim, permitiria",
        description: "Quero usar o aplicativo sem limitações.",
        feedback:
          "Antes de permitir, vale perguntar: o aplicativo realmente precisa desses dados para funcionar?"
      },
      {
        title: "Não, recusaria",
        description: "Minha privacidade é mais importante.",
        feedback:
          "Uma boa prática é conceder apenas as permissões realmente necessárias."
      }
    ]
  },

  {
    category: "REDES SOCIAIS",
    question:
      "Você recebe uma notícia muito chocante em um grupo. A informação parece verdadeira, mas não há fonte. O que faria?",
    options: [
      {
        title: "Compartilharia",
        description: "Outras pessoas precisam saber disso.",
        feedback:
          "Informações falsas podem se espalhar rapidamente. Compartilhar sem verificar aumenta o alcance do problema."
      },
      {
        title: "Verificaria primeiro",
        description: "Procuro uma fonte confiável antes.",
        feedback:
          "Verificar a origem, a data e outras fontes é uma ótima forma de reduzir a desinformação."
      }
    ]
  },

  {
    category: "INTELIGÊNCIA ARTIFICIAL",
    question:
      "Uma IA produz um trabalho escolar praticamente pronto. Você entregaria o texto como se tivesse feito sozinho?",
    options: [
      {
        title: "Sim, entregaria",
        description: "A IA fez o trabalho rapidamente.",
        feedback:
          "Usar tecnologia não elimina a responsabilidade sobre aquilo que você entrega."
      },
      {
        title: "Usaria como apoio",
        description: "Eu revisaria e produziria minha própria versão.",
        feedback:
          "Usar IA como ferramenta de apoio pode ser mais responsável quando você entende, verifica e participa do resultado."
      }
    ]
  },

  {
    category: "PEGADA DIGITAL",
    question:
      "Você encontra uma foto antiga de um amigo que pode causar constrangimento. O que faria?",
    options: [
      {
        title: "Publicaria",
        description: "É apenas uma brincadeira.",
        feedback:
          "Uma publicação pode permanecer na internet mesmo depois de apagada e atingir outras pessoas."
      },
      {
        title: "Não publicaria",
        description: "Prefiro respeitar a privacidade dele.",
        feedback:
          "Respeitar a imagem e a privacidade de outras pessoas também faz parte da cidadania digital."
      }
    ]
  },

  {
    category: "SEGURANÇA",
    question:
      "Você recebe um link dizendo que ganhou um prêmio. Para receber o prêmio, precisa informar sua senha. O que faria?",
    options: [
      {
        title: "Informaria",
        description: "Não quero perder a oportunidade.",
        feedback:
          "Senhas são informações pessoais e nunca devem ser fornecidas para receber supostos prêmios."
      },
      {
        title: "Ignoraria",
        description: "Prefiro confirmar se a mensagem é legítima.",
        feedback:
          "Desconfiar de mensagens inesperadas e verificar o remetente ajuda a evitar golpes e phishing."
      }
    ]
  }
];

let currentDilemma = 0;
let answered = false;

const category = document.getElementById("category");
const question = document.getElementById("question");
const questionNumber = document.getElementById("questionNumber");

const currentNumber = document.getElementById("currentNumber");
const totalNumber = document.getElementById("totalNumber");

const choices = document.querySelectorAll(".choice");

const feedback = document.getElementById("feedback");
const feedbackTitle = document.getElementById("feedbackTitle");
const feedbackText = document.getElementById("feedbackText");

const nextButton = document.getElementById("nextButton");

totalNumber.textContent = String(dilemmas.length).padStart(2, "0");

function loadDilemma() {
  const dilemma = dilemmas[currentDilemma];

  category.textContent = dilemma.category;

  question.textContent = dilemma.question;

  const number = String(currentDilemma + 1).padStart(2, "0");

  questionNumber.textContent = number;
  currentNumber.textContent = number;

  choices.forEach((choice, index) => {
    choice.classList.remove("selected");

    choice.querySelector(".choice-content strong").textContent =
      dilemma.options[index].title;

    choice.querySelector(".choice-content small").textContent =
      dilemma.options[index].description;
  });

  feedback.classList.remove("show");
  nextButton.classList.remove("show");

  answered = false;
}

function selectChoice(index) {
  if (answered) return;

  answered = true;

  const dilemma = dilemmas[currentDilemma];

  choices.forEach((choice, choiceIndex) => {
    choice.classList.toggle("selected", choiceIndex === index);
  });

  feedbackTitle.textContent = "Uma possibilidade de reflexão";

  feedbackText.textContent =
    dilemma.options[index].feedback;

  feedback.classList.add("show");

  if (currentDilemma < dilemmas.length - 1) {
    nextButton.textContent = "Próximo dilema →";
  } else {
    nextButton.textContent = "Recomeçar →";
  }

  nextButton.classList.add("show");
}

choices.forEach((choice, index) => {
  choice.addEventListener("click", () => {
    selectChoice(index);
  });
});

nextButton.addEventListener("click", () => {
  if (currentDilemma < dilemmas.length - 1) {
    currentDilemma++;
  } else {
    currentDilemma = 0;
  }

  loadDilemma();
});

loadDilemma();
