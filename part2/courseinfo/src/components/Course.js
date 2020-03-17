import React from 'react'

const Course = ({course}) => (
  <div>
    <Header course={course}/>
    <Content course={course}/>
    <Total parts={course.parts}/>
  </div>
)

const Header = ({course}) => (
  <div>
    <h2>{course.name}</h2>
  </div>
)


const Content = ({course}) => {
  const rows = () => course.parts.map(part =>
    <Part key={part.id} part={part}/>
  )

  return (
    <div>
        {rows()}
    </div>
  )
}

const Part = ({part}) => (
  <p>{part.name} {part.exercises}</p>
)

const Total = ({parts}) => {

  const total = parts.reduce(
    (accumulator, currentPart) => accumulator + currentPart.exercises,
    0
  )

  return (
    <div>
      <b>total of {total} exercises</b>
    </div>
  )
}

export default Course