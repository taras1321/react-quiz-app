import React, { Component } from 'react'
import classes from './Drower.module.css'
import { NavLink } from 'react-router-dom'
import Backdrop from '../../UI/Backdrop/Backdrop'

const links = [
  { to: '/', label: 'Список', exact: true },
  { to: '/quiz-creator', label: 'Створити тест', exact: false },
]

class Drower extends Component {
  clickHandler = () => {
    this.props.onClose()
  }

  renderLinks() {
    return links.map((link, index) => {
      return (
        <li key={index}>
          <NavLink
            to={link.to}
            exact={link.exact}
            activeClassName={classes.active}
            onClick={this.clickHandler}
          >
            {link.label}
          </NavLink>
        </li>
      )
    })
  }

  render() {
    const cls = [classes.Drower]

    if (!this.props.isOpen) {
      cls.push(classes.close)
    }

    return (
      <>
        <nav className={cls.join(' ')}>
          <ul>{this.renderLinks()}</ul>
        </nav>

        {this.props.isOpen ? (
          <Backdrop onClick={this.props.onClose} />
        ) : null}
      </>
    )
  }
}

export default Drower
