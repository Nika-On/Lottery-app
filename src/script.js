//defining variables
const numbers = document.querySelector(".numbers");
const selectedNumbers = document.querySelector(".selected-Numbers");
const amountOfMatchedNums = document.querySelector(".matched-Numbers");
const winningNumbersContainer = document.querySelector(".displayWiningNums");
const resetButton = document.querySelector(".reset");
const checkButton = document.querySelector(".check");
let selectedNum;
let count = 0;
let winningNumbers;
let selectedNums = [];
function checkMatchedNums(arr1, arr2) {
  let hash = new Map();
  let amount = 0;
  let frequency = 1;
  // Loop through the first array and store the frequency of each number in the hash map
  for (let i = 0; i < arr1.length; i++) {
    if (!hash.has(arr1[i])) {
      hash.set(arr1[i], frequency);
    } else {
      hash.set(arr1[i], frequency++);
    }
  }
  // Loop through the second array and check if the number is in the hash map
  for (let i = 0; i < arr2.length; i++) {
    if (hash.has(arr2[i]) && hash.get(arr1[i]) > 0) {
      amount++;
      hash.set(arr2[i], hash.get(arr2[i]) - 1);
    }
  }
  return amount;
}
function reset() {
  //clear selected nums and winning nums
  selectedNumbers.innerHTML = "";
  count = 0;
  selectedNums = [];
  winningNumbers = [];
  amountOfMatchedNums.textContent = "";
  winningNumbersContainer.textContent = "";
}
function check() {
  //This code generates 6 random winning numbers
  winningNumbers = Array.from(
    { length: 6 },
    () => Math.floor(Math.random() * 30) + 1
  );
  //This code checks if selected numbers are same as winning numbers if not returns how much matched
  if (checkMatchedNums(selectedNums, winningNumbers) == 6) {
    amountOfMatchedNums.textContent = "You won !";
  } else if (checkMatchedNums(selectedNums, winningNumbers) == 0) {
    amountOfMatchedNums.textContent = "You lost";
  } else {
    amountOfMatchedNums.textContent = `You matched ${checkMatchedNums(
      selectedNums,
      winningNumbers
    )} Numbers`;
  }
  winningNumbersContainer.textContent = `Winning Numbers are ${winningNumbers}`;
}
//This funtion lets user to start playing
function selectNums(event) {
  //This part lets user to select 6 numbers
  if (count !== 6) {
    selectedNum = document.createElement("button");
    selectedNum.textContent = event.target.textContent;
    selectedNums.push(parseInt(event.target.textContent));
    selectedNumbers.appendChild(selectedNum);
    count++;
  }
}
//initialising app
function init() {
  //displaying numbers on the screen
  for (let i = 1; i <= 30; i++) {
    num = document.createElement("button");
    num.textContent = i;
    numbers.appendChild(num);
    num.addEventListener("click", selectNums);
  }
}
resetButton.addEventListener("click", reset);
checkButton.addEventListener("click", check);
init();
