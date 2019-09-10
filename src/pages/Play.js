import endGame from './ResultsPage.js'

//create function for randomize order of array
function shuffle(arr) {
    let ctr = arr.length;
    let temp;
    let index;

    // While there are elements in the array
    while (ctr > 0) {
        // Pick a random index
        index = Math.floor(Math.random() * ctr);
        // Decrease ctr by 1
        ctr--;
        // And swap the last element with it
        temp = arr[ctr];
        arr[ctr] = arr[index];
        arr[index] = temp;
    }
    return arr;
}


const Game = async () => {


    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    };
    try {
        const response = await fetch(`https://api.myjson.com/bins/a6da9`, options)
        const data = await response.json();

        const arrContinents = data;
        //get uniq list of continents
        let posibleAnswers = [...new Set(arrContinents.map(x => x.continent))];
        let playerScore = 0;
        let qustionNum = 0;
        //get 5 random uniq obj from arr to create questions
        let getQuestions = () => {
            const questionNum = 5;
            let arr = arrContinents;
            let roundQuestions = [];
            for (let i = 0; i < questionNum; i++) {

                let randNum = Math.floor(Math.random() * arr.length)
                roundQuestions.push(arr[randNum]);
                arr.splice(randNum, 1);

            }
            return roundQuestions;
        }

        let roundQuestions = getQuestions();

        function playGame() {

            if (roundQuestions.length != 0) {
                let answers = [];
                //storing right answer to arr 
                const rightAnswer = roundQuestions[0].continent
                const img = roundQuestions[0].image;
                answers.push(rightAnswer);
                //adding two wrong answers
                let wrongAnswers = [...posibleAnswers];
                while (answers.length < 3) {

                    let randNum = Math.floor(Math.random() * wrongAnswers.length)

                    if (wrongAnswers[randNum] != rightAnswer) {
                        answers.push(wrongAnswers[randNum]);
                        wrongAnswers.splice(randNum, 1);
                    }


                }

                qustionNum++;

                //Randomly set position of answers
                shuffle(answers)

                setQuestion(img, answers, rightAnswer, qustionNum)

                //remove question from arr
                roundQuestions.shift();

            } else {
                endGame(playerScore)
            }
        }


        function checkResult() {

            //check if answer is already selected
            if (this.parentElement.classList.contains('active')) {
                return
            }

            this.parentElement.classList.add('active');
            this.classList.add('selected');

            let selectedAnswer = this.querySelector('p').innerHTML;
            let rightAnswer = this.rightAnswer
            const rightAnswerValue = 750;
            //check if aswer is correct and calculate points

            if (selectedAnswer == rightAnswer) {
                playerScore += rightAnswerValue
                let right = this.querySelector(".mark");
                right.classList.add('right');
                right.innerHTML = 'done';
            }else{
                let wrong = this.querySelector(".mark");
                wrong.classList.add('wrong');
                wrong.innerHTML = 'clear';
                let answer;
                for (const a of document.querySelectorAll(".answer")) {
                    if (a.textContent.includes(rightAnswer)) {
                        answer = a;
                    }
                  }

                  let right = answer.querySelector(".mark");
                  right.classList.add('right');
                  right.innerHTML = 'done';

            }

            let next = document.querySelector('#next');
            next.classList.remove('hidden');
            next.addEventListener('click', playGame);

        }

        function setQuestion(img, answers, rightAnswer, round) {
            // console.log(img + '-' + answers + '-' + rightAnswer);
            let view =
                ` <section>
                <p>CONTINENT QUIZ</p>
            <h1>Question ${round} of 5</h1>
            <div id="image-wrapper">
                <figure>
                    <img src=${img} alt="Image of continent">
                </figure>
            </div>
            <div class="answer-wrapper">
                <div class="answer"><i class="material-icons">category</i><p>${answers[0]}</p><span class="mark material-icons"></span></div>
                <div class="answer"><i class="material-icons">category</i><p>${answers[1]}</p><span class="mark material-icons"></span></div>
                <div class="answer"><i class="material-icons">category</i><p>${answers[2]}</p><span class="mark material-icons"></span></div>
            </div>
            <button id="next" class="play-button hidden">NEXT</button>
        </section>`;

            const content = null || document.querySelector('#app');
            content.innerHTML = view;
            let selected = document.querySelectorAll('.answer');

            selected.forEach(function (el) {
                el.addEventListener('click', checkResult);
                el.rightAnswer = rightAnswer;
            });

        }


        playGame();

    } catch (err) {
        console.log('Error getting documents', err)
    }
}



export default Game;
