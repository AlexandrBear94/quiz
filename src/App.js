import React from 'react';
import './index.scss';

const questions = [
  {
    title: 'React - это ... ?',
    variants: ['библиотека', 'фреймворк', 'приложение'],
    correct: [0]
  },
  {
    title: 'Компонент - это ... ',
    variants: ['приложение', 'часть приложения или страницы', 'то, что я не знаю что такое'],
    correct: [1]
  },
  {
    title: 'Что такое JSX?',
    variants: [
      'Это простой HTML',
      'Это функция',
      'Это тот же HTML, но с возможностью выполнять JS-код',
    ],
    correct: [2]

  },
];

function Result({ correct }) {
  return (
    <div className="result">
      <img src="https://cdn-icons-png.flaticon.com/512/2278/2278992.png" />
      <h2>Вы отгадали {correct} ответа из {questions.length}</h2>
      <a href='/'>
        <button>Попробовать снова</button>
      </a>
    </div>
  );
}

function Game({ step, question, onClickVariant, nextStep, focusButton }) {

  const percentage = Math.round(step / questions.length * 100)

  return (
    <>
      <div className="progress">
        <div style={{ width: `${percentage}%` }} className="progress__inner"></div>
      </div>
      <h1>{question.title}</h1>
      <ul>
        {
          question.variants.map((text, index) => <li className={`${focusButton.includes(index) ? 'active' : ''}`} key={text} onClick={() => onClickVariant(index)}>{text}</li>)
        }
      </ul>
      <button onClick={() => nextStep(step)}>Ответить</button>
    </>
  );
}

function App() {

  const [step, setStep] = React.useState(0);
  const [correct, setCorrect] = React.useState(0);
  const [focusButton, setFocusButton] = React.useState([]);
  const question = questions[step];

  const nextStep = () => {

    let arrWrongAnswere = focusButton.filter(num => !questions[step].correct.includes(num))
    if (arrWrongAnswere.length == 0 && focusButton.length == questions[step].correct.length) {
      setCorrect(correct + 1);

    }

    setStep(step + 1);
    setFocusButton([]);
  }

  const onClickVariant = (index) => {

    if (focusButton.includes(index)) {
      setFocusButton(focusButton.filter(num => index !== num));
    } else {
      setFocusButton(prev => [...prev, index])
      console.log(focusButton);
    }

  }


  return (
    <div className="App">
      {
        step !== questions.length ? (
          <Game step={step} question={question} onClickVariant={onClickVariant} nextStep={nextStep} focusButton={focusButton} />
        ) : (
          <Result correct={correct} />
        )
      }

    </div>
  );
}

export default App;
