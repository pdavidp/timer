var countDownTime = 30;
var rounds = 4;
var breakLength = 5;
var totalCountDownTime = (countDownTime+1) * rounds; /* +1 because countDownTime includes 0 */
var totalBreakTime = breakLength * (rounds-1); /* -1 because no break at end*/
var totalTimeLeft = (totalCountDownTime + totalBreakTime)-1; /* -1 to get the mod working*/

var allRight = new Audio('AllRightGoodForNow.mp3');
var letsGo = new Audio('LetsGo.mp3');
var youreDone = new Audio('You-reDone.mp3');

function startTimer() {
  countDown();
}

function countDown() {
  for (var round=1; round<=rounds; round++) {
    for (var timer=0;timer<=countDownTime; timer++) {
      if (totalTimeLeft===(totalCountDownTime + totalBreakTime)-1) {
        // special case: very last count down, done
        window.setTimeout(setTimerDisplay, totalTimeLeft*1000, "&#x2714;", "Round number: " + round, "");
      } else {
        window.setTimeout(setTimerDisplay, totalTimeLeft*1000, timer, "Round number: " + round, "");
      }
      totalTimeLeft--;
    }
    // Don't take a break at the end
    if (totalTimeLeft > 0) {
        for (var b=1;b<=breakLength; b++) {
          window.setTimeout(setTimerDisplay, totalTimeLeft*1000, "&#x23F3;", "", "Left in break: " + b);
          totalTimeLeft--;
        }
    }
  }
}

function setTimerDisplay(timeLeftThisRound, roundsRemaining, breakTimeRemaining) {
  document.getElementById("timer").innerHTML = timeLeftThisRound;
  document.getElementById("rounds").innerHTML = roundsRemaining;
  document.getElementById("break").innerHTML = breakTimeRemaining;
  document.getElementById("resetButton").style.display = "inline-block";
  document.getElementById("startButton").style.display = "none";

  if (timeLeftThisRound===0) {
    allRight.play();
  } else if (timeLeftThisRound === countDownTime) {
    letsGo.play();
  } else if (timeLeftThisRound === "&#x2714;") {
    youreDone.play();
    document.getElementById("resetButton").display = "none";
    document.getElementById("startButton").display = "inline-block";
  }
}

function resetTimer() {
  location.reload();
}