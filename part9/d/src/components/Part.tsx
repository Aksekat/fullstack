import React from 'react';
import { CoursePart } from '../App';

/**
 * Helper function for exhaustive type checking
 */
const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Part = ({ part }: { part: CoursePart }) => {
  switch (part.type) {
    case 'normal':
      return (
        <>
          <p>
            <b>{part.name} {part.exerciseCount}</b>
            <br />
            <i>{part.description}</i>
          </p>
        </>);
      break;
    case 'groupProject':
      return (
        <>
          <p>
            <b>{part.name} {part.exerciseCount}</b>
            <br />
            <span>project exercises {part.exerciseCount}</span>
          </p>
        </>);
      break;
    case 'submission':
      return (
        <>
          <p>
            <b>{part.name} {part.exerciseCount}</b>
            <br />
            <i>{part.description}</i>
            <br />
            <span>submit to {part.exerciseSubmissionLink}</span>
          </p>
        </>);
      break;
    case 'special':
      return (
        <>
          <p>
            <b>{part.name} {part.exerciseCount}</b>
            <br />
            <i>{part.description}</i>
            <br />
            <span>required skills: {part.requirements.join(', ')}</span>
          </p>
        </>);
      break;
    default:
      return assertNever(part);
  }
};

export default Part;