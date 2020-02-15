var buttons = [...$(".btn")];
var pattern = [];
var validate = [];
var level = 1;
var audioBlue = new Audio("sounds/blue.mp3");
var audioGreen = new Audio("sounds/green.mp3");
var audioRed = new Audio("sounds/red.mp3");
var audioYellow = new Audio("sounds/yellow.mp3");
var audioWrong = new Audio("sounds/wrong.mp3");

$(document).keydown(function(e) {
  if (!$("#level-title").hasClass("playing")) {
    $("#level-title").removeClass("game-over");
    $("#level-title").addClass("playing");
    $("#level-title").text("Level " + level);
    level++;
    simonsButtons(pattern);
  }
});

$(".btn").click(function(event) {
  if (event.target === validate[0]) {
    validate.shift();
    playSound(this);
    if (validate.length === 0) {
      setTimeout(function() {
        $("#level-title").text("Level " + level);
        level++;
        simonsButtons(pattern);
      }, 1000);
    }
  } else if ($("#level-title").hasClass("playing")) {
    pattern = [];
    validate = [];
    level = 1;
    audioWrong.play();
    $("#level-title").addClass("game-over");
    $("#level-title").removeClass("playing");
    $("#level-title").text("Game Over :( Press Any Key to Restart!");
  }
});

$(".btn").mousedown(function() {
  $(this).addClass("pressed");
});

$(".btn").mouseup(function() {
  $(this).removeClass("pressed");
});

function simonsButtons(pattern) {
  rng = Math.random() * 4;
  rng = Math.floor(rng);

  pattern.push(buttons[rng]);

  playSound(pattern[0]);
  simonPress(pattern[0]);

  waitLoop(pattern, 1);

  validate = [...pattern];
}

function playSound(element) {
  if ($(element).hasClass("blue")) {
    audioBlue.play();
  } else if ($(element).hasClass("green")) {
    audioGreen.play();
  } else if ($(element).hasClass("red")) {
    audioRed.play();
  } else if ($(element).hasClass("yellow")) {
    audioYellow.play();
  }
}

function waitLoop(data, i) {
  setTimeout(function() {
    if (i < data.length) {
      playSound(data[i]);
      simonPress(data[i]);
      waitLoop(data, i + 1);
    }
  }, 1000);
}

function simonPress(element) {
  $(element).addClass("pressed");
  setTimeout(function() {
    $(element).removeClass("pressed");
  }, 300);
}
