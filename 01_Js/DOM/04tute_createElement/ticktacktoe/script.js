

const board = document.getElementById("board");
const container = document.getElementById("container");
const restartButton = document.querySelector("button") ;
const messagePara = document.querySelector("p") ;
const rows = 3, colms = 3;

let move = 0 ;

const boardArray = [
    [-1 ,-1,-1 ],
    [-1 ,-1,-1 ],
    [-1 ,-1,-1 ]
];

// -1  represents unused blocks 
// 0 represent marked with 0 
// 1 represent marked with X


for(let i = 0 ; i < rows ; i++){
    for( let j = 0 ; j < colms ; j++){

        console.log(`${i}${j}`) ;

        const block = document.createElement("span") ;
        block.dataset.row = i ;
        block.dataset.col = j ;
        board.append(block) ;
        // block.style.width = "15px";
        // block.style.height = "15px";
        // the css inserted here is inline css which is not good idea to attach 


    }
}


function updateboard(i  , j , move){
    boardArray[i][j] = move ;
}


function checkBoard(){

    let isFinished = true ;
    for( let i = 0 ; i < rows ; i++){
        for(let j = 0 ; j < colms ; j++){
            if(boardArray[i][j] == -1){
                isFinished = false ;
                break ;
            }
        }
    }

    let win = false ;

    for( let i = 0 ; i < rows ; i++){

        let ans = true ;

        for( let j = 0 ; j < colms ; j++){

            if(boardArray[i][j] == -1) {
                ans = false ;
                break ;
            } ;
            ans = 
            ans && boardArray[i][0] == boardArray[i][j] ;

        }

        if(ans){
            win = true ;
            break ;
        }

    }


    for( let j = 0 ; j < colms  && !win ; j++){

        let ans = true ;

        for( let i = 0 ; i < rows ; i++){

            if(boardArray[i][j] == -1) {
                ans = false ;
                break ;
            } ;
            ans = 
            ans && boardArray[0][j] == boardArray[i][j] ;

        }

        if(ans){
            win = true ;
            break ;
        }

    }


    let i = 0 ; j = 0 ;
    let ans = true ;

    while( i < rows && j < colms && !win){

        if(boardArray[i][j] == -1) {
            ans = false ;
            break ;
        } ;
        ans = ans &&
        boardArray[0][0] == boardArray[i][j] ;

        i++ ;
        j++ ;

    }

    if(ans) win = true ;

    i = 2 , j = 0 ;
    ans = true ;
    while( i > 0 && j < colms && !win){


        if(boardArray[i][j] == -1) {
            ans = false ;
            break ;
        } ;
        ans = ans &&
        boardArray[2][0] == boardArray[i][j] ;

        i--;
        j++ ;
    }



   if(win){       
        messagePara.innerHTML = `winner is ${move == 0 ? "X" : "O"}` ;   
        restartButton.style.display = "block" ;
         messagePara.style.display = "block" 
    
    }

    if(isFinished && !win){
       
        messagePara.innerHTML = "It's a draw. Restart the game." ;
        restartButton.style.display = "block" ;
        messagePara.style.display = "block" ;
        

    }

       


}

board.addEventListener("click" , (target)=>{
    const block = target.srcElement ;
    
    const i = block.dataset.row ;
    const j = block.dataset.col ;

    if(boardArray[i][j] != -1) return ;
    
    updateboard(i , j , move) ;
    checkBoard() ;

    if(move == 0){
        block.innerHTML = "X" ;
        block.classList.add("even") ;
        move = 1 ;
    }else {
        block.innerHTML = "O" ;
        move = 0 ;
        block.classList.add("odd") ;

    }
    

})



restartButton.addEventListener("click" , ()=>{

    move = 0 ;

    const spans = document.querySelectorAll("span") ;

    for( let span of spans ){
        span.innerHTML = "" ;
        span.classList.remove("odd") ;
        span.classList.remove("even") ;
    }


    boardArray[0] = [-1,-1 ,-1] ;
    boardArray[1] = [-1,-1 ,-1] ;
    boardArray[2] = [-1,-1 ,-1] ;

    messagePara.style.display = "none";
    messagePara.innerHTML = "";
        restartButton.style.display = "none" ;

})