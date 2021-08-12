var words = {
    animals: [{
        answer: "lion",
        clue: "king of beasts",
    }, {
        answer: "cat",
        clue: "domestic feline",
    }, {
        answer: "cow",
        clue: "bovine animal",
    }, {
        answer: "camel",
        clue: "animals with one or two humps on the back",
    }, {
        answer: "giraffe",
        clue: "spotted animal of Africa",
    }],
    vegetables: [{
        answer: "garlic",
        clue: "a strong-smelling and strong-tasting bulb",
    }, {
        answer: "eggplant",
        clue: "usually dark-purple fruit",
    }, {
        answer: "carrot",
        clue: "Bugs Bunny's favorite food",
    }, {
        answer: "radish",
        clue: "white or red root of a plant ",
    }, {
        answer: "onion",
        clue: "a plant of the amaryllis family",
    }],
    countries: [{
        answer: "sweden",
        clue: "part of the Scandinavian Peninsula",
    }, {
        answer: "france",
        clue: "republic in W Europe",
    }, {
        answer: "canada",
        clue: "a nation in N North America",
    }, {
        answer: "austria",
        clue: "deutsch speaking countrie"
    }, {
        answer: "spain",
        clue: "homeland of paella",
    }],
    fruits: [{
        answer: "apple",
        clue: "also a lable",
    }, {
        answer: "orange",
        clue: "sweet citrus fruit",
    }, {
        answer: "raspberry",
        clue: "juicy red, black, or pale yellow berries",
    }, {
        answer: "pineapple",
        clue: "a tropical plant",
    }, {
        answer: "watermelon",
        clue: "usually red pulp",
    }],
    transports: [{
        answer: "train",
        clue: "vehicle that travels along metal tracks",
    }, {
        answer: "plane",
        clue: "vehicle that flies and has an engine and wings",
    }, {
        answer: "car",
        clue: "has four wheels, and seats for a few people",
    }, {
        answer: "boat",
        clue: "for travelling on water",
    }, {
        answer: "bus",
        clue: "a large vehicle that carries passengers by road",
    }],
}

var init = document.getElementById("init");
var game = document.getElementById("game");
var finish = document.getElementById("finish");

var categoryDoc = document.getElementById("category");
var clueDoc = document.getElementById("clue");
var showQuestionDoc = document.getElementById("show-question");
var playerName;
var counter = 5;
var attempts = document.getElementById("attempts");
var finalMessage = document.getElementById("final-message");
var myImages = document.getElementById("images");

var selectedWord;
var hidenWord;
var clueWord;
var categoryWord;


function gameDisplay() {
    init.style.display = "none";
    game.style.display = "flex";
    playerName = document.getElementById("name").value;

    startGame();
}

function quitGame(){
    init.style.display = "flex";
    game.style.display = "none";
    document.getElementById("name").value = "";
   
    replay();
}

function startGame() {
    selectRandomQuestion();
    updateDisplay();
}

function selectRandomQuestion() {
    var categoryList = Object.keys(words);
    var randomIndex = Math.floor(Math.random() * categoryList.length);
    var selectedCategory = categoryList[randomIndex];
    var randomWordIndex = Math.floor(Math.random() * words[selectedCategory].length);
    var guessingWord = words[selectedCategory][randomWordIndex];

    categoryWord = selectedCategory;
    selectedWord = guessingWord.answer;
    clueWord = guessingWord.clue;
    hidenWord = guessingWord.answer.split('').map(() => ' _');

}

function updateDisplay() {
    clueDoc.innerText = clueWord;
    showQuestionDoc.innerText = hidenWord.join("");
    categoryDoc.innerText = categoryWord;
    
    showFinalMessage();
}

function checkLetter(inputLetter) {
    inputLetter = inputLetter.toLowerCase();
    var checkingIndexes = getLetterIndexes(inputLetter);
    if (checkingIndexes.length > 0) {
        checkingIndexes.forEach(index => {
            hidenWord.splice(index, 1, inputLetter);
        })
    } else {
        counter--;
        updatePoints(counter);
        updateImage(counter);
    }
    updateDisplay();
    
}

function getLetterIndexes(letter) {
    var findIndex = [];
    var indexLetter = selectedWord.indexOf(letter);
    while (indexLetter != -1) {
        findIndex.push(indexLetter);
        indexLetter = selectedWord.indexOf(letter, indexLetter + 1);
    }
    return findIndex;
}



function updatePoints(counter) {
    attempts.innerText = counter;
}

function updateImage(counter) {

    switch (counter) {
        case 5:
            myImages.src = "images-hangman/1.jpg";
            break;
        case 4:
            myImages.src = "images-hangman/2.jpg";
            break;
        case 3:
            myImages.src = "images-hangman/3.jpg";
            break;
        case 2:
            myImages.src = "images-hangman/4.jpg";
            break;
        case 1:
            myImages.src = "images-hangman/5.jpg";
            break;
        case 0:
            finish.style.display = "flex";
            finalMessage.innerText = "Game Over " + playerName + ", you lose this time. :( ";
    }
    
}

function replay() {
    finish.style.display = "none";
    counter = 5;
    startGame();
    updateImage(counter);
    updatePoints(counter);
   
}

function showFinalMessage() {
    if (selectedWord === hidenWord.join("")) {
        finalMessage.innerText = "Congratulation " + playerName + " , you win this time. Waiting for the revenge :)";
        finish.style.display = "flex";
    }
}