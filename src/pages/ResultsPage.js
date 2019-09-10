

function setBestScoreList(currScore) {
    let date = new Date();
    let month = date.getMonth();
    let day = date.getDate();
    let year = date.getFullYear();
    let today = `${day}/${month+1}/${year}`;
    console.log(today)
    const storage = window.localStorage;
    let scoreObj = {};

    if (storage.getItem("scores")) {
        scoreObj = JSON.parse(storage.getItem("scores"))
    }

    if(currScore > scoreObj.score1.value){
        scoreObj.score3 = Object.assign({},scoreObj.score2);
        scoreObj.score2 = Object.assign({},scoreObj.score1);
        scoreObj.score1.value = currScore;
        scoreObj.score1.date = today;
        storage.setItem('scores', JSON.stringify(scoreObj));
        return
    }else if(currScore > scoreObj.score2.value){
        scoreObj.score3 = Object.assign({},scoreObj.score2);
        scoreObj.score2.value = currScore;
        scoreObj.score2.date = today;
        storage.setItem('scores', JSON.stringify(scoreObj));
        return
    }else if(currScore > scoreObj.score3.value){
        scoreObj.score3.value = currScore;
        scoreObj.score3.date = today;
        storage.setItem('scores', JSON.stringify(scoreObj));
        return
    }
   
    

}
const endGame = (score) => {
    console.log(`Your score - ${score} points`)

    let view =  /*html*/`
                <section>
                    <p>CONTINENT QUIZ</p>
                    <h1>Results</h1>
                    <div  class="logo-wrapper">
                        <i class="material-icons logo">category</i>
                    </div>
                    <div  class="final-score">
                        <h1>Your Score</h1>
                        <p class="game-score">${score} pts</p>
                        <button id="finish" class="finish-button">Finish</button>
                    </div>
                   
                   
                </section>
            `;


    const content = null || document.querySelector('#app');
    content.innerHTML = view;

    setBestScoreList(score);

    const finish = document.querySelector('#finish');
    finish.addEventListener('click', function () {
        location.reload();
    })


}



export default endGame