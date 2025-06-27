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
  started = true;
  imgPool = shufflePairs(pokemonAnswers);
  currentindex = 0;
  correctCount = 0;
  wrongAnswers = 0;
  resetUI();
  nextSequence();
}
function resetUI() {
  $(".answer-btn").prop("disabled", false).css("background-color", "");
  $("#next-btn").hide();
  $("#restart-btn").hide();
  $("#level-title").text("Level " + (currentindex + 1));
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
function showGameOver() {
  // Calculate score percentage
  const totalQuestions = Object.keys(imgPool).length;
  const scorePercentage = Math.round((correctCount / totalQuestions) * 100);

  // Determine message based on performance
  let message, titleColor, emoji;

  if (scorePercentage >= 90) {
    message = "Pokémon Master!";
    titleColor = "gold";
    emoji = "🦾";
  } else if (scorePercentage >= 70) {
    message = "Great Job!";
    titleColor = "green";
    emoji = "👍";
  } else if (scorePercentage >= 50) {
    message = "Good Try!";
    titleColor = "blue";
    emoji = "🙂";
  } else {
    message = "Keep Practicing!";
    titleColor = "orange";
    emoji = "💪";
  }

  // Create score breakdown
  const scoreDetails = `
    <div style="margin-top: 20px; text-align: center;">
      <div style="font-size: 24px; color: ${titleColor}">
        ${message} ${emoji}
      </div>
      <div style="margin: 15px 0; font-size: 18px">
        <span style="color: green">✔ ${correctCount} Correct</span><br>
        <span style="color: red">✖ ${wrongAnswers} Wrong</span><br>
        <span style="color: #555">${scorePercentage}% Accuracy</span>
      </div>
      <div style="font-style: italic; color: #777">
        ${getRandomEncouragement()}
      </div>
    </div>
  `;

  // Update the display
  $("#level-title").html(`
    <div style="text-align: center">
      <div style="font-size: 32px; color: red;">
        GAME OVER
      </div>
      ${scoreDetails}
    </div>
  `);

  $("#next-btn").hide();
  $("#restart-btn").show();
  $(".answer-btn").prop("disabled", true);
}

// Helper function for random encouragement messages
function getRandomEncouragement() {
  const messages = [
    "Every Pokémon master started somewhere!",
    "You'll do better next time!",
    "The more you play, the better you'll get!",
    "Even Ash lost battles before becoming a champion!",
    "Your Pokémon knowledge is growing!",
    "Catch 'em all on your next try!",
  ];
  return messages[Math.floor(Math.random() * messages.length)];
}

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

$(".answer-btn").click(function () {
  if (!started) return;

  const userAnswer = $(this).text();
  const correctAnswer = Object.values(imgPool)[currentindex];
  // shows the next button when answer
  $(".answer-btn").prop("disabled", true);
  $("#next-btn").show();

  if (userAnswer === correctAnswer) {
    correctCount++;
    $(this).css("background-color", "green");
  } else {
    wrongAnswers++;
    $(this).css("background-color", "red");
    // highlights the right answer
    $(".answer-btn").each(function () {
      if ($(this).text() === correctAnswer) {
        $(this).css("background-color", "green");
      }
    });
  }
});

// Handle Next button click
$("#next-btn").click(function () {
  currentindex++;
  //console.log("Next clicked. Index:", currentindex); // Debug log
  if (currentindex >= Object.keys(imgPool).length) {
    //console.log("Calling showGameOver"); // Debug log
    showGameOver();
    started = false;
    return;
  }
  nextSequence();
  resetUI();
});

$("#restart-btn").click(function () {
  gameStart();
});

gameStart();
