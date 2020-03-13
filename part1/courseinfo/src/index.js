import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
  return (
    <div>
      <h1>{props.course.name}</h1>
    </div>
  )
}

const Content = (props) => {
  return (
    <div>
      <Part name={props.course.parts[0].name} 
        exercises={props.course.parts[0].exercises}/>
      <Part name={props.course.parts[1].name} 
        exercises={props.course.parts[1].exercises}/>
      <Part name={props.course.parts[2].name} 
        exercises={props.course.parts[2].exercises}/>
    </div>
  )
}

const Part = (props) => {
  return (
    <>
      <p>{props.name} {props.exercises}</p>
    </>
  )
}

const Total = (props) => {

  const total = props.course.parts.reduce(
    (accumulator, currentPart) => accumulator + currentPart.exercises,
    0
  )

  return (
    <div>
      <p>Total amount of exercises {total}</p>
    </div>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course}/>
      <Content course={course}/>
      <Total course={course}/>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))