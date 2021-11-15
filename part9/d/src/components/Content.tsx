import React from 'react';
import Part from './Part';
import { CoursePart } from '../App';

const Content = ({ courses }: { courses: CoursePart[] }) => {
  return (
    <div>
      {courses.map(c =>
        <Part key={c.name} part={c} />
      )}
    </div>
  );
};

export default Content;