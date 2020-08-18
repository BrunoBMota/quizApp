/**
 * Example store structure
 */
'use strict'
let store = {
  // 5 or more questions are required
  questions: [
    {
      question: 'What was the name of the halo ring that Master Chief destroys at the end of Halo 3?',
      answers: [
        'Installation 00',
        'The Ark',
        'Installation 08',
        'Installation 04'
      ],
      correctAnswer: 'c',
      correctAnswerChoice: 'Installation 08',
      correctAnswerStatement: 'Installation 08 was a partially completed Halo ring which was constructed at the Ark after the destruction of Installation 04. Incomplete to the point where firing would result in its destruction, this replacement was destroyed by Spartan-II Master Chief John-117 at the end of Halo 3 in order to end the flood threat.'
    },
    {
      question: 'What city did the Locust attack occur in at the start of Gears of War 2?',
      answers: [
        'Nexus',
        'Ilima',
        'Tyrus',
        'Jacinto City'
      ],
      correctAnswer: 'd',
      correctAnswerChoice: 'Jacinto City',
      correctAnswerStatement: 'With the Locust Horde suffering from massive losses and a damaged infrastructure from the Lightmass Offensive, the Horde decided that the only way to defeat the Humans was to attack their last bastion of hope: Jacinto City.'
    },
    {
      question: 'What was the name of the town that Mario had to clean up while on vacation?',
      answers: [
        'Mushroom Kingdom',
        'Delfino Island',
        'Toad Town',
        'Cheep-Cheep Island',
      ],
      correctAnswer: 'b',
      correctAnswerChoice: 'Delfino Island',
      correctAnswerStatement: 'As Shadow Mario wreaked havoc on the island. Mario gets framed for causing havoc among the island and he can\'t leave until he cleans up the mess.'
    },
    {
      question: 'What is Sonic the Hedgehog\'s nemesis name?',
      answers: [
        'Knuckles',
        'Shadow',
        'Rouge',
        'Dr. Eggman',
      ],
      correctAnswer: 'd',
      correctAnswerChoice: 'Dr. Eggman',
      correctAnswerStatement: 'Dr. Ivo Robotnik (also known as Dr. Eggman) is an evil scientist and dictator who seeks to rule over the entire world and turn it into his personal Eggman Empire. With his Egg Army, Badnik Horde, and airships, he is ever persistent in his quest for world domination despite his constant losses at the hands of his most hated enemy Sonic the Hedgehog and his allies, the Freedom Fighters.'
    },
    {
      question: 'Where is Link from?',
      answers: [
        'The Lost Forest',
        'Kakariko Forest',
        'Hyrule',
        'Gerudo Valley',
      ],
      correctAnswer: 'b',
      correctAnswerChoice: 'Kakariko Forest',
      correctAnswerStatement: 'In the Ocarina of Time (1998) Links home location is first portrayed in the Kakariko Forest'
    },
  ],
  quizStarted: false,
  questionNumber: 0,
  score: 0,
  feedback: false,
  feedbackScreen: false
};
/**
 * 
 * Technical requirements:
 * 
 * Your app should include a render() function, that regenerates the view each time the store is updated. 
 * See your course material, consult your instructor, and reference the slides for more details.
 *
 * NO additional HTML elements should be added to the index.html file.
 *
 * You may add attributes (classes, ids, etc) to the existing HTML elements, or link stylesheets or additional scripts if necessary
 *
 * SEE BELOW FOR THE CATEGORIES OF THE TYPES OF FUNCTIONS YOU WILL BE CREATING 👇
 * 
 */

/********** TEMPLATE GENERATION FUNCTIONS **********/
// These functions return HTML templates
function introView(){
  return `
  <div class="introView">
      <h2>Score ${Math.round(store['questions'].length/2)} of ${store['questions'].length} to win!</h2>
      <button id="start">START</button>
    </div>
  `;
}

function questionView(){
  let questions = store['questions'];
  return `
  <div class="questionView">
      <h1>Question ${store['questionNumber'] + 1} of 5</h1>
      <div class="questionContainer">
        <form action="/">
          <fieldset>
            <legend>
              <p>${questions[store['questionNumber']]['question']}</p>
            </legend>
            <input type="radio" name="selection" id="a" value="a">
            <label for="a">A. ${questions[store['questionNumber']]['answers'][0]}</label>
            <br>
            <input type="radio" name="selection" id="b" value="b" >
            <label for="b">B. ${questions[store['questionNumber']]['answers'][1]}</label>
            <br>
            <input type="radio" name="selection" id="c" value="c" >
            <label for="c">C. ${questions[store['questionNumber']]['answers'][2]}</label>
            <br>
            <input type="radio" name="selection" id="d" value="d" >
            <label for="d">D. ${questions[store['questionNumber']]['answers'][3]}</label>
          </fieldset>
          ${store['questionNumber'] === 4 ? `<input type="submit" name="final-submit" id="final" value="SUBMIT FINAL RESULTS">` : `<input type="submit" name="next-submit" id="next" value="SUBMIT">`}
        </form>
      </div>
      <h1>Correct answers: ${store['score']} of ${store['questions'].length}</h1>
    </div>
  `;
}

function feedbackView(){
  let correctAnswer = store['questions'][store['questionNumber'] - 1]['correctAnswer'].toUpperCase();
  let correctAnswerChoice = store['questions'][store['questionNumber'] - 1]['correctAnswerChoice'];
  let correctAnswerStatement = store['questions'][store['questionNumber'] - 1]['correctAnswerStatement'];
  return `
  <div class="feedbackView">
    <h2>${store['feedback'] ? 'Correct!': 'Incorrect!'}</h2>
    <p>${!store['feedback'] ? `The correct answer was: <br>${correctAnswer}. ${correctAnswerChoice}`: 'Good Job!'}</p>
    ${!store['feedback'] ? `<p id="statement">${correctAnswerStatement}</p>`: ''}
    <h2>Correct answers: ${store['score']} of ${store['questions'].length}</h2>
    <button id="continue">CONTINUE</button>
  </div>
  `;
}

function resultsView(){
  let winMessage = 'Congratulations!';
  let loseMessage = 'Better luck next time!';


  return `
  <div class="resultsView">
      <div class="resultsContainer">
        <h2>END OF GAME</h2>
        <h3>Score: </h3>
        <ul>
          <li>
            <p>Correct: ${store['score']}</p>
          </li>
          <li>
            <p>Incorret: ${Math.abs(store['score'] - store['questions'].length)}</p>
          </li>
        </ul>
      </div>
      <p>${store['score'] >= 3 ? winMessage : loseMessage}</p>
      <p>Press the button below to start a new game!</p>
      <button id="new">NEW GAME</button>
    </div>
  `;
}

/********** RENDER FUNCTION(S) **********/
// This function conditionally replaces the contents of the <main> tag based on the state of the store
function renderModel(){
  if(store['quizStarted'] === false){
    $('main').html(introView);
  }
  else if(store['questionNumber'] === 5 && store['feedbackScreen'] === false){
    $('main').html(resultsView);
  }
  else if(store['feedbackScreen'] === true){
    $('main').html(feedbackView);
  }
  else{
    $('main').html(questionView);
  }
}

/********** EVENT HANDLER FUNCTIONS **********/
// These functions handle events (submit, click, etc)
function submitAnswer(){
  if($('input:radio[name=selection]:checked')['length'] > 0){
    if($('input[name=selection]:checked').val() === store['questions'][store['questionNumber']]['correctAnswer']){
      store['feedback'] = true;
      store['questionNumber']++;
      store['score']++;
    }
    else{
      store['feedback'] = false;
      store['questionNumber']++;
    }
    store['feedbackScreen'] = true;
  }
  else{
    alert('Please select at least one choice.');
  }
}

function handleStart(){
  $('main').on('click', '#start', function(event){
    store['quizStarted'] = true;
    renderModel();
  });
}

function handleNext(){
  $('main').on('click', '#next', function(event){
    submitAnswer();
    renderModel();
  });
}

function handleContinue(){
  $('main').on('click', '#continue', function(event){
    store['feedbackScreen'] = false;
    renderModel();
  });
}

function handleSubmit(){
  $('main').on('click', '#final', function(event){
    submitAnswer();
    renderModel();
  });
}

function handleNewGame(){
  $('main').on('click', '#new', function(event){
    store['score'] = 0;
    store['questionNumber'] = 0;
    store['feedbackScreen'] = false;
    store['quizStarted'] = false;
    renderModel();
  });
}

function main(){
  renderModel();
  handleStart();
  handleNext();
  handleContinue();
  handleSubmit();
  handleNewGame();
}

$(main);