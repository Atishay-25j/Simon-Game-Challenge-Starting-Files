var gamePattern = [];
var userClickedPattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var gameStarted = false;
var level = 0;
$(document).keypress(function() {
  if (!gameStarted) {
    $("#level-title").text("LEVEL " + level);

    nextsequence();
    gameStarted = true;

  }
});
$(".btn").click(function() {
  var chosenColor = $(this).attr("id");
  userClickedPattern.push(chosenColor);
  playSound(chosenColor);
  animatedPress(chosenColor);
  checkAnswer(userClickedPattern.length - 1);
});

function nextsequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("LEVEL " + level);
  var randomNumber = Math.random();
  randomNumber = randomNumber * 4;
  randomNumber = Math.floor(randomNumber);
  var randomChosenColor = buttonColours[randomNumber];
  gamePattern.push(randomChosenColor);
  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
}


function checkAnswer(currentlevel) {
  if (userClickedPattern[currentlevel] === gamePattern[currentlevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextsequence();
      }, 1000);
    }
  } else {
    var audio = new Audio("sounds/wrong.mp3");
    audio.play();
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key to Restart");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);

    startover();
  }

}

function startover() {
  gameStarted = false;
  level = 0;
  gamePattern = [];
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatedPress(currentColor) {
  $("#" + currentColor).addClass("pressed");

  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}
