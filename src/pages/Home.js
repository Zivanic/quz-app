require("regenerator-runtime/runtime");

const scores = (function(){

    const storage = window.localStorage;
    let scoreObj = {};

    if(storage.getItem("scores")){
        scoreObj = JSON.parse(storage.getItem("scores"))
    }else{
        scoreObj = {
            score1:{
                date : '---',
                value: 0
            },
            score2:{
                date : '---',
                value: 0
            },
            score3:{
                date : '---',
                value: 0
            }
        }
    }
    storage.setItem('scores', JSON.stringify(scoreObj));
    return scoreObj;
})();


let Home = {
    
    render: async () => {
        let view =  /*html*/`
            <section>
                <p>CONTINENT QUIZ</p>
                <h1>Your Scores</h1>
                <div  class="score-wrapper">
                    <span class="score-position">#1</span>
                    <div>
                        <p class="score-date">on ${scores.score1.date}</p>
                        <h2 class="score-value">${scores.score1.value} pts</h2>
                    </div>
                </div>
                <div  class="score-wrapper">
                    <span class="score-position">#2</span>
                    <div>
                        <p class="score-date">on ${scores.score2.date}</p>
                        <h2 class="score-value">${scores.score2.value} pts</h2>
                    </div>
                </div>
                <div  class="score-wrapper">
                    <span class="score-position">#3</span>
                    <div>
                        <p class="score-date">on ${scores.score3.date}</p>
                        <h2 class="score-value">${scores.score3.value} pts</h2>
                    </div>
                </div>
                <button class="home-button"><i class="material-icons">house</i></button>
                <button id="play" class="play-button"><i class="material-icons">category</i>Play</button>
            </section>
        `
        return view
    },
    after_render: async () => { }

}

export default Home;