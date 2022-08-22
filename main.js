const inputs = document.querySelector(".inputs");
resetBtn = document.querySelector(".reset-btn");
definition = document.querySelector(".definition span");
correctLetter=document.querySelector(".guess-left span")
wrongLetter = document.querySelector(".wrong-letter span");
typingInput = document.querySelector(".typing-input")
let word, maxGuesses, corrects = [], incorrects = [];
function randomWord() {
    //gettin random object from wordList
    let ranObj = wordList[Math.floor(Math.random() * wordList.length)]
    word = ranObj.word; //getting word of random object
    maxGuesses = 8; corrects =[]; incorrects = [];
    console.log(word)

    correctLetter.innerHTML = maxGuesses; 
    definition.innerHTML = ranObj.definition;
    wrongLetter.innerHTML = incorrects;
    let html = "";
    for(let i=0; i<word.length;i++){
        html += `<input type="text" disabled />`;
    }
    inputs.innerHTML = html;
}

randomWord();

function initGame(e){
    let key = e.target.value;
    if(key.match(/^[A-Za-z]+$/)&& !incorrects.includes(` ${key}`)&&!corrects.includes(key)){
        console.log(key)
        if(word.includes(key)){
           for(let i=0; i<word.length; i++){
            if(word[i]===key){
                corrects.push(key);
                inputs.querySelectorAll("input")[i].value = key;
            }
           }
        }else{
            maxGuesses--;
            incorrects.push(` ${key}`);
        }
        correctLetter.innerHTML = maxGuesses; 
        wrongLetter.innerHTML = incorrects;
    }
    typingInput.value= "";
    
    setTimeout(()=>{
        if(corrects.length === word.length){
            alert(`Congratulations ${word.toUpperCase()}`);
            randomWord();
        }else if(maxGuesses<1){
            alert("Game over");
            for(let i=0; i<word.length; i++){
                inputs.querySelectorAll("input")[i].value = word[i];
               }
        }
    });
    
}

resetBtn.addEventListener("click", randomWord);
typingInput.addEventListener("input", initGame)
document.addEventListener("keydown", ()=> typingInput.focus())