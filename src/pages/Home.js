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
                value: '---'
            },
            score2:{
                date : '---',
                value: '---'
            },
            score3:{
                date : '---',
                value: '---'
            }
        }
    }
    return scoreObj;
})();


let Home = {
    
    render: async () => {
        let view =  /*html*/`
            <section>
                <h1>Your Scores</h1>
                <div  class="score-wrapper">
                    <span class="score-position">#1</span>
                    <p class="score-date">${scores.score1.date}</p>
                    <h2 class="score-value">${scores.score1.value}</h2>
                </div>
                <div  class="score-wrapper">
                    <span class="score-position">#2</span>
                    <p class="score-date">${scores.score2.date}</p>
                    <h2 class="score-value">${scores.score2.value}</h2>
                </div>
                <div  class="score-wrapper">
                    <span class="score-position">#3</span>
                    <p class="score-date">${scores.score3.date}</p>
                    <h2 class="score-value">${scores.score3.value}</h2>
                </div>
                <button class="home-button"></button>
                <button id="play" class="play-button"></button>
            </section>
        `
        return view
    },
    after_render: async () => { }

}

export default Home;