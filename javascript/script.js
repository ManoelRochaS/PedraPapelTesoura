/*Declaration of variables - Id, Class and Tags*/
const Title = document.getElementById("Title");
const boxButtons = document.getElementById("boxButtons");
const displayGame = document.getElementsByClassName("displayGame");
const displayIcons = document.getElementsByClassName("displayIcons");
const cardRules = document.getElementById("cardRules");
const cardDescription = document.getElementById("cardDescription");

/*Declaration of variables - Controls, Counts and dataBase*/
let controlEngine = true;
let controlTimeEngine = true;
let controlDisplayRules = true;
let controlTimeDisplayRules =  true;
let countWins = 0;
let countRounds = 0;
const listCharacters = ['✊','🖐','✌️'];
const listHTML = [
    `<h6 onclick="engine(0)">✊</h6><h6 onclick="engine(1)">🖐</h6><h6 onclick="engine(2)">✌️</h6>`,
    `<h4 onclick="nextRound()" class="buttonEngine">Iniciar rodada 2</h4>`,
    `<h4 onclick="nextRound()" class="buttonEngine">Iniciar rodada 3</h4>`,
    `<h4 onclick="reset()" class="buttonEngine">Reiniciar jogo</h4>`,
    `<h5>O jogo apresenta 3 opções a ser escolhida são elas: Pedra (✊), Papel (🖐) e Tesoura (✌️). Após a escolha de ambos os jogadores, é observado os seguintes cenários e dado o resultado:</h5><p>✊ vence ✌️</p><p>🖐 vence ✊</p><p>✌️ vence 🖐</p>`,
]

/*
    Declaration of main functions
    - function startGame (01)
    - function engine (02)
    - function nextRound (03)
    - function reset (04)
    - function displayRules (05)
*/

// ----- function startGame (01) -------------------------------------------------- Classification A ----- //
function startGame(){
    Title.innerText = toStringTitleRound();
    boxButtons.innerHTML = listHTML[0];
    displayGame[0].style.opacity = "0";
    setTimeout(()=>{
        displayGame[0].style.display = "none";
        displayGame[1].style.display = "flex";
        setTimeout(()=>{
            displayGame[1].style.opacity = "1";
        },200)
    },200)

}

// ----- function engine (02) ----------------------------------------------------- Classification B ----- //
function engine(nUSER){
    if(controlTimeEngine){
        controlTimeEngine = false;
        setTimeout(()=>{
            controlTimeEngine = true;
        },400);
        //Engine Logic
        let nPC = createNumberPC(Math.ceil(0), Math.floor(2));
        let resultRound = (nUSER == nPC) ? 0 : matchResult(nUSER, nPC);
        countWins += resultRound;
        countRounds += 1;
        //CSS
        setOpacityAnimation("0");
        setTimeout(()=>{
            Title.innerText = (countRounds == 3) ? toStringTitleWin() : toStringTitleWinRound(resultRound);
            displayIcons[0].innerText = listCharacters[nUSER];
            displayIcons[1].innerText = 'vs',
            displayIcons[2].innerText = listCharacters[nPC];
            boxButtons.innerHTML = listHTML[countRounds];
            setOpacityAnimation("1");
        },200)
    }
}

// ----- function nextRound (03) -------------------------------------------------- Classification C ----- //
function nextRound(){
    if(controlTimeEngine){
        controlTimeEngine = false;
        setTimeout(()=>{
            controlTimeEngine = true;
        },400);
        //CSS
        setOpacityAnimation("0");
        setTimeout(()=>{
            Title.innerText = toStringTitleRound();
            displayIcons[0].innerText = '';
            displayIcons[1].innerText = '',
            displayIcons[2].innerText = '';
            boxButtons.innerHTML = listHTML[0];
            setOpacityAnimation("1");
        },200)
    }
}

// ----- function reset (04) ------------------------------------------------------ Classification D ----- //
function reset(){
    if(controlTimeEngine){
        controlTimeEngine = false;
        setTimeout(()=>{
            controlTimeEngine = true;
        },400);
        //Reset Counts
        countWins = 0;
        countRounds = 0;
        //CSS
        setOpacityAnimation("0");
        setTimeout(()=>{
            Title.innerText = toStringTitleRound();
            displayIcons[0].innerText = '';
            displayIcons[1].innerText = '',
            displayIcons[2].innerText = '';
            boxButtons.innerHTML = listHTML[0];
            setOpacityAnimation("1");
        },200)
    }
}

// ----- function displayRules (05) ----------------------------------------------- Classification E ----- //
function displayRules(){
    if(controlTimeDisplayRules){
        controlTimeDisplayRules = false;
        setTimeout(()=>{
            controlTimeDisplayRules = true;
        },400);
        //CSS
        if(controlDisplayRules){
            setSizeDisplayRules(cardDescription, "100%");
            setSizeDisplayRules(cardRules, "100%");
            setTimeout(()=>{
                cardDescription.innerHTML = listHTML[4];
            },400)
            controlDisplayRules = false;
        }
        else{
            setSizeDisplayRules(cardDescription, "0");
            cardDescription.innerHTML = "";
            setTimeout(()=>{
                setSizeDisplayRules(cardRules, "0");
            },400)
            controlDisplayRules = true;
        }
    }
}

/*
    Declaration of auxiliary functions
    - function toStringTitleRound()             => A, C, D
    - function toStringTitleWinRound(result)    => B,
    - function toStringTitleWin()               => B,
    - function setOpacityAnimation(value)       => B, C, D
    - function createNumberPC(min, max)         => B, 
    - function matchResult(nUSER, nPC)          => B, 
    - function setSizeDisplayRules(id, value)   => E
*/

function toStringTitleRound(){
    return "Rodada " + (countRounds+1);
}

function toStringTitleWinRound(result){
    if(result==0){
        return "Rodada empate!"
    }
    return (result > 0) ? "Você ganhou a rodada!" : "Máquina ganhou a rodada!"
}

function toStringTitleWin(){
    if(countWins==0){
        return "Empate técnico!"
    }
    return (countWins > 0) ? "Você ganhou o jogo!" : "Máquina ganhou o jogo!";
}

function setOpacityAnimation(value){
    Title.style.opacity = value;
    displayIcons[0].style.opacity = value;
    displayIcons[1].style.opacity = value;
    displayIcons[2].style.opacity = value;
    boxButtons.style.opacity = value;
}

function createNumberPC(min, max){
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function matchResult(nUSER, nPC){
    return ((nUSER == 0 && nPC == 2) || (nUSER == 1 && nPC == 0) || (nUSER == 2 && nPC == 1)) ? +1 : -1;
}

function setSizeDisplayRules(id, value){
    id.style.width = value;
    id.style.height = value;
}