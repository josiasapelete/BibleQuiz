let timeDown = document.querySelector(".time")
const optionInput = document.createElement("input");
let countdown = document.getElementById("countdown");
let getAPIURL;
let headerDiv = document.querySelector(".header");
headerDiv.style.display = "none"
const jouer = document.getElementById("jouer");
const plan = document.getElementById("plan");
const questionnaire = document.getElementById("questionnaire");
const verset = document.getElementById("verset");
const livre = document.getElementById("livre");
const playBtns = document.querySelector(".playBtns");
let high=""
let percent;
let note;
//Fetch l'api du quiz
// const getAPIURL = "https://restapi-six-gamma.vercel.app/";

jouer.addEventListener("click", () => {

    getAPIURL = "https://restapi-six-gamma.vercel.app/";
    fetchAPI()

    playBtns.style.display = "none"
    headerDiv.style.display = "block"
    high ="highScore";

})
plan.addEventListener("click", () => {

    getAPIURL = "https://restapi-six-gamma.vercel.app/type/plan";
    fetchAPI()

    playBtns.style.display = "none"
    headerDiv.style.display = "block"
    high ="planHighScore"

})
questionnaire.addEventListener("click", () => {
    getAPIURL = "https://restapi-six-gamma.vercel.app/type/passage";
    fetchAPI()

    playBtns.style.display = "none"
    headerDiv.style.display = "block"
    high ="passageHighScore"

})
verset.addEventListener("click", () => {
    getAPIURL = "https://restapi-six-gamma.vercel.app/type/verset";
    fetchAPI()

    playBtns.style.display = "none"
    headerDiv.style.display = "block"

    high ="versetHighScore"

})
livre.addEventListener("click", () => {
    getAPIURL = "https://restapi-six-gamma.vercel.app/type/livre";
    fetchAPI()

    playBtns.style.display = "none"
    headerDiv.style.display = "block"

    high ="livreHighScore"

})
let totalDuration =300


let duree= document.querySelector(".duree")
let dix= document.getElementById("dix");
let vingt= document.getElementById("vingt");
let trente= document.getElementById("trente");

duree.innerHTML = formatTime(totalDuration)

dix.addEventListener("click",()=>{
    totalDuration = 600
    duree.innerHTML = formatTime(totalDuration)
})
vingt.addEventListener("click",()=>{
    totalDuration = 1200
    duree.innerHTML = formatTime(totalDuration)

})
trente.addEventListener("click",()=>{
    totalDuration = 1800
    duree.innerHTML = formatTime(totalDuration)

})
function fetchAPI() {
    fetch(getAPIURL)
        .then(res => res.json())
        .then(data => {
            const Questions = data;

            function shuffleArray(array) {
                const shuffledArray = [...array];
                for (let i = shuffledArray.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    // Echange la position des éléments
                    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];

                }
                return shuffledArray;
            }

            // Utilisation
            const questions = shuffleArray(Questions);




            let container = document.createElement("div");
            container.setAttribute('id', 'container');
            let title = document.createElement("div");
            let h1 = document.createElement("h1");
            h1.innerHTML = "Bible Quiz 2023";
            title.appendChild(h1);
            container.appendChild(title);
            let desc = document.createElement("div");
            desc.classList.add("desc");
            desc.innerHTML = "Merci d'avoir Participer au Jeu ";
            container.appendChild(desc);
            let bestScore = document.createElement("div");
            let start = document.createElement("div");
            start.classList.add("btn")
            bestScore.classList.add("btn")
            start.setAttribute('id', 'start');
            bestScore.setAttribute('id', 'bestScore');
            bestScore.innerHTML = "Meilleurs Score";
            start.innerHTML = " Commencer";
            container.appendChild(bestScore);
            container.appendChild(start);


            finish = container;


            const quizContainer = document.getElementById("body");
            const app = document.getElementById("app");
            const startBtn = document.getElementById("start");
            const score = document.getElementById("score");
            let point = 0;
            let total = 0;
            let info = ""
            const submitButton = document.getElementById("submit-button");
            let userResponses = "";


            function shuffleOptions(options) {
                for (let i = options.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [options[i], options[j]] = [options[j], options[i]];
                }
                return options;
            }
         
            let skip = "";
            let questionIndex = 0;
            let duration =totalDuration; // Durée en secondes pour répondre à chaque question
            let durationTime; // Variable pour stocker l'ID de l'intervalle

            function displayQuestion(question) {

                const questionDiv = document.createElement("div");
                questionDiv.classList.add("qa_set");
                const questionTitle = document.createElement("h4");
                questionTitle.classList.add("question");
                questionTitle.innerText = question.question;
                let questionCount = document.createElement("div");
                questionCount.classList.add("count");
                questionCount.innerHTML = `Question ${questionIndex + 1}/ ${questions.length}`
                questionTitle.appendChild(questionCount);
                questionDiv.appendChild(questionTitle);
                const optionsList = document.createElement("ul");
                shuffleOptions(question.options).forEach((option, index) => {
                    const optionItem = document.createElement("li");
                    optionItem.classList.add("option");
                    const optionInput = document.createElement("input");
                    optionInput.setAttribute("type", "radio");
                    optionInput.setAttribute("name", `question-${question._id}`);
                    optionInput.setAttribute("value", option);
                    optionInput.addEventListener("click", (event) => {
                        const selectedOption = event.target.value;
                        if (selectedOption == question.answer) {
                            optionInput.setAttribute("valid", true);
                            point += 10;
                            score.innerHTML = point;
                        } else {

                            const allOptions = document.querySelectorAll(`input[name="question-${question._id}"]`);
                            allOptions.forEach((opt) => {
                                if(opt.value == question.answer){
                                    const good  = opt.parentNode
                                    good.setAttribute("valid",true)
                                    good.classList.add("answer")
                                }
                            });

                            

                        }
                        // Désactiver toutes les options de réponse après que l'utilisateur a fait son choix
                        const allOptions = document.querySelectorAll(`input[name="question-${question._id}"]`);
                        allOptions.forEach((opt) => {
                            opt.disabled = true;
                        });
                        // Arrêter le décompteur de temps après que l'utilisateur a fait son choix
                        // clearInterval(durationTime);

                        total = point;
                        percent= (total/ (questions.length*10))*100
                        note =parseFloat(percent.toFixed(2))
                        best(note)

                    });
                    optionItem.appendChild(optionInput);
                    const optionLabel = document.createElement("span");
                    optionLabel.innerText = option;
                    optionItem.appendChild(optionLabel);
                    optionsList.appendChild(optionItem);
                });
                questionDiv.appendChild(optionsList);
                const buttons = document.createElement("div");
                buttons.classList.add("buttons");
                const nextButton = document.createElement("button");
                const restart = document.createElement("button");
                restart.classList.add("restart")
                nextButton.classList.add("nextBtn");
                buttons.appendChild(restart);
                buttons.appendChild(nextButton);
                skip = "Suivant";
                nextButton.innerText = skip;
                restart.innerHTML = "Restart"
                nextButton.addEventListener("click", () => {
                    questionIndex++;
                    if (questionIndex < questions.length) {
                        const nextQuestion = questions[questionIndex];
                        quizContainer.innerHTML = "";
                        // countdown.innerHTML = duration;

                    clearInterval(durationTime);

                        displayQuestion(nextQuestion);
                    } else {
                        // Toutes les questions ont été affichées
                        total = point;
                        percent= (total/ (questions.length*10))*100
                        note =parseFloat(percent.toFixed(2))
                        best(note)
                        app.innerHTML = `
                <div id="container">
                    <div class="title">
                    <h1>Bible Quiz 2023</h1>
                    </div>
                    <div class="container">
                    <h2>Votre Score</h2>
                    <div class="cover"><img src="crown.png" alt="bestScore"></div>

                    <p class="point"> <span class="color">${info}</span> </p>
                    <p class="point">Vous Avez <span class="color">${total} / ${questions.length * 10} <br> ${note} % </span> </p>

                    </div>
                    <a href="index.html" class="btn" id="start">Recommencer</a>
                    </div>
                    `;

                    }
                });
                restart.addEventListener("click", () => {

                    if (confirm("Êtes-vous sûr de vouloir Quitter cette partie ?")) {
                        // Code à exécuter si l'utilisateur clique sur le bouton "OK"

                        location.href = "index.html"
                    }

                })
                questionDiv.appendChild(buttons);
                quizContainer.appendChild(questionDiv);

                // Débuter le décompteur de temps pour cette question
                
                  
                  // Utilisation de la fonction fixedInterval
                  durationTime = fixedInterval(function() {
                    duration -= 1;
                    countdown.innerHTML = formatTime(duration);
                    timeDown.style.width = `${(duration / totalDuration) * 100}%`;
                    if (duration <= 0) {
                        duration = 0;
                     countdown.innerHTML = duration;


                        const allOptions = document.querySelectorAll(`input[name="question-${question._id}"]`);

                        
                        // Désactiver toutes les options de réponse lorsque le temps est écoulé
                        allOptions.forEach((opt) => {
                            opt.disabled = true;
                        });
                            allOptions.forEach((opt) => {
                                if(opt.value == question.answer){
                                    const good  = opt.parentNode
                                    good.setAttribute("valid",true)
                                    good.classList.add("answer")
                                }})
                        // Arrêter le décompteur de temps lorsqu'il atteint zéro
                        clearInterval(durationTime);

                        total = point;
                        percent= (total/ (questions.length*10))*100
                        note =parseFloat(percent.toFixed(2))
                        best(note)
                        skip = "<a href='index2.html'>Voir le score</a>";
                        nextButton.innerHTML = "Voir Le score";
                        nextButton.addEventListener("click", () => {

                            app.innerHTML = `
                                <div id="container">
                    <div class="title">
                    <h1>Bible Quiz 2023</h1>
                    </div>
                    <div class="container">
                    <h2>Votre Score</h2>
                    <div class="cover"><img src="crown.png" alt="bestScore"></div>

                    <p class="point"> <span class="color">${info}</span> </p>
                    <p class="point">Vous Avez <span class="color">${total} / ${questions.length *10} <br> ${note} % </span> </p>

                    </div>
                    <a href="index.html" class="btn" id="start">Recommencer</a>
                    </div>
        `;
                        })
                    }
                }, 1000);

            }

            // Commencer le quiz avec la première question
            displayQuestion(questions[questionIndex]);
        })
        .catch(err => console.log(err))


}






function best(currentScore) {


    // localStorage.setItem("highScore", null);
    // const points = localStorage.getItem("points");

   let  highScore = localStorage.getItem(`${high}`);

    if (highScore === null) {
        highScore = 0;
    } else {
        highScore = parseInt(highScore);
    }

    if (currentScore > highScore) {
        info = "Félicitation pour votre nouveau Meilleur Score"
        localStorage.setItem(`${high}`, currentScore.toString());
        highScore = currentScore;
    }

}
function formatTime(seconds) {
    var minutes = Math.floor(seconds / 60);
    var remainderSeconds = seconds % 60;
    return `${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;
  }
  
  function fixedInterval(callback, delay) {
    return setInterval(function() {
    callback()
    }, delay);
  }

