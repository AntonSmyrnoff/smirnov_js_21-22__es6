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
console.log(button);

button.addEventListener( 'click', checkResult );

function checkResult() {
  let input = document.getElementsByTagName('input');
  let inputChecked = [];
  for (let i = 0; i<input.length; i++) {
    if (input[i].checked) {
      inputChecked.push(input[i]);
    }
  }
  console.log(inputChecked);
}

/*  $('#checkResult').on('click', function() {    
    $('input:checked').each(function() {
      let inputCheckedId = $(this).attr('id');
      
      let ques = Math.floor(inputCheckedId/10); //номер вопроса
      let answ = inputCheckedId%10; //номер выбранного ответа

      if (testForGen.questionList[ques-1].rightAnswer === answ) {
        sum += 1
      }

      $(this).attr('checked', false)//очищаем инпуты
    })

    openModal();
    closeModal();
    if (sum == testForGen.questionList.length) {
      $('.modal-body p').html('Тест пройден!');
      sum = 0; //после закрытия модальки обнуляем сумму и можно проходить тест заново без перезагрузки страницы
      return sum
    }
    else {
      $('.modal-body p').html('Тест не пройден... Количество неправильных ответов: ' + (testForGen.questionList.length - sum) );
      sum = 0;
      return sum
    };

  })

  function openModal() {
    $('.modal').css({'display' : 'block'});
    $('.fade').css({'opacity' : 1});
  }

  function closeModal() {
    $('.btn').click(function() {
        $('.modal').css({'display' : 'none'});
        $('.fade').css({'opacity' : 0});
      })
  }*/







