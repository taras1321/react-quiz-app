import React, { Component } from 'react'
import classes from './QuizCreator.module.css'
import Button from '../../components/UI/Button/Button'
import Select from '../../components/UI/Select/Select'
import Input from '../../components/UI/Input/Input'
import {
  createControl,
  validate,
  validateForm,
} from '../../form/formFram'
import axios from '../../axios/axios-quiz'

function createOptionControl(number) {
  return createControl(
    {
      label: 'Варіант ' + number,
      errorMessage: 'Поле не може бути порожнім',
      id: number,
    },
    { required: true }
  )
}

function createFormContros() {
  return {
    question: createControl(
      {
        label: 'Введіть питання',
        errorMessage: 'Поле не може бути порожнім',
      },
      { required: true }
    ),
    option1: createOptionControl(1),
    option2: createOptionControl(2),
    option3: createOptionControl(3),
    option4: createOptionControl(4),
  }
}

class QuizCreator extends Component {
  state = {
    quiz: [],
    quizName: null,
    isQuizName: false,
    isFormValid: false,
    rightAnswerId: 1,
    formControls: createFormContros(),
  }

  submiteHandler = (event) => {
    event.preventDefault()
  }

  addQuestionHandler = () => {
    const quiz = [...this.state.quiz]

    const index = quiz.length + 1

    const { question, option1, option2, option3, option4 } =
      this.state.formControls

    const questionItem = {
      quizName: this.state.quizName,
      question: question.value,
      id: index,
      rightAnswerId: this.state.rightAnswerId,
      answers: [
        {
          text: option1.value,
          id: this.state.formControls.option1.id,
        },
        {
          text: option2.value,
          id: this.state.formControls.option2.id,
        },
        {
          text: option3.value,
          id: this.state.formControls.option3.id,
        },
        {
          text: option4.value,
          id: this.state.formControls.option4.id,
        },
      ],
    }

    quiz.push(questionItem)

    this.setState({
      quiz,
      isFormValid: false,
      rightAnswerId: 1,
      formControls: createFormContros(),
    })
  }

  createQuizHandler = async () => {
    try {
      await axios.post('/quizes.json', this.state.quiz)

      this.setState({
        quiz: [],
        quizName: null,
        isQuizName: false,
        isFormValid: false,
        rightAnswerId: 1,
        formControls: createFormContros(),
      })
    } catch (e) {
      console.log(e)
    }
  }

  changeHandler = (value, controlName) => {
    const formControls = { ...this.state.formControls }
    const control = { ...formControls[controlName] }

    control.touched = true
    control.value = value
    control.valid = validate(control.value, control.validation)

    formControls[controlName] = control

    this.setState({
      formControls,
      isFormValid: validateForm(formControls),
    })
  }

  renderControls() {
    return Object.keys(this.state.formControls).map(
      (controlName, index) => {
        const control = this.state.formControls[controlName]

        return (
          <React.Fragment key={controlName + index}>
            <Input
              label={control.label}
              value={control.value}
              valid={control.valid}
              shouldValidate={!!control.validation}
              touched={control.touched}
              errorMessage={control.errorMessage}
              onChange={(event) =>
                this.changeHandler(event.target.value, controlName)
              }
            />
          </React.Fragment>
        )
      }
    )
  }

  selectChangeHandler = (event) => {
    this.setState({
      rightAnswerId: +event.target.value,
    })
  }

  quizNameChangeHanlder = (event) => {
    this.setState({ quizName: event.target.value })
  }

  createQuizNameHandler = (event) => {
    event.preventDefault()
    this.setState({ isQuizName: true })
  }

  render() {
    const select = (
      <Select
        label={'Виберіть правильну відповідь'}
        value={this.state.rightAnswerId}
        onChange={this.selectChangeHandler}
        options={[
          { text: 1, value: 1 },
          { text: 2, value: 2 },
          { text: 3, value: 3 },
          { text: 4, value: 4 },
        ]}
      />
    )
    return (
      <div className={classes.QuizCreator}>
        <div>
          <h1>Створення тесту</h1>

          {!this.state.isQuizName ? (
            <form>
              <Input
                required
                label="Назва тесту"
                onChange={this.quizNameChangeHanlder}
              />
              <Button
                onClick={this.createQuizNameHandler}
                type={'primary'}
                disabled={!this.state.quizName}
              >
                Готово
              </Button>
            </form>
          ) : (
            <form onSubmit={this.submiteHandler}>
              {this.renderControls()}

              {select}

              <Button
                type={'primary'}
                onClick={this.addQuestionHandler}
                disabled={!this.state.isFormValid}
              >
                Додати питання
              </Button>

              <Button
                type={'success'}
                onClick={this.createQuizHandler}
                disabled={this.state.quiz.length === 0}
              >
                Створити тест
              </Button>
            </form>
          )}
        </div>
      </div>
    )
  }
}

export default QuizCreator
