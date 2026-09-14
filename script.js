const dilemmas = [
    {
        category: "PRIVACIDADE",
        question:
            "Um aplicativo pede acesso aos seus contatos para funcionar corretamente. Você permitiria?",
        answers: [
            {
                title: "Sim, permitiria",
                description: "Quero usar o aplicativo sem limitações.",
                reflection:
                    "Antes de permitir, vale perguntar: o aplicativo realmente precisa desses dados para funcionar?"
            },
            {
                title: "Não, recusaria",
                description: "Minha privacidade vem primeiro.",
                reflection:
                    "Conceder apenas as permissões necessárias é uma forma simples de proteger seus dados."
            }
        ]
    },

    {
        category: "REDES SOCIAIS",
        question:
            "Você recebe uma notícia chocante em um grupo, mas não encontra nenhuma fonte confiável. O que faria?",
        answers: [
            {
                title: "Compartilharia",
                description: "Outras pessoas precisam saber disso.",
                reflection:
                    "Uma informação falsa pode se espalhar muito rapidamente quando compartilhada sem verificação."
            },
            {
                title: "Verificaria primeiro",
                description: "Procuraria uma fonte confiável.",
                reflection:
                    "Verificar a fonte, a data e outras publicações é uma boa prática contra a desinformação."
            }
        ]
    },

    {
        category: "INTELIGÊNCIA ARTIFICIAL",
        question:
            "Uma ferramenta de IA produz praticamente todo o seu trabalho escolar. Você entregaria o resultado sem alterar nada?",
        answers: [
            {
                title: "Entregaria",
                description: "A ferramenta já fez praticamente tudo.",
                reflection:
                    "Usar uma ferramenta não elimina a responsabilidade sobre aquilo que você entrega."
            },
            {
                title: "Usaria como apoio",
                description: "Revisaria e produziria minha própria versão.",
                reflection:
                    "Quando usada como apoio, a IA pode ajudar sem substituir seu entendimento e sua participação."
            }
        ]
    },

    {
        category: "PRIVACIDADE",
        question:
            "Você encontra uma foto antiga de um amigo que pode deixá-lo constrangido. O que faria?",
        answers: [
            {
                title: "Publicaria",
                description: "Seria apenas uma brincadeira.",
                reflection:
                    "Uma brincadeira para uma pessoa pode ser constrangedora para outra, especialmente quando fica registrada online."
            },
            {
                title: "Não publicaria",
                description: "Prefiro respeitar a privacidade.",
                reflection:
                    "Pensar no impacto sobre outras pessoas também faz parte de uma postura responsável no ambiente digital."
            }
        ]
    },

    {
        category: "SEGURANÇA DIGITAL",
        question:
            "Você recebe uma mensagem dizendo que ganhou um prêmio. Para recebê-lo, precisa informar sua senha. O que faria?",
        answers: [
            {
                title: "Informaria",
                description: "Não quero perder a oportunidade.",
                reflection:
                    "Senhas são informações pessoais e não devem ser fornecidas para receber supostos prêmios."
            },
            {
                title: "Ignoraria",
                description: "Primeiro verificaria a mensagem.",
                reflection:
                    "Desconfiar de mensagens inesperadas e confirmar sua origem ajuda a evitar golpes."
            }
        ]
    }
];


let currentDilemma = 0;
let answered = false;


/* ELEMENTOS */

const categoryElement = document.getElementById("category");
const questionElement = document.getElementById("question");

const currentElement = document.getElementById("current");
const totalElement = document.getElementById("total");

const dilemmaNumberElement =
    document.getElementById("dilemaNumber");

const answerButtons =
    document.querySelectorAll(".answer");

const resultElement =
    document.getElementById("result");

const resultTitle =
    document.getElementById("resultTitle");

const resultText =
    document.getElementById("resultText");

const nextButton =
    document.getElementById("next");


/* TOTAL */

totalElement.textContent =
    String(dilemmas.length).padStart(2, "0");


/* CARREGAR DILEMA */

function loadDilemma() {

    const dilemma = dilemmas[currentDilemma];

    const number =
        String(currentDilemma + 1).padStart(2, "0");

    categoryElement.textContent =
        dilemma.category;

    currentElement.textContent =
        number;

    dilemmaNumberElement.textContent =
        `DILEMA ${number}`;

    questionElement.textContent =
        dilemma.question;


    answerButtons.forEach((button, index) => {

        const answer = dilemma.answers[index];

        const title =
            button.querySelector(".answer-text strong");

        const description =
            button.querySelector(".answer-text small");

        title.textContent = answer.title;

        description.textContent = answer.description;

        button.classList.remove("selected");
    });


    resultElement.classList.remove("visible");

    nextButton.classList.remove("visible");

    answered = false;
}


/* ESCOLHER RESPOSTA */

answerButtons.forEach((button) => {

    button.addEventListener("click", () => {

        if (answered) {
            return;
        }

        answered = true;

        const answerIndex =
            Number(button.dataset.answer);

        const dilemma =
            dilemmas[currentDilemma];

        const selectedAnswer =
            dilemma.answers[answerIndex];


        answerButtons.forEach((item) => {
            item.classList.remove("selected");
        });

        button.classList.add("selected");


        resultTitle.textContent =
            "Para refletir";

        resultText.textContent =
            selectedAnswer.reflection;

        resultElement.classList.add("visible");


        nextButton.classList.add("visible");


        if (
            currentDilemma ===
            dilemmas.length - 1
        ) {
            nextButton.innerHTML =
                'Recomeçar <span>→</span>';
        } else {
            nextButton.innerHTML =
                'Próximo dilema <span>→</span>';
        }

    });

});


/* PRÓXIMO */

nextButton.addEventListener("click", () => {

    if (
        currentDilemma <
        dilemmas.length - 1
    ) {
        currentDilemma++;
    } else {
        currentDilemma = 0;
    }

    loadDilemma();

    document
        .querySelector("#dilemas")
        .scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

});


/* INICIAR */

loadDilemma();