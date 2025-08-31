let options = [
  {
    name: 'HTML',
    type: 'Markup',
    image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg',
  },
  {
    name: 'CSS',
    type: 'Stylesheet',
    image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg',
  },
  {
    name: 'JavaScript',
    type: 'Programming',
    image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
  },
  {
    name: 'React',
    type: 'Library',
    image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
  },
  {
    name: 'Node.js',
    type: 'Runtime',
    image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
  },
  {
    name: 'Python',
    type: 'Programming',
    image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
  },
  {
    name: 'SQL',
    type: 'Database',
    image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg',
  },
  {
    name: 'Git',
    type: 'Version Control',
    image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg',
  }
];



const final_options = options.concat(options);
console.log(final_options)


const start_game  = document.querySelector('#start-game');
const reset_game = document.querySelector('#reset-game');
let isChecking = false

let shuffledOptions = final_options.sort(()=>Math.random()-0.5);
console.log(shuffledOptions)

let gameBoard = document.querySelector('.game-board');
let timerDisplay = document.querySelector('.timer');
let movesDisplay = document.querySelector('#moves');
let pairCountDisplay = document.querySelector('#pairs-found');

let start = 0;
let secondi = 0;
let minuti = 0;
let ore = 0;
let classifica = JSON.parse(localStorage.getItem('classifica')) || [];
let  scores = [];

const hour = document.querySelector('#ore');
const minute = document.querySelector('#minuti');
const second = document.querySelector('#secondi');
const modal = document.querySelector('.modal');

const modalAction = document.querySelector('.modal-action');

const timer =  () =>{
const start_date = new Date().getDate();
const start_time = new Date().getHours();

start++;
secondi++

if(secondi == 60){
    secondi = 0;
    minuti++;
    if(minuti == 60){
        minuti = 0;
        ore++;
    }



}





console.log(secondi,'secondi')

// timerDisplay.textContent =   ore ? `${ore}h : ${minuti}m : ${secondi}a `  : minuti ? `${minuti}m : ${secondi}s` : `${secondi}s`

ore ? hour.textContent = `${ore}h` : hour.textContent = '';
minuti ? minute.textContent = `${minuti}m` : minute.textContent = '';
secondi ? second.textContent = `${secondi}s` : second.textContent = '';



}



function createGameBoard () {
 gameBoard.innerHTML = '';
    for(let i = 0; i < shuffledOptions.length; i++) {
        let card = document.createElement('div');
        card.classList.add('flip-card');

        let inner = document.createElement('div');
        inner.classList.add('flip-card-inner');
        let front = document.createElement('div');
        front.classList.add('flip-card-front');
        let back = document.createElement('div');
        back.classList.add('flip-card-back');
        // let img = document.createElement('img');
        // img.src =  `https://i.imgur.com/Yo0QwVQ.jpeg`
        let back_img = document.createElement('img');
        back_img.src =  shuffledOptions[i].image


 back.dataset.name = shuffledOptions[i].name;
 back.appendChild(back_img);

        // front.appendChild(img);
        front.textContent =  '⚡';

        inner.appendChild(front);
        inner.appendChild(back);
        card.appendChild(inner);






        gameBoard.appendChild(card);
    }


}

let timerId = null;

const startGame = () => {
   start_game.disabled = true ;
    start_game.style.cursor= 'not-allowed';
    gameBoard.innerHTML = '';
    
    document.querySelector('.timer').style.display = 'grid';
    shuffledOptions = final_options.sort(() => Math.random() - 0.5)

    createGameBoard();

 timerId =     setInterval(timer,1000);
 let time;
 let moves = null;



    let choiceOne =null;
    let choiceTwo = null;
    let coppieTrovate = 0;





    let cards = document.querySelectorAll('.flip-card-inner');


document.querySelectorAll('flip-card-inner').forEach((card) => {
        card.classList.add('is-flipped');



    })


   const checkMatch = () => {
    isChecking = true; // blocca altri click

    setTimeout(() => {
        if (isCombinbation(choiceOne, choiceTwo)) {
             coppieTrovate++;
            choiceOne.classList.remove('is-flipped');
            choiceTwo.classList.remove('is-flipped');
            choiceOne.classList.add('isCorrect');
            choiceTwo.classList.add('isCorrect');
         
            pairCountDisplay.textContent = `${coppieTrovate}/8`; // Aggiorna il conteggio delle coppie trovate

          winningGame(coppieTrovate,timer);






        } else {
            choiceOne.classList.remove('is-flipped');
            choiceTwo.classList.remove('is-flipped');
        }

        choiceOne = null;
        choiceTwo = null;
        isChecking = false; // sblocca click
    }, 1000);






};



//           const resetGame  = () =>{
//     clearInterval(timer);
//     moves = 0;
//     movesDisplay.textContent = '0';
//     coppieTrovate = 0;
//     pairCountDisplay.textContent = '0/8';


// }



cards.forEach(card => {
    card.addEventListener('click', () => {
        if (isChecking) return; // blocca i click
        if (!card.classList.contains('is-flipped') && !card.classList.contains('isCorrect')) {
            card.classList.add('is-flipped');

            if (!choiceOne) {
                choiceOne = card;
                moves = moves ? moves + 1 : 1; // Incrementa il conteggio dei movimenti
                movesDisplay.textContent = ` ${moves}`; // Aggiorna il display dei movimenti
            } else if (card !== choiceOne) {
                choiceTwo = card;
                moves = moves ? moves + 1 : 1; // Incrementa il conteggio dei movimenti
                movesDisplay.textContent = `${moves}`; // Aggiorna il display dei movimenti
                checkMatch();
            }
        }
    });
});




//   if (coppieTrovate === shuffledOptions.length / 2) {
//         setTimeout(() => {
//             alert('Hai vinto! Hai trovato tutte le coppie!');
//         }, 500);
//     }

}




const winningGame = (coppie) =>{

    if (coppie < shuffledOptions.length / 2) {
        return;
    }
    alert('Hai vinto! Hai trovato tutte le coppie!');

    clearTimeout(timerId)
            modal.style.display = 'flex';
          reset_game.disabled = true ;

   start_game.disabled = true ;
reset_game.style.cursor= 'not-allowed';
start_game.style.cursor= 'not-allowed';



}



const isCombinbation = (card1, card2) => {
    let front1 = card1.querySelector('.flip-card-back');
    let front2 = card2.querySelector('.flip-card-back');

return front1.dataset.name === front2.dataset.name



}



start_game.addEventListener('click', () => {
    gameBoard.innerHTML = ''; // Clear the board before starting a new game
    startGame();
});








document.addEventListener('DOMContentLoaded', () => {
    createGameBoard(); // Create the game board when the document is loaded
});



const aggiornaClassifica = () =>{
    let nickname= document.querySelector('#nickname').value;

    let moves = document.querySelector('#moves').textContent;
    let pairs = document.querySelector('#pairs-found').textContent;
    let ore =
    document.querySelector('#ore')

    .textContent == '' ? null : convertToNum(document.querySelector('#ore').textContent, 'h') 
//   let ore = document.querySelector('#ore').textContent  ?   document.querySelector('#ore').textContent   * (60 * 60) : null
//   let minuti = Number(document.querySelector('#minuti').textContent) || document.querySelector('#minuti').textContent ? document.querySelector('#minuti').textContent * 60 : null
    let minuti = document.querySelector('#minuti').textContent == '' ? null :
    convertToNum(document.querySelector('#minuti').textContent, 'm') 

let secondi =  document.querySelector('#secondi').textContent == '' ? null : convertToNum(document.querySelector('#secondi').textContent, 's')
console.log('secondi',secondi)
  let totale_secondi = ore * 60*60  || 0  + minuti *60  || 0  + secondi;
    let classifica = JSON.parse(localStorage.getItem('classifica')) || [];
    
    let record = {
        name: nickname,
        time_secondi: totale_secondi,
        moves: Number(moves),
        pairs: pairs,
        date: new Date().toLocaleString(),
    fullTime:  ore ? `${ore}h : ${minuti}m : ${secondi}s`  : minuti ? `${minuti}m : ${secondi}s` : `${secondi}s`,
    




    }
    
    classifica.push(record)
     

    
   

localStorage.setItem('classifica', JSON.stringify(classifica));



modal.style.display = 'none';
          reset_game.disabled = false ;
start_game.disabled =  false;
reset_game.style.cursor= 'pointer';
start_game.style.cursor= 'pointer';
resetGame()

}



const  submit_button = document.querySelector('#submit-button');


modalAction.addEventListener('submit', function(e){
    e.preventDefault();
    aggiornaClassifica()
});

// submit_button.addEventListener('click', aggiornaClassifica);


const rank = document.querySelector('.classifica');




document.addEventListener('DOMContentLoaded',()=>{
    let classifica = JSON.parse(localStorage.getItem('classifica')) || [];
document.querySelector('.timer').style.display = 'none';


    console.log(classifica)

})



let n = '0s'

let x = n.split('')
console.log(x)
console.log(typeof Number(x[0]))





// const strToNum = (str) => Number(str.split('')[0])

// const converMinutes = (str) =>{
// let length = str.length

// length == 3 ? str = str.split('')[0] + str.split('')[1] : str = str.split('')[0]

// }
// const convertHours = (str) =>{
//     const letter = 'h';
//     const index = str.indexOf(letter)

//     return str.slice(0,index)

// }


const convertToNum  = (str,letter) =>{
    const index = str.indexOf(letter)

    return Number(str.slice(0,index))
}

const resetGame = () =>{
     // Ferma il timer
    clearInterval(timerId);
    timerId = null;

    // Resetta valori numerici
    ore = 0;
    minuti = 0;
    secondi = 0;
    start = 0;

    // Reset display
    document.querySelector('#ore').textContent = '';
    document.querySelector('#minuti').textContent = '';
    document.querySelector('#secondi').textContent = '';
    document.querySelector('#moves').textContent = '';
    document.querySelector('#pairs-found').textContent = '';
    timerDisplay.style.display = 'none';

    // Pulisce la board e ricrea le carte
    gameBoard.innerHTML = '';
      
    createGameBoard();
     start_game.style.cursor= 'pointer';
    start_game.disabled = false ;

}

reset_game.addEventListener('click', resetGame) 





    document.querySelector('#show-classifica').addEventListener('click', 
    ()=>{

 const classifica = document.querySelector('.classifica')


  
 document.querySelector('#show-classifica').classList.add('close')





 classifica.classList.add('show');
popolaClassifica()

    })




document.querySelector('#close-classifica').addEventListener('click', ()=>{
    const classifica = document.querySelector('.classifica')
    classifica.classList.remove('show');
    document.querySelector('#show-classifica').style.display = 'block';
    document.querySelector('#show-classifica').classList.remove('close')


  
})



const popolaClassifica = () =>{

    const punteggi = JSON.parse(localStorage.getItem('classifica')) || [];
  



    const resultsList = document.querySelector('#results-list'); 
    resultsList.innerHTML = ''
    const item =  document.querySelector('#results-list').children
   

    // item.map((el)=>console.log(el) || 2)




    punteggi.sort((a,b) => a.time_secondi - b.time_secondi).sort((a,b)=>a.moves-b.moves).sort((a,b)=>a.date-b.date);
 
const tr = document.createElement('tr');
let name = document.createElement('th');
let fullTime = document.createElement('th');
let moves = document.createElement('th');
let date = document.createElement('th');
let index_table = document.createElement('th');
name.textContent = 'Name';
fullTime.textContent = 'Time (s)';
moves.textContent = 'Moves';
date.textContent = 'Date';
index_table.textContent = '#';
tr.appendChild(index_table);
tr.appendChild(name);
tr.appendChild(fullTime);
tr.appendChild(moves);
tr.appendChild(date);
resultsList.appendChild(tr);


// punteggi.length> 0  ?
  

 

// punteggi.forEach((record,index) => {
//         const listItem = document.createElement('li');
//          listItem.dataset.index = index
//         listItem.textContent = `${record.name} - ${record.fullTime} - ${record.moves} mosse `;
//         resultsList.appendChild(listItem);
//     }) : resultsList.textContent = 'Non ci sono risultati'


 punteggi.length> 0  ? punteggi.forEach((record,index) => {
     const listItem = document.createElement('tr');
     const td = document.createElement('td');
     const td2 = document.createElement('td');
     const td3 = document.createElement('td');
     const td4 = document.createElement('td');
     const  td5 = document.createElement('td');
     td.textContent =  record.name;
 


     
     
     
    
td2.textContent =  record.name
     td2.textContent = record.fullTime;
     td3.textContent = record.moves;
     td4.textContent = record.date;
     td5.textContent =   index == 0 ? '🥇' : index == 1 ? '🥈' : index == 2 ? '🥉' : index
       listItem.appendChild(td5);
     listItem.appendChild(td);
     listItem.appendChild(td2);
     listItem.appendChild(td3);
     listItem.appendChild(td4);
      
     resultsList.appendChild(listItem);
 }) : resultsList.textContent = 'Non ci sono risultati'

      
//       listItem.dataset.index = index
//      listItem.textContent = `${record.name} - ${record.fullTime} - ${record.moves} mosse `;
//      tr.appendChild(listItem);
//  }) : resultsList.textContent = 'Non ci sono risultati'
 


}





 

  
