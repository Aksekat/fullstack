import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Container, Header, Card, Icon, Button } from "semantic-ui-react";

import { Patient, Diagnosis, Entry } from "../types";
import { useStateValue, addPatientInfo, setDiagnoses, addEntry } from "../state";
import { apiBaseUrl } from "../constants";
import EntryDetails from "./EntryDetails";
import AddEntryModal from "../AddEntryModal";
import { EntryFormValues } from "../AddEntryModal/AddEntryForm";

const PatientInfoPage = () => {
  const { id } = useParams<{ id: string }>();
  const [{ patientInfo, diagnoses }, dispatch] = useStateValue();
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewEntry = async (values: EntryFormValues) => {
    try {
      console.log("Reached submitNewEntry");
      const { data: newEntry } = await axios.post<Entry>(
        `${apiBaseUrl}/patients/${id}/entries`,
        values
      );
      dispatch(addEntry(newEntry, id));
      closeModal();
    } catch (e) {
      console.error(e.response?.data || 'Unknown Error');
      setError(e.response?.data?.error || 'Unknown error');
    }
  };

  let patient: Patient = patientInfo[id];

  React.useEffect(() => {
    const fetchPatientInfo = async (id: string) => {
      try {
        const { data: patientInfoFromApi } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        );
        dispatch(addPatientInfo(patientInfoFromApi));
        patient = patientInfoFromApi;
      } catch (e) {
        console.error(e);
      }
    };

    const fetchDiagnoses = async () => {
      try {
        const { data: diagnoses } = await axios.get<Diagnosis[]>(
          `${apiBaseUrl}/diagnosis`
        );
        dispatch(setDiagnoses(diagnoses));
      } catch (e) {
        console.error(e);
      }
    };
    if (!patient) void fetchPatientInfo(id);
    if (Object.keys(diagnoses).length === 0) void fetchDiagnoses();
  }, [dispatch]);

  if (!patient || Object.keys(diagnoses).length === 0) {
    return (
      <div>
        <p>Loading</p>
      </div>
    );
  }

  let genderIcon: JSX.Element | undefined;

  if (patient.gender === 'male') {
    genderIcon = <Icon name='mars' size='large' />;
  } else if (patient.gender === 'female') {
    genderIcon = <Icon name='venus' size='large' />;
  }

  return (
    <div>
    <Container>
      <Header as='h2'>{patient.name} {genderIcon ? genderIcon : null}</Header>
      <p>ssn: {patient.ssn}
        <br />
      occupation: {patient.occupation}
      </p>
      <Button onClick={() => openModal()}>Add New Entry</Button>
      <Header as='h3'>entries</Header>
      <Card.Group>
        {patient.entries.map(e => <EntryDetails key={e.id} entry={e} />)}
      </Card.Group>
    </Container>
    <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
      />
    </div>
  );
};

export default PatientInfoPage;