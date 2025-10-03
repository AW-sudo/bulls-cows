let hintsEl = document.querySelector("#hints");
let submitBtnEl = document.querySelector('#guess-form [type="submit"]');
let resetBtnEl = document.querySelector("#reset-btn");
let formEl = document.getElementById("guess-form");
let clearBtnEl = document.getElementById("clear"); // зачем  выше используется # ?

let generate_num = () => {
  let expected = [];
  while (expected.length < 4) {
    let digit = Math.floor(Math.random() * 10);

    if (expected[0] == digit) {
      continue;
    } else {
      expected.unshift(digit);
    }
  }
  expected = expected.join("");
  return expected;
};

let check = (number, exp_number) => {
  digits = String(number).split("").map(Number);
  exp_digits = String(exp_number).split("").map(Number);
  let bulls = 0;
  let cows = 0;
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (digits[i] == exp_digits[j] && i == j) {
        bulls++;
      } else if (digits[i] == exp_digits[j] && i != j) {
        cows++;
      }
    }
  }
  return [bulls, cows];
};

let guess = (e) => {
  e.preventDefault();
  let formData = new FormData(e.target);
  let digits = formData.getAll("digit");
  let actual = digits.join("");
  console.log("expected", expected, "actual", actual);
  if (expected == actual) {
    hintsEl.innerText = "Вы победили!";
    submitBtnEl.disabled = true;
    return;
  }
  hint = check(actual, expected);
  hintsEl.innerText = `${hint[0]} быков, ${hint[1]} коров`;
};

expected = generate_num();
window.document.getElementById("guess-form").addEventListener("submit", guess);

resetBtnEl.addEventListener("click", () => {
  expected = generate_num();
  console.log("expected", expected);
  formEl.reset();
  hintsEl.innerText = "Введите 4 разные цифры";
  submitBtnEl.disabled = false;
});

clearBtnEl.addEventListener("click", () => {
  formEl.reset();
});
