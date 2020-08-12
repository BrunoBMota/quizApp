/**
 * Example store structure
 */
'use strict'
let lastAnswer = false;
let questions = {
  // 5 or more questions are required
  questions: [
    {
      question: ' What was the name of the halo ring that Master Chief destroys at the end of Halo 3?',
      answers: [
        'Installation 00',
        'The Ark',
        'Installation 08',
        'Installation 04'
      ],
      correctAnswer: 'c'
    },
    {
      question: 'What city did the Locust attack occur in at the start of Gears of War 2?',
      answers: [
        'Nexus',
        'Ilima',
        'Tyrus',
        'Jacinto City'
      ],
      correctAnswer: 'd'
    },
    {
      question: 'What was the name of the town that Mario had to clean up while on vacation?',
      answers: [
        'Mushroom Kingdom',
        'Delfino Island',
        'Toad Town',
        'Cheep-Cheep Island',
      ],
      correctAnswer: 'b'
    },
    {
      question: 'What is Sonic the Hedgehog\'s nemesis name?',
      answers: [
        'Knuckles',
        'Shadow',
        'Rouge',
        'Dr. Eggman',
      ],
      correctAnswer: 'd'
    },
    {
      question: 'Where is Link from?',
      answers: [
        'The Lost Forest',
        'Kakariko Forest',
        'Hyrule',
        'Gerudo Valley',
      ],
      correctAnswer: 'b'
    },
  ],
  quizStarted: false,
  questionNumber: 0,
  score: 0
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
      <h1>Video Game Trivia!</h1>
      <h2>Score 3/5 to win!</h2>
      <button>Start</button>
    </div>
  `;
}

function questionView(){
  let question = questions.questions[questions['questionNumber']];
  return `
  <div class="questionView">
      <h1>Question ${questions['questionNumber'] + 1} of 5</h1>
      <div class="questionContainer">
        <p>${question['question']}</p>
        <form>
          <input type="radio" name="selection" id="a" value="a">
          <label for="">A. ${question['answers'][0]}</label>
          <br>
          <input type="radio" name="selection" id="b" value="b">
          <label for="">B. ${question['answers'][1]}</label>
          <br>
          <input type="radio" name="selection" id="c" value="c">
          <label for="">C. ${question['answers'][2]}</label>
          <br>
          <input type="radio" name="selection" id="d" value="d">
          <label for="">D. ${question['answers'][3]}</label>
          <br>
          ${questions['questionNumber'] === 4 ? `<input type="button" name="final-submit" id="final" value="SUBMIT FINAL RESULTS">` : `<input type="button" name="next-submit" id="next" value="SUBMIT">`}
        </form>
      </div>
    </div>
  `;
}

function feedbackView(){
  return `
  <div class="feedbackView">
      <p>${lastAnswer ? 'correct': 'incorrect'}</p>
      <p>{if incorrect will display the correct answer. else will just display good job}</p>
      <button>Continue</button>
    </div>
  `;
}


function resultsView(){
  return `
  <div class="resultsView">
      <div class="resultsContainer">
        <h2>END OF GAME</h2>
        <h3>Score: </h3>
        <ul>
          <li>
            <p>Correct {#}</p>
          </li>
          <li>
            <p>Incorret {#}</p>
          </li>
        </ul>
      </div>
      <p>{Results Message}</p>
      <button>NEW GAME</button>
    </div>
  `;
}


/********** RENDER FUNCTION(S) **********/
// This function conditionally replaces the contents of the <main> tag based on the state of the store
function renderIntroView(){
  $('main').html(introView());
}

function renderQuestionView(){
  $('main').html(questionView());
}

function renderFeedbackView(){
  $('main').html(feedbackView());
}

function renderResultsView(){
  $('main').html(resultsView());
}

/********** EVENT HANDLER FUNCTIONS **********/
// These functions handle events (submit, click, etc)
function submitAnswer(event){
  event.preventDefault();
  if(questions['questionNumber'] < 4){
    if($('input[name=selection]:checked').val() === questions.questions[questions['questionNumber']].correctAnswer){
      console.log('correct');
      lastAnswer = true;
      questions['questionNumber']++;
      questions['score']++;
    }
    else{
      console.log('false');
      lastAnswer = false;
      questions['questionNumber']++;
    }
    renderFeedbackView();
  }

  if(questions['questionNumber'] === 4){
    if($('input[name=selection]:checked').val() === questions.questions[questions['questionNumber']].correctAnswer){
      console.log('correct');
      lastAnswer = true;
      questions['score']++;
    }
    else{
      console.log('false');
      lastAnswer = false;
    }
  }
}

function main(){
  renderIntroView();
}

$('main').on('click', '#next', submitAnswer);
$('main').on('click', 'button', renderQuestionView);
$('main').on('click', '#final', renderResultsView);


$(main);