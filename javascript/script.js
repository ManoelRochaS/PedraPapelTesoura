
/*Declaration of variables, helper counters, and vectors used in the script*/
let interfaceOne = document.getElementById("interfaceOne");
let interfaceTwo = document.getElementById("interfaceTwo");
let titleCurrent = document.getElementById("titleCurrent");
let user = document.getElementById("USER");
let editVS = document.getElementById("editVS");
let pc = document.getElementById("PC");
let optionOne = document.getElementById("OptionOne");
let optionTwo = document.getElementById("OptionTwo");
let optionTree = document.getElementById("OptionTree");
let next = document.getElementById("nextRound");
let resetGame = document.getElementById("resetGame");

let countRounds = 2;
let controlRoundsDisplay = 0;
let countResult = 0;

let vectorDisplay = ['flex', 'none'];
let vector = ['✊','🖐','✌️'];


/*Main functions*/
function start(){
    interfaceOne.style.display="none";
    interfaceTwo.style.display="flex";
    editTitleCurrent(1);
    editNext(true);
}

function engine(numberUser){

    let numberPc = randomPc(0,2);

    for(let i = 0; i < 3;i++){
        if(numberUser == i){
            user.innerText = vector[numberUser];
        }
        if(numberPc == i){
            pc.innerText = vector[numberPc];
        }
    }
    editVS.innerText = "vs";

    if(controlRoundsDisplay < 2){
        editDisplay(1,1,1,0,1);
        displayRound(numberUser, numberPc);
        controlRoundsDisplay++;
    }
    else{
        editDisplay(1,1,1,1,0);
        displayWin(numberUser, numberPc);
        controlRoundsDisplay = 0;
    }
}

function nextRound(){
    editDisplay(0,0,0,1,1);
    editNext(false);
    editTitleCurrent(countRounds);
    countRounds++;
}

function reset(){
    editDisplay(0,0,0,1,1);
    editNext(true);
    editTitleCurrent(1);
    countRounds = 2;
    countResult = 0;

}


/*Auxiliary functions*/
function editTitleCurrent(numero){
    titleCurrent.innerText = "Rodada "+numero;
}

function editNext(control){
    if(control){
        next.innerText = "Iniciar Rodada 2";
    }
    else{
        next.innerText = "Iniciar Rodada 3";
    }
    user.innerText='';
    editVS.innerText='';
    pc.innerText='';
}

function randomPc(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function editDisplay(n1,n2,n3,n4,n5){
    optionOne.style.display = vectorDisplay[n1];
    optionTwo.style.display = vectorDisplay[n2];
    optionTree.style.display = vectorDisplay[n3];
    next.style.display = vectorDisplay[n4];
    resetGame.style.display = vectorDisplay[n5];
}

function displayRound(nUser, nPc){
    if(nUser == nPc){
        titleCurrent.innerText = "Rodada Empate!";
    }
    else if((nUser == 0 && nPc == 2) || (nUser == 1 && nPc == 0) || (nUser == 2 && nPc == 1)){
        titleCurrent.innerText = "Você Ganhou a Rodada!";
        countResult++;
    }
    else{
        titleCurrent.innerText = "Máquina Ganhou a Rodada!"; 
        countResult--;    
    }   
}

function displayWin(nUser, nPc){
    if ((nUser == 0 && nPc == 2) || (nUser == 1 && nPc == 0) || (nUser == 2 && nPc == 1)){
        countResult++;
    }
    else{  
        countResult--;  
    } 

    if(countResult==0){
        titleCurrent.innerText = "Empate Técnico!";
    }
    else if(countResult > 0){
        titleCurrent.innerText = "Você ganhou o Jogo!";
    }
    else{
        titleCurrent.innerText = "Máquina ganhou o Jogo!";
    }
}
