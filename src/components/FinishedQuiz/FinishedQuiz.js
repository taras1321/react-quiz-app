import classes from './FinishedQuiz.module.css'
import Button from '../UI/Button/Button'
import { NavLink } from 'react-router-dom'

const FinishedQuiz = (props) => {
  const successCount = Object.keys(props.results).reduce(
    (total, key) => {
      if (props.results[key] === 'success') {
        total++
      }

      return total
    },
    0
  )

  return (
    <div className={classes.FinishedQuiz}>
      <ul>
        {props.quiz.map((quizItem, index) => {
          const cls = [
            'fa',
            props.results[quizItem.id] === 'error'
              ? 'fa-times'
              : 'fa-check',
            classes[props.results[quizItem.id]],
          ]

          return (
            <li key={index}>
              <strong>{index + 1}</strong>. &nbsp;
              {quizItem.question}
              <i className={cls.join(' ')} />
            </li>
          )
        })}
      </ul>

      <p>
        Правильно {successCount} з {props.quiz.length}
      </p>

      <div>
        <Button onClick={props.onRetry} type={'primary'}>
          Повторити
        </Button>
        <NavLink
          to={'/'}
          style={{ color: '#000', textDecoration: 'none' }}
        >
          <Button type={'success'}>Перейти до списку тестів</Button>
        </NavLink>
      </div>
    </div>
  )
}

export default FinishedQuiz
