const Course = ({ course }) => {
    return (
        <>
            <h1>{course.name}</h1>
            {course.parts.map(part => <p key={part.id}>{part.name} {part.exercises}</p>)}
            <p>
                <b>A total of {course.parts.reduce(
                    (total, part) => total + part.exercises, 0)}
                    exercises</b>
            </p>
        </>
    )
}

export default Course