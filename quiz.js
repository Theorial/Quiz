var currentindex = 0;
let currentImage = "";
var userClickedPattern = [];
var currentQuestion = 0;
var started = false;
var correctCount = 0;
var wrongAnswers = 0;

const pokemonAnswers = {
  "img/articuno.png": "Articuno",
  "img/charizard.png": "Charizard",
  "img/deoxys.png": "Deoxys",
  "img/entei.png": "Entei",
  "img/groudon.png": "Groudon",
  "img/hooh.png": "Ho-Oh",
  "img/kyogre.png": "Kyogre",
  "img/latios.png": "Latios",
  "img/lugia.png": "Lugia",
  "img/mewtwo.png": "Mewtwo",
  "img/moltres.png": "Moltres",
  "img/pikachu.png": "Pikachu",
  "img/raikou.png": "Raikou",
  "img/rayquaza.png": "Rayquaza",
  "img/regice.png": "Regice",
  "img/regirock.png": "Regirock",
  "img/registeel.png": "Registeel",
  "img/suicune.png": "Suicune",
  "img/zapdos.png": "Zapdos",
};

// let imgPool = Object.keys(pokemonAnswers);
let imgPool = pokemonAnswers;

//1. first we need a shuffle function that doesnt allow repeated image or questions

function shufflePairs(obj) {
  const entries = Object.entries(obj); // [['img/articuno.png', 'Articuno'], ...]

  for (let i = entries.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [entries[i], entries[j]] = [entries[j], entries[i]];
  }

  // Optional: return as an array or convert back to object
  return Object.fromEntries(entries); // returns shuffled object
}

// console.log(shuffle(imgPool))

function gameStart() {
  imgPool = shufflePairs(imgPool);
  nextSequence();
}
gameStart();
function gameOver() {
  gameStart();
}
function indexLock(a) {
  if (a >= 19) a -= 19;
  return a;
}

function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

$(document).keypress(function () {
  if (!started) { // Check if the game has not started yet
    $("#level-title").text("Level " + (currentindex + 1));
    started = true; // Set started to true to indicate the game has begun
    gameStart(); // Start the game
  }
});
function nextSequence() {
  var selections = [
    Object.values(imgPool)[currentindex],
    Object.values(imgPool)[indexLock(currentindex + 1)],
    Object.values(imgPool)[indexLock(currentindex + 2)],
    Object.values(imgPool)[indexLock(currentindex + 3)],
  ];
  selections = shuffle(selections);
  $("img").attr("src", Object.keys(imgPool)[currentindex]);
  $("#a").text(selections[0]);
  $("#b").text(selections[1]);
  $("#c").text(selections[2]);
  $("#d").text(selections[3]);
}
// function checkAnswer() {
//   const correctAnswer = pokemonAnswers[gamePattern[currentLevel]];
//   const userAnswer = userClickedPattern[currentLevel];

//   if (userAnswer === correctAnswer) {
//     console.log("correct");
//     setTimeout(nextSequence, 1000);
//   } else {
//     console.log("wrong");
//     $("body").addClass("game-over");
//     setTimeout(() => $("body").removeClass("game-over"), 200);
//     $("#level-title").text("Game Over, Press A Key to Restart");
//     startOver();
//   }
// }

// // $(".answer-btn").click(function () {
// //   const userAnswer = $(this).text();
// //   userClickedPattern.push(userAnswer);
// //   checkAnswer(userClickedPattern.length - 1);
// // });

// // $(document).keypress(function () {
// //   if (!started) {
// //     $("#level-title").text("Level " + level);
// //     nextSequence();
// //     started = true;
// //   }
// // });

// function startOver() {
//   currentindex = 0;
//   level = 0;
//   userClickedPattern = [];
//   currentCorrectPokemonImage = ""; // Reset the correct image
//   started = false;
//   // Optionally, you might want to re-shuffle imgPool here if you want a fresh order each game
//   shuffle(imgPool);
//   // Clear the image and answer buttons if needed, or nextSequence will handle it
//   $("#pokemon-img").attr("src", "");
//   $(".answer-btn").text("");
// }

// function nextSequence() {
//   // Reset user's answer for the new question
//   userClickedPattern = [];

//   // If all Pokémon have been guessed
//   if (currentindex >= imgPool.length) {
//     $("#level-title").text("You guessed all Pokémon! Congratulations!");
//     // Consider adding a "Play Again" button or similar here
//     return;
//   }

//   level++;
//   // Ensure you have an element with id="level-title" in your HTML!
//   $("#level-title").text("Level " + level);

//   // Get the current Pokémon image path and set it as the correct one
//   currentCorrectPokemonImage = imgPool[currentindex];
//   console.log("Setting image to:", currentCorrectPokemonImage);

//   // Set the Pokémon image source
//   $("#pokemon-img").attr("src", currentCorrectPokemonImage);

//   // Get the correct Pokémon name for the options
//   const correctAnswerName = pokemonAnswers[currentCorrectPokemonImage];

//   // Generate 3 incorrect options (names)
//   const allPokemonNames = Object.values(pokemonAnswers);
//   const incorrectOptions = allPokemonNames.filter(
//     (name) => name !== correctAnswerName
//   );
//   shuffle(incorrectOptions); // Shuffle all incorrect options
//   const selectedIncorrectOptions = incorrectOptions.slice(0, 3); // Take 3 random incorrect ones

//   // Combine correct answer with 3 incorrect ones
//   const options = [correctAnswerName, ...selectedIncorrectOptions];
//   shuffle(options); // Shuffle the final options array

//   // Set the text for each answer button
//   $(".answer-btn").each(function (index) {
//     $(this).text(options[index]);
//   });

//   // Move to the next Pokémon in the pool for the next round
//   currentindex++;
// }

// $(".answer-btn").click(function () {
//   const userAnswer = $(this).text();
//   // Store only the current answer, not a pattern
//   userClickedPattern = [userAnswer]; // Replace previous answer with the new one
//   checkAnswer(); // Call checkAnswer without an index
// });

// // Start the game on any key press
// $(document).click(function () {
//   if (!started) {
//     // Ensure you have an element with id="level-title" in your HTML!
//     $("#level-title").text("Level " + level);
//     // Shuffle the imgPool at the start of a new game
//     shuffle(imgPool);
//     nextSequence();
//     started = true;
//   }
// });
