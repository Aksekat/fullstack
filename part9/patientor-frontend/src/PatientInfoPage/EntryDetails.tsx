import React from 'react';
import { Entry, HealthCheckRating, HospitalEntry, OccupationalHealthcareEntry, HealthCheckEntry } from '../types';
import { Card, Icon } from 'semantic-ui-react';
import './EntryDetails.css';

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const HealthIcon = ({ health }: { health: HealthCheckRating }) => {
  switch (health) {
    case 0:
      return (<Icon name="heart" color="green" />);
    case 1:
      return (<Icon name="heart" color="yellow" />);
    case 2:
      return (<Icon name="heart" color="orange" />);
    case 3:
      return (<Icon name="heart" color="red" />);
    default:
     return null;
  }
};

const HospitalEntryCard = ({ entry }: { entry: HospitalEntry }) => {
  return (
    <Card fluid>
      <Card.Content>
        <Card.Header as="h3">{entry.date} <Icon name='hospital' size='large' />
        </Card.Header>
        <Card.Meta>
          <p><i>{entry.description}</i></p>
        </Card.Meta>
        <Card.Description>
          <p>Discharged on {entry.discharge.date}</p>
        </Card.Description>
      </Card.Content>
    </Card>
  );
};

const OccupationalHealthcareEntryCard = ({ entry }: { entry: OccupationalHealthcareEntry }) => {
  return (
    <Card fluid>
      <Card.Content>
        <Card.Header as="h3">{entry.date} <Icon name='stethoscope' size='large' />{entry.employerName}
        </Card.Header>
        <Card.Meta>
          <p><i>{entry.description}</i></p>
        </Card.Meta>
        <Card.Description>
          {entry.sickLeave ? <p>On sick leave until {entry.sickLeave.endDate}</p> : null}
        </Card.Description>
      </Card.Content>
    </Card>
  );
};

const HealthCheckEntryCard = ({ entry }: { entry: HealthCheckEntry }) => {
  return (
    <Card fluid>
      <Card.Content>
        <Card.Header as="h3">{entry.date} <Icon name='user md' size='large' />
        </Card.Header>
        <Card.Meta>
          <p><i>{entry.description}</i></p>
          <HealthIcon health={entry.healthCheckRating} />
        </Card.Meta>
      </Card.Content>
    </Card>
  );
};

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
  switch (entry.type) {
    case "Hospital":
      return <HospitalEntryCard entry={entry} />;
    case "OccupationalHealthcare":
      return <OccupationalHealthcareEntryCard entry={entry} />;
    case "HealthCheck":
      return <HealthCheckEntryCard entry={entry} />;
    default:
      return assertNever(entry);
  }
};

export default EntryDetails;