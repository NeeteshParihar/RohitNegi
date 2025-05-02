
const form = document.getElementById('quizForm');
const scoreContainer = document.querySelector(".score");


function getTarget(event) {
  return event.target;
}

const correctAnswers = {
  q1: "Sachin Tendulkar",
  q2: "West Indies",
  q3: "Sachin Tendulkar",
  q4: "264"
};



const selectedAnwers = [];

const checkedValues = {

};

function isProperty(obj, prop) {
  return obj.hasOwnProperty(prop);
}

function getAttribute(obj, att) {
  return obj.getAttribute(att);
}


form.addEventListener("click", (event) => {



  const target = getTarget(event);


  if (target.tagName != "INPUT") return;


  const name = getAttribute(target, "name");
  const isPresent = isProperty(checkedValues, name);


  if (isPresent) {
    const prev = checkedValues[name];
    prev.classList = "";

  }

  checkedValues[name] = target;
  target.classList.add("checked");

})


form.addEventListener('submit', function (event) {


  event.preventDefault();
  const data = new FormData(form);

  // har ek question mai     sirf ek ji options choose kar skte hai 
  // so formData mai keys sirf ek hi entry aayegi from one question  jo select ki gayi hai
  const entries = Array.from(data.entries());


  let score = 0;
  

  console.log(entries);

  for (const [q, ans] of entries) {

    const buttons = document.querySelectorAll(`input[name=${q}]`);

    const selectedButton = Array.from(buttons).filter(
      (button) => {
        return button.value === ans;
      }
    )[0];
    if(!selectedButton.checked) continue ;


    console.log(selectedButton);
    selectedAnwers.push(selectedButton);

    console.log(`${q} : ${ans}`);
    if (correctAnswers[q] === ans) {
      score++;
      selectedButton.classList.add("correct");
    } else {
      selectedButton.classList.add("wrong");

    }

  }

  scoreContainer.innerHTML = `score :${score} / ${entries.length}`


});


form.addEventListener("reset", () => {
  scoreContainer.innerHTML = "";

  selectedAnwers.forEach((ans) => {
    ans.classList = "";
  })

})

