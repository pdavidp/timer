const countDownTime = 30;
const rounds = 4;
const breakLength = 5;
const totalCountDownTime = (countDownTime + 1) * rounds; /* +1 because countDownTime includes 0 */
const totalBreakTime = breakLength * rounds;
const allRight = new Audio('AllRightGoodForNow.mp3');
const letsGo = new Audio('LetsGo.mp3');
const youreDone = new Audio('You-reDone.mp3');

let totalTimeLeft = totalCountDownTime + totalBreakTime;
let lastSecond = true;

function countDown() {
  // Generate timeouts from end to start
  for (let round = 1; round <= rounds; round++) {
    generateRoundTimer(round);
    generateRoundBreak(round);
  }
}

function generateRoundTimer(round) {
  for (let timer = 0; timer <= countDownTime; timer++) {
    if (lastSecond) {
      // special case: very last count down, done
      window.setTimeout(setTimerDisplay, totalTimeLeft * 1000, "&#x2714;", "Round number: " + round);
      lastSecond = false;
    } else {
      window.setTimeout(setTimerDisplay, totalTimeLeft * 1000, timer, "Round number: " + round);
    }
    totalTimeLeft--;
  }
}

function generateRoundBreak(round) {
  for (let b = breakLength; b >= 1; b--) {
    let leftInBreak = breakLength - b + 1;
    if (b === totalTimeLeft) {
      // get ready, not a break
      window.setTimeout(setTimerDisplay, totalTimeLeft * 1000, "&#x1f6b6;", "Get ready: " + leftInBreak);
    } else {
      // break
      window.setTimeout(setTimerDisplay, totalTimeLeft * 1000, "&#x23F3;", "Left in break: " + leftInBreak);
    }
    totalTimeLeft--;
  }
}

function setTimerDisplay(timerText, message) {
  document.getElementById("timer").innerHTML = timerText;
  document.getElementById("message").innerHTML = message;
  document.getElementById("resetButton").style.display = "inline-block";
  document.getElementById("startButton").style.display = "none";

  if (timerText === 0) {
    allRight.play();
  } else if (timerText === countDownTime) {
    letsGo.play();
  } else if (timerText === "&#x2714;") {
    youreDone.play();
    document.getElementById("resetButton").display = "none";
    document.getElementById("startButton").display = "inline-block";
  }
}

function resetTimer() {
  location.reload();
}
