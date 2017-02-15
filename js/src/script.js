let test = {
  testHeader: 'Тест по программированию',

  questionList: [
    {
      question: 'Вопрос №1',
      answerVariants: ['Вариант ответа №1', 'Вариант ответа №2', 'Вариант ответа №3'],
      rightAnswer: 1
    },
        {
      question: 'Вопрос №2',
      answerVariants: ['Вариант ответа №1', 'Вариант ответа №2', 'Вариант ответа №3'],
      rightAnswer: 2
    },
        {
      question: 'Вопрос №3',
      answerVariants: ['Вариант ответа №1', 'Вариант ответа №2', 'Вариант ответа №3', 'Вариант ответа №4'],
      rightAnswer: 3
    },
  ]
};


let testStr = JSON.stringify(test);
localStorage.setItem('str', testStr);

testStr = localStorage.getItem('str');
let testForGen = JSON.parse(testStr); //js-obj from localStorage


$(function () {
  let testTmpl = $('#tmpl').html();
  let content = tmpl(testTmpl, testForGen);

  $('#test').prepend(content);
})


let sum = 0;
let button = document.getElementById('button');

let rightAnswers = [];

for (let i = 0; i<testForGen.questionList.length; i++) {
  rightAnswers.push(testForGen.questionList[i].rightAnswer); //получили массив с верными ответами
}
console.log('Номера правильных ответов: ' + rightAnswers);

button.addEventListener( 'click', checkResult );

function checkResult() {
  let input = document.getElementsByTagName('input');
  let inputChecked = [];
  for (let i = 0; i<input.length; i++) {
    if (input[i].checked) {
      inputChecked.push(input[i]); // получили массив с выбранными инпутами
    }
  }

  let answersID = [];
  for (let i = 0; i<inputChecked.length; i++) {
  	let ques = Math.floor( (+inputChecked[i].id)/10 )
    let answer = (+inputChecked[i].id)%10; //номер ответа пользователя 
    answersID[ques-1] = answer; //получаем массив с номерами ответов пользователя
  }
  console.log('Номера ответов пользователя: ' + answersID);

  for (let i = 0; i<rightAnswers.length; i++) {
    if (answersID[i]==rightAnswers[i]) {
      sum+=1;
    }
  };

  for (let i = 0; i<input.length; i++) { //очищаем инпуты, можно проходить тест без перезагрузки страницы
    input[i].checked = false; 
  }
  
  //Вывод результатов теста на экран
  let modal = document.querySelector('.modal');
  let fade = document.querySelector('.fade');
  let btn = document.querySelector('.btn');
  let p = modal.querySelector('p'); 
  let wrongAnswers = rightAnswers.length - sum;

  openModal(modal, fade);
  closeModal(modal, fade, btn);

  if (sum==rightAnswers.length) testResult(p, wrongAnswers,'Тест пройден')
  else testResult(p, wrongAnswers);
};

let openModal = (block_1, block_2) => {
  block_1.style.display = 'block';
  block_2.style.opacity = 1;
};

let closeModal = (block_1, block_2, btn) => {
  btn.addEventListener ('click', function() {
      block_1.style.display = 'none';
      block_2.style.opacity = 0;
    })
};

let testResult = ( block, a, innerText = ('Тест не пройден... Количество неправильных ответов: ' + a) ) => {
  block.innerHTML = innerText;
  sum = 0; 
  return sum
};






