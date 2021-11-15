import React from 'react';

interface CourseProps {
  name: string;
  exerciseCount: number;
}

const Total = ({ courses }: { courses: CourseProps[] }) => (
  <p>
    Number of exercises{" "}
    {courses.reduce((carry, part) => carry + part.exerciseCount, 0)}
  </p>
);

export default Total;