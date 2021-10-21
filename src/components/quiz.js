import React from 'react'

import styles from './quiz.module.css'


class Quiz extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      answer: undefined,
    }
  }

  onClick = (index) => {
    if (this.state.answer === undefined) {
      this.setState({ answer: index })
    }
  }

  render() {
    const alpha = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    return (
      <div className={styles.root}>
        <p>
          <strong>Quick Review</strong>
          <br/>
          { this.props.description }
        </p>
        { this.props.options.map((opt, idx) => {
          const correct = this.state.answer !== undefined && idx === this.props.answer
          const wrong = idx === this.state.answer && this.state.answer !== this.props.answer
          const className = `${styles.button} ${correct ? styles.correct: ''} ${wrong ? styles.wrong: ''}`
          return <button className={className} onClick={() => this.onClick(idx)}>{alpha[idx]}. { opt }</button>
        }) }
        { this.state.answer !== undefined && (
        <div>{ this.state.answer === this.props.answer ? '你答對了！' : '你答錯了！' }</div>
        ) }
      </div>
    )
  }
}

export default Quiz