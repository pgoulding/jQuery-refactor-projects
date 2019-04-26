/*---------- Query Selectors -----------*/
var outputRangeMin = document.querySelector('#range-min');
var outputRangeMax = document.querySelector('#range-max');
var outputNameCh1 = document.querySelector('#name-output-challenger1');
var outputNameCh2 = document.querySelector('#name-output-challenger2');
var outputGuessCh1 = document.querySelector('#guess-output-challenger1');
var outputGuessCh2 = document.querySelector('#guess-output-challenger2');
var outputHighLow1 = document.querySelector('#guess-output-high-low1');
var outputHighLow2 = document.querySelector('#guess-output-high-low2');

var formUpdateRange = document.querySelector('#form-range');
var formChallenger = document.querySelector('#form-challenger');

/*---------- jQuery Selectors ----------*/
const $btnUpdateRange = $('#btn-update');
const $btnSubmit = $('#btn-submit')
const $btnClear = $('#btn-clear') 
const $btnReset = $('#btn-reset')
const $asideColumn = $('aside')
const $error = $('.hidden-error');
let $inputGuessCh1 = $('#input-guess-challenger1');
let $inputGuessCh2 = $('#input-guess-challenger2');
let $inputRangeMin = $('#input-minrange');
let $inputRangeMax = $('#input-maxrange');
let $inputNameCh1 = $('#input-name-challenger1');
let $inputNameCh2 = $('#input-name-challenger2');

const $errorInputMax = $('#range-error-max');
/*--------- jQuery Listeners ----------*/
$btnUpdateRange.on('click', e => validateInputRange(e))
$btnSubmit.on('click', e => minMaxGuessValidation(e))
$btnClear.on('click', e => resetChallengerForm(e))
$btnReset.on('click', e => resetGame(e))
$asideColumn.on('click', e => deleteCard(e));
$inputGuessCh1.on('input', () => validateChallenger1());
$inputGuessCh2.on('input', () => validateChallenger2())
$inputNameCh1.on('input', () => validateChallenger1());
$inputNameCh2.on('input', () => validateChallenger2());
$('.input-num').on('keydown', e => validateRange(e))
$('.guesses-challenger').on('keydown', e => validateForAlphaNumeric(e))

$inputRangeMin.on('keydown', e => {
  toggleDisabledBtnUpdate(e)
  validateRange(e)
});

$inputRangeMax.on('keydown', e => {
  toggleDisabledBtnUpdate(e)
  validateRange(e)
});

/*---------- Global Variables ----------*/
let outputWinner = '';
let timer = 0;
let guessCounter = 1;
let $minNumber = parseInt($inputRangeMin.val() || 1);
let $maxNumber = parseInt($inputRangeMax.val() || 100);

/*---------- Functions -----------------*/

$(document).ready(() => {
  makeRandomNumber()
  startClock()
})

function makeRandomNumber() {
    if($minNumber<=0){
    $minNumber = 1;
  }
  randomNum = Math.floor(Math.random() * ($maxNumber - $minNumber + 1)) + $minNumber;
  console.log(randomNum);
  
};

function validateChallenger1() {
  toggleDisabledClear()
  toggleDisabledBtnSubmit()
  validateCh1Name()
};

function validateChallenger2() {
  toggleDisabledClear()
  toggleDisabledBtnSubmit()
  validateCh2Name()
};

function validateChallenger1Guess(){
  toggleDisabledBtnSubmit()
  toggleDisabledClear()
  errorCheckCh1Guess()
};

function validateChallenger2Guess() {
  toggleDisabledBtnSubmit()
  toggleDisabledClear()
  errorCheckCh2Guess()
};

function validateAllInputs() {
  validateChallenger1Guess();
  validateChallenger2Guess();
  validateCh1Name();
  validateCh2Name();
};

function toggleDisabledBtnUpdate() {
  if ($inputRangeMin.val() && $inputRangeMax.val() == '') {
    $btnUpdateRange.attr('disabled')
  }
};

function toggleDisabledBtnSubmit() {
  if ($inputGuessCh1.val() && $inputGuessCh2.val() && $inputNameCh1.val() && $inputNameCh2.val() != '') {
    $btnSubmit.removeAttr('disabled');
  } else {
    $btnSubmit.attr('disabled', 'disabled');
  }
};

function toggleDisabledClear() {
  if ($inputNameCh1.val() != '' || $inputNameCh2.val() != '') {
    $btnClear.removeAttr('disabled');
  }
  if ($inputGuessCh1.val() != '' || $inputGuessCh2.val() != '') {
    $btnClear.removeAttr('disabled');
  }
  if ($inputGuessCh1.val() == '' || $inputGuessCh2.val() == '') {
    $btnClear.attr('disabled', 'disabled');
  }
};

function validateRange(e) {
  var regexCharNum = /[\d\t\r]/;
  if (e.key === 'Backspace' || regexCharNum.test(e.key)) {
  } else {
    e.preventDefault();
  }
};

function validateForAlphaNumeric(e) {
  var regexChar = /[\w\t\n\r]/;
  if (e.key === 'Backspace' || regexChar.test(e.key)) {
  } else {
    e.preventDefault();
  }
};

function validateCh1Name() {
  let $errorName1 = $('#name-error-1');
  if ($inputNameCh1.val() == '') {
    $inputNameCh1.addClass('error')
    $errorName1.slideDown()
  } else {
    $inputNameCh1.removeClass('error');
    $errorName1.slideUp()
  }
}

function validateCh2Name() {
  let $errorName2 = $('#name-error-2');
  if ($inputNameCh2.val() == '') {
    $inputNameCh2.addClass('error');
    $errorName2.slideDown()
  } else {
    $inputNameCh2.removeClass('error');
    $errorName2.slideUp()
  }
}

function errorCheckCh1Guess(){
  let $errorGuess1 = $('#guess-error-1');
  if ($inputGuessCh1.value == '') {
    $inputGuessCh1.addClass('error');
    $errorGuess1.slideDown()
  } else {
    $inputGuessCh1.removeClass('error');
    $errorGuess1.slideUp()
  } 
}

function errorCheckCh2Guess() {
  let $errorGuess2 = $('#guess-error-2');
  if ($inputGuessCh2.val() == '') {
    $inputGuessCh2.addClass('error');
    $errorGuess2.slideDown();
  } else {
    $inputGuessCh2.removeClass('error');
    $errorGuess2.slideUp();
  }
}

function validateInputRange(e) {
  e.preventDefault();
  if ($inputRangeMin.val() > $inputRangeMax.val()) {
    addRangeError();
    return;
    } else if ($inputRangeMin.val() < $inputRangeMax.val()) {
    removeRangeError();
    updateRange();
  }
};

function addRangeError() {
  $('#range-error-min').slideDown()
  $('#range-error-max').slideDown()
  $inputRangeMin.addClass('error');
  $inputRangeMax.addClass('error');
  $btnUpdateRange.css('align-self', 'center');
};

function removeRangeError() {
  $('#range-error-min').slideUp()
  $('#range-error-max').slideUp();
  $inputRangeMin.removeClass('error')
  $inputRangeMax.removeClass('error')
  $btnUpdateRange.css('align-self', 'flex-end');
}

function updateRange() {
  $minNumber = parseInt($inputRangeMin.val()) || 1;
  $maxNumber = parseInt($inputRangeMax.val()) || 100;
  makeRandomNumber();
  changeDOMRange();
  formUpdateRange.reset();
};

function changeDOMRange() {
  outputRangeMin.innerText = $minNumber;
  outputRangeMax.innerText = $maxNumber;
};

function checkGuess(inputGuess) {
  let outputHighLow = outputHighLow1;
  let inputName = $inputNameCh1;
  if(inputGuess.id === $inputGuessCh2.id){
    outputHighLow = outputHighLow2;
    inputName = $inputNameCh2;
  } 
  if(inputGuess.val() == randomNum) { 
    winner(outputHighLow, inputName)
  } else if (inputGuess.val() < randomNum) {
    tooLow(outputHighLow)
  } else { 
    tooHigh(outputHighLow);
  }
};

function tooLow(outputHighLow) {
  outputHighLow.innerText = 'that\'s too low';
  guessCounter++;
};

function tooHigh(outputHighLow) {
    outputHighLow.innerText = 'that\'s too high';
    guessCounter ++;
};

function winner(outputHighLow, inputName) {
  outputWinner = inputName.val();
  outputHighLow.innerText = 'BOOM';
  increaseDifficulty();
  appendCard();
  guessCounter = 0;
  $btnReset.removeAttr('disabled')
}


function resetChallengerForm(e){
  e.preventDefault();
  formChallenger.reset();
  $btnClear.attr('disabled','disabled') 
};

function resetGame (e){
  e.preventDefault()
  formChallenger.reset()
  $minNumber = 1;
  $maxNumber = 100;
  changeDOMRange();
  makeRandomNumber()
  displayNames() 
  $btnReset.attr('disabled','disabled')
  $btnClear.attr('disabled','disabled')
  $btnSubmit.attr('disabled','disabled')
}

function minMaxGuessValidation(e){
  e.preventDefault()
  if($inputGuessCh1.val() > $maxNumber || $inputGuessCh1.val() < $minNumber){
    addGuessErrors()
  } else if($inputGuessCh2.val() > $maxNumber || $inputGuessCh2.val() < $minNumber){
    addGuessErrors()
  }else{
    removeGuessErrors();
    playGame()
  }
}

function addGuessErrors(){
  $inputGuessCh1.addClass('error');
  $inputGuessCh2.addClass('error');
  $('#guess-error-1').slideDown();
  $('#guess-error-2').slideDown();
}

function removeGuessErrors(){
  $inputGuessCh1.removeClass('error');
  $inputGuessCh2.removeClass('error');
  $('#guess-error-1').slideUp();
  $('#guess-error-2').slideUp();
}


function playGame() {
  displayNames();
  checkGuess($inputGuessCh1);
  checkGuess($inputGuessCh2);
  validateAllInputs();
} 

function displayNames(){
  outputNameCh1.innerText = $inputNameCh1.val() || 'Challenger 1 Name';
  outputGuessCh1.innerText = $inputGuessCh1.val() || '--';
  outputNameCh2.innerText = $inputNameCh2.val() || 'Challenger 2 Name';
  outputGuessCh2.innerText = $inputGuessCh2.val() || '--';
}

function appendCard(){
  let newWinner = $(`<section class="card-winner">
      <div class="versus-challenger">
        <p class="card-output-ch1">${$inputNameCh1.val() || `Challenger 1`}</p>
        <p class="vs-style">VS</p>
        <p class="card-output-ch2">${$inputNameCh2.val() || `Challenger 2`}</p>
      </div>
      <hr>
      <div class="card-output-results">
          <h2 class="winner">${outputWinner || 'Challenger'}</h2>
          <p class="card-style-winner">Winner</p>
      </div>
      <hr>
      <div class="card-bottom-wrapper">
        <p><span class="card-num-guess">${guessCounter} </span>Guesses</p>
        <p><span class="card-min">${timer}</span> seconds</p>
        <i class="fas fa-times-circle delete"></i>
      </div>
    </section>`)
  $asideColumn.prepend(newWinner)
  makeRandomNumber();
  resetTimer();
}

function resetTimer(){
  clearInterval(timer)
  timer = 0;
}

function increaseDifficulty(){
  $minNumber = $minNumber -10;
  $maxNumber = $maxNumber +10;
  if ($minNumber <= 0){
    outputRangeMin.innerText = 1;
    outputRangeMax.innerText = $maxNumber;
  }else{
  outputRangeMin.innerText = $minNumber;
  outputRangeMax.innerText = $maxNumber;
  }
}

function deleteCard(e){
  if (e.target.classList.contains('delete')){
    e.target.closest('section').remove();
  }
}

function startClock(){
  setInterval(()=>timer++, 1000)
}