const startBtn = document.getElementById("start");

let endTime;
let isRunning = false;
let intervalId;

const calcTime = (time) => {
  const hrs = Math.floor(time / 3600);
  const min = Math.floor((time % 3600) / 60);
  const second = Math.floor(time % 60);

  return [hrs, min, second];
};

const updateUI = ([hrs, min, second]) => {
  const timerCountdown = document.getElementById("timerCountdown");
  timerCountdown.textContent = `${String(hrs).padStart(2, "0")}:${String(min).padStart(2, "0")}:${String(second).padStart(2, "0")}`;
};

const updateTimer = () => {

  intervalId = setInterval(() => {
    let remainingTime = Math.ceil((endTime - Date.now()) / 1000);
    let [hrs, min, second] = calcTime(remainingTime);

    // console.log("from start", hrs, min, second, remainingTime);
    updateUI([hrs, min, second]);

    if (Date.now() >= endTime) {
      clearInterval(intervalId);
      isRunning = false;
      return;
    }
  }, 1000);
};


const startBtnHandler = () => {
  let hrs = document.getElementById("totalHrs");
  let min = document.getElementById("totalMin");
  let seconds = document.getElementById("totalSeconds");

  hrs = Number(hrs.value) ? Number(hrs.value) : 0;
  min = Number(min.value) ? Number(min.value) : 0; // 👈 default to 5 if empty
  seconds = Number(seconds.value) ? Number(seconds.value) : 0;

  const totalTimeInSeconds = hrs * 3600 + min * 60 + seconds;

  if (totalTimeInSeconds <= 0) {
    alert("Time Should BE Greater Then Zero");
    return;
  }
  endTime = Date.now() + totalTimeInSeconds * 1000;
  isRunning = true;
  updateTimer();
};

startBtn.addEventListener("click", () => {
  if (isRunning) return;
  startBtnHandler();
});
