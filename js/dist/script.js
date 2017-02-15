'use strict';

var test = {
  testHeader: 'Тест по программированию',

  questionList: [{
    question: 'Вопрос №1',
    answerVariants: ['Вариант ответа №1', 'Вариант ответа №2', 'Вариант ответа №3'],
    rightAnswer: 1
  }, {
    question: 'Вопрос №2',
    answerVariants: ['Вариант ответа №1', 'Вариант ответа №2', 'Вариант ответа №3'],
    rightAnswer: 2
  }, {
    question: 'Вопрос №3',
    answerVariants: ['Вариант ответа №1', 'Вариант ответа №2', 'Вариант ответа №3', 'Вариант ответа №4'],
    rightAnswer: 3
  }]
};

var testStr = JSON.stringify(test);
localStorage.setItem('str', testStr);

testStr = localStorage.getItem('str');
var testForGen = JSON.parse(testStr); //js-obj from localStorage


$(function () {
  var testTmpl = $('#tmpl').html();
  var content = tmpl(testTmpl, testForGen);

  $('#test').prepend(content);
});

var sum = 0;
var button = document.getElementById('button');

var rightAnswers = [];

for (var i = 0; i < testForGen.questionList.length; i++) {
  rightAnswers.push(testForGen.questionList[i].rightAnswer); //получили массив с верными ответами
}
console.log('Номера правильных ответов: ' + rightAnswers);

button.addEventListener('click', checkResult);

function checkResult() {
  var input = document.getElementsByTagName('input');
  var inputChecked = [];
  for (var _i = 0; _i < input.length; _i++) {
    if (input[_i].checked) {
      inputChecked.push(input[_i]); // получили массив с выбранными инпутами
    }
  }

  var answersID = [];
  for (var _i2 = 0; _i2 < inputChecked.length; _i2++) {
    var ques = Math.floor(+inputChecked[_i2].id / 10);
    var answer = +inputChecked[_i2].id % 10; //номер ответа пользователя 
    answersID[ques - 1] = answer; //получаем массив с номерами ответов пользователя
  }
  console.log('Номера ответов пользователя: ' + answersID);

  for (var _i3 = 0; _i3 < rightAnswers.length; _i3++) {
    if (answersID[_i3] == rightAnswers[_i3]) {
      sum += 1;
    }
  };

  for (var _i4 = 0; _i4 < input.length; _i4++) {
    //очищаем инпуты, можно проходить тест без перезагрузки страницы
    input[_i4].checked = false;
  }

  //Вывод результатов теста на экран
  var modal = document.querySelector('.modal');
  var fade = document.querySelector('.fade');
  var btn = document.querySelector('.btn');
  var p = modal.querySelector('p');
  var wrongAnswers = rightAnswers.length - sum;

  openModal(modal, fade);
  closeModal(modal, fade, btn);

  if (sum == rightAnswers.length) testResult(p, wrongAnswers, 'Тест пройден');else testResult(p, wrongAnswers);
};

var openModal = function openModal(block_1, block_2) {
  block_1.style.display = 'block';
  block_2.style.opacity = 1;
};

var closeModal = function closeModal(block_1, block_2, btn) {
  btn.addEventListener('click', function () {
    block_1.style.display = 'none';
    block_2.style.opacity = 0;
  });
};

var testResult = function testResult(block, a) {
  var innerText = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'Тест не пройден... Количество неправильных ответов: ' + a;

  block.innerHTML = innerText;
  sum = 0;
  return sum;
};
