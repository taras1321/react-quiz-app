import React, { Component } from 'react'
import classes from './QuizList.module.css'
import { NavLink } from 'react-router-dom'
import Loader from '../../components/UI/Loader/Loader'
import axios from '../../axios/axios-quiz'

class QuizList extends Component {
  state = {
    quizes: [],
    loading: true,
  }

  renderQuizes() {
    return this.state.quizes.map((quiz) => {
      return (
        <li key={quiz.id}>
          <NavLink to={'/quiz/' + quiz.id}>{quiz.name}</NavLink>
        </li>
      )
    })
  }

  async componentDidMount() {
    try {
      const response = await axios.get('/quizes.json')

      const quizes = []
      if (response.data) {
        Object.keys(response.data).forEach((key, index) => {
          quizes.push({
            id: key,
            name: response.data[key][0].quizName,
          })
        })
      }
      this.setState({ quizes, loading: false })
    } catch (e) {
      console.log(e)
    }
  }

  render() {
    return (
      <div className={classes.QuizList}>
        <div>
          <h1>Список тестів</h1>
          {this.state.loading ? (
            <Loader />
          ) : !this.state.quizes.length ? (
            <div>
              Список порожній &nbsp;
              <NavLink to="/quiz-creator">Створити тест</NavLink>
            </div>
          ) : (
            <ol>{this.renderQuizes()}</ol>
          )}
        </div>
      </div>
    )
  }
}

export default QuizList
