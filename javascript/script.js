
/*Declaração de Constantes (Id e Class) - Start, Title, Interface, Users e buttons*/
const Start = document.getElementById("Start");
const Title = document.getElementById("Title");
const Interface = document.getElementsByClassName("Interface");
const Users = document.getElementsByClassName("Users");
const buttons = document.getElementsByClassName("buttons");

/*Declaração de Variáveis (Contadores) - countRounds, countRoundsDisplay e countResult*/
let countRounds = 2;
let countRoundsDisplay = 0;
let countResult = 0;

/*Declaração de Variáveis II (Vetores) - vetorDisplay e vetor*/
let vetorDisplay = ['flex', 'none'];
let vetor = ['✊','🖐','✌️'];

/*Funções Principais - () /Start/, engine(numberUser), nextRound() e reset() */
Start.addEventListener("click", ()=>{
    Interface[0].style.display = "none";
    Interface[1].style.display = "flex";
    reset();
})

function engine(numberUser){
    let numberPc = randomPC(Math.ceil(0), Math.floor(2));
    for(var i = 0; i < 3;i++){
        if(numberUser == i){
            Users[0].innerText = vetor[numberUser];
        }
        if(numberPc == i){
            Users[2].innerText = vetor[numberPc];
        }
    }
    Users[1].innerText = "vs";
    (countRoundsDisplay < 2) ? editDisplay(1,1,1,0,1) : editDisplay(1,1,1,1,0);
    (countRoundsDisplay < 2) ? displayRound(numberUser, numberPc) : displayWin(numberUser, numberPc);
    countRoundsDisplay = (countRoundsDisplay < 2) ? countRoundsDisplay+1 : 0;
}

function nextRound(){
    editDisplay(0,0,0,1,1);
    editNext(false);
    Title.innerText = toString(countRounds);
    countRounds++;
}

function reset(){
    editDisplay(0,0,0,1,1);
    editNext(true);
    Title.innerText = toString(1);
    countRounds = 2;
    countResult = 0;
}

/*Funções Auxiliares (CSS) - editDisplay(n1,n2,n3,n4,n5), editNext(control), displayRound(nUser, nPC) e displayWin(nUser, nPC)*/
function editDisplay(n1,n2,n3,n4,n5){
    let v = [n1,n2,n3,n4,n5]
    for(var i = 0; i < 5; i++){
        buttons[i].style.display = vetorDisplay[v[i]];
    }
}

function editNext(control){
    buttons[3].innerText = (control) ? "Iniciar Rodada 2":"Iniciar Rodada 3";
    for(var i = 0; i < 3; i++){
        Users[i].innerText = '';
    }
}

function displayRound(nUSER, nPC){
    if(nUSER == nPC){
        Title.innerText = "Rodada Empate!";
    }
    Title.innerText = (validate(nUSER, nPC)) ? "Você Ganhou a Rodada!" : "Máquina Ganhou a Rodada!";
    matchCounter(nUSER, nPC);
}

function displayWin(nUSER, nPC){
    matchCounter(nUSER, nPC);
    if(countResult==0){
        Title.innerText = "Empate Técnico!";
        return;
    }
    Title.innerText = (countResult > 0) ? "Você ganhou o Jogo!" : "Máquina ganhou o Jogo!";
}

/*Funções Auxiliares (Return e funções matemáticas) - toString(number), randomPC(min, max), validate(nUSER, nPC) e matchCounter(nUSER, nPC)*/
function toString(number){
    return "Rodada "+ number;
}

function randomPC(min, max){
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function validate(nUSER, nPC){
    return ((nUSER == 0 && nPC == 2) || (nUSER == 1 && nPC == 0) || (nUSER == 2 && nPC == 1))
}

function matchCounter(nUSER, nPC){
    countResult = (validate(nUSER, nPC)) ? countResult+1 : countResult-1;
}
