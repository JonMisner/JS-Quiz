var timeEl = document.querySelector(".time");

var secondsLeft = 100;

function setTime() {
  var timerInterval = setInterval(function() {
    secondsLeft--;
    timeEl.textContent = secondsLeft;

    if(secondsLeft === 0) {
      clearInterval(timerInterval);
      lost();
    }

  }, 1000);
}

function lost() {
  timeEl.textContent = "You Lost :(";
}