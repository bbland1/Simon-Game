// The color options and the randomly generated pattern for the rounds
let buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];

var started = false;
var level = 0;
var highestLevel = 0;

// register if the user started the game by keypressing on computer or touching on mobile
$(document).on("keydown touchstart", function () {
  if (started !== true) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

// Registeres that the user clicked a button and plays the sound
$(".btn").on("click tap", function () {
  let userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatedPress(userChosenColor);
  checkAnswer(userClickedPattern.length - 1);
});

// check if the user input in the correct pattern
function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence()
      }, 1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("GAME OVER! Press Any Key to Start Again!")
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    startOver();
  }
}

// how to make the sequence histroy and the animation and sound
function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  let randomNumber = Math.floor(Math.random() * 4);
  let randomColorChosen = buttonColors[randomNumber];
  gamePattern.push(randomColorChosen);
  $("#" + randomColorChosen).fadeToggle("fast", "linear").fadeToggle("fast", "linear");
  playSound(randomColorChosen);
  bestLevel();
}

// to get the animation of the buttons and be reusable
function animatedPress(color) {
  $("#" + color).addClass("pressed");
  setTimeout(function () {
    $("#" + color).removeClass("pressed")
  }, 100);
}

// To get the different sounds to play at the given color
function playSound(color) {
  let sound = new Audio("sounds/" + color + ".mp3");
  sound.play();
}

// Get the game to restart
function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}

// Highest score before a refresh 
function bestLevel () {
  if (level > highestLevel) {
    highestLevel = level;
    $(".level-count").text(highestLevel);
  }
}