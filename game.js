var buttonColors = ["red", "blue", "green", "yellow"];

var gamePatten = [];

var userClickedPatten = [];

var started = false;

var level = 0;

$(document).keydown(function () {

  if (!started) {

    nextSequence();

    started = true;
  }
})


$(".btn").click(function () {

  var userChosenColor = $(this).attr("id");

  userClickedPatten.push(userChosenColor);

  playSound(userChosenColor);

  animatePress(userChosenColor);

  checkAnswer(userClickedPatten.length - 1);
})

function checkAnswer(currentLevel) {
  if(gamePatten[currentLevel] === userClickedPatten[currentLevel]) {
    console.log("success");

    if (gamePatten.length === userClickedPatten.length) {
      setTimeout(function () {
        nextSequence();
      },1000)
    }
  } else {
    console.log("wrong");

    wrongAnswer("wrong");

    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);

    $("h1").text("Game Over, Press any key to restart");

    starOver();
  }
}

function starOver() {
  level = 0;
  gamePatten = [];
  started = false;
}

function wrongAnswer(parameter) {

  var wrongAudio = new Audio("sounds/" + parameter + ".mp3");

  wrongAudio.play();
}

function nextSequence() {

  var randomNumber = Math.floor(Math.random() * 4);

  var randomChosenColor = buttonColors[randomNumber];

  gamePatten.push(randomChosenColor);

  $("#" + randomChosenColor).fadeOut(100).fadeIn(100);

  playSound(randomChosenColor);

  level++;

  $("h1").text("Level " + level);

  userClickedPatten = [];
}

function playSound(name) {
  
  var myAudio = new Audio('sounds/' + name + ".mp3");

  myAudio.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");

  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100)
}
