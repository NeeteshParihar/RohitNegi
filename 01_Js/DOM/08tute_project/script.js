import { questions } from './questions.js';


// type="module" must be added inorder to use import statement 

const navsContainer = document.querySelector(".navs");
const questionContainer = document.querySelector(".question");

const resultContainer = document.querySelector(".result");
const scorePara = document.querySelector(".score");
const resetButton = document.querySelector(".reset")
const container = document.querySelector(".container");


function getUniqueQuestions2(count) {

    const setQ = new Set();
    if (count > questions.length) count = questions.length;

    while (setQ.size < count) {

        const index =
            Math.floor(Math.random() * (questions.length));

        if (!setQ.has(index))
            setQ.add(index);

    }

    return [...setQ];
}

function swap( i , j , arr){

    // const temp = arr[i] ;
    // arr[i] = arr[j] ;
    // arr[j] = temp ;

    // // or  using destructing 

    [arr[i] , arr[j]] = [ arr[j] , arr[i] ] ;
}



function getUniqueQuestions(count){
    let len = questions.length ;
    const ans = [] ;


    // we are creating count random values from the last of the array 
    // and using those count values 

    while(ans.length < count){

        const index = Math.floor(Math.random()*len) ;
        ans.push(len-1) ;
        swap(index , len-1 , questions) ;
        len-- ;       

    }

    return ans ; 

}


function getUniqueQuestions3(count){

    // arrange questions  randomly 

    questions.sort(()=>{
        Math.random() - 0.5 
    })

    const ans = new Array(count) ;

    for(let i = 0 ; i < count ; i++){
        ans[i] = i ;
    }


    return ans ;    
}

const uniqueQuestions = getUniqueQuestions(5);

const obj = {selected : false , option : null} 

const visited =[] ;

for( let i = 0 ; i < 5 ; i++){
    visited.push(JSON.parse(JSON.stringify(obj))) ;
}

function updateScore(newScore) {
    score = newScore;
    scorePara.innerHTML = `score : ${score} / ${uniqueQuestions.length}`
}

function getTarget(event) {
    return event.target;
}

function getQuestion(index) {
    return questions[uniqueQuestions[index]];
}

let index = 0;
let Answer = null;
let score = 0;


function display(index) {

    console.log(index);

    questionContainer.innerHTML = "";

    const { question, options, correctAnswer } = getQuestion(index);

    const para = document.createElement("p");
    para.textContent = `Q${index + 1}. ${question}`;
    para.classList.add(`q${index + 1}`);
    questionContainer.append(para);

    Answer = correctAnswer;

    options.forEach((option) => {
        const optionButton = document.createElement("button");
        optionButton.textContent = option;
        optionButton.value = option;
        optionButton.classList.add("option");

        questionContainer.append(optionButton);

        // console.log(visited[index].selected);

        if(visited[index].selected ){

            if(visited[index].option === option && option === correctAnswer ){
                optionButton.classList.add("correct-choice") ;
            }else if(visited[index].option === option && option != correctAnswer ){
                optionButton.classList.add("incorrect-choice") ;

            }
        }

    })

    const submitButton = document.createElement("button");
    submitButton.textContent = "submit";
    submitButton.classList.add("submit")

    questionContainer.append(submitButton);

}


display(index);


navsContainer.addEventListener("click", (event) => {



    const target = getTarget(event);

    if (target.tagName != "BUTTON") return;

    if (target.id === "left" && index > 0) {
        index--;
        display(index);

    } else if (target.id === "right" && index < uniqueQuestions.length - 1) {
        index++;
        display(index);
    }

})


console.log(visited);


questionContainer.addEventListener("click", (event) => {

    console.log("clicked") ;

    const optionButton = getTarget(event);

    if (optionButton.tagName != "BUTTON") return;

    if (optionButton.classList.contains("option")) {

        if (visited[index].selected) return;

        console.log(visited[index]) ;

        visited[index].selected = true;
        console.log(visited);

        visited[index].option = optionButton.value;

        const choice = optionButton.value;
        if (choice == Answer) {
            updateScore(score + 1);
            optionButton.classList.add("correct-choice")
        } else {
            optionButton.classList.add("incorrect-choice");
            console.log(optionButton) ;

        }

        console.log(visited);



    } else {


        resultContainer.classList.remove("hide");
        resultContainer.classList.add("show");
        container.classList.add("hide");

    }




})


resetButton.addEventListener("click", () => {
    container.classList.add("show");
    container.classList.remove("hide");
    resultContainer.classList.add("hide" ) ;
    resultContainer.classList.remove("show") ;


    questionContainer.innerHTML = "" ;
    index = 0 ;
    
    for( let i = 0 ; i < 5 ; i++){
        visited[i] = JSON.parse(JSON.stringify(obj)) ;
    }
    display(index) ;

})




