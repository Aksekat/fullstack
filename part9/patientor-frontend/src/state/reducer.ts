import { State } from "./state";
import { Patient, Diagnosis, Entry, EntryPayload } from "../types";

export type Action =
  | {
    type: "SET_PATIENT_LIST";
    payload: Patient[];
  }
  | {
    type: "ADD_PATIENT_INFO";
    payload: Patient;
  }
  | {
    type: "ADD_PATIENT";
    payload: Patient;
  }
  | {
    type: "ADD_ENTRY";
    payload: EntryPayload;
  }
  | {
    type: "SET_DIAGNOSES";
    payload: Diagnosis[]
  };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "ADD_PATIENT_INFO":
      return {
        ...state,
        patientInfo: {
          ...state.patientInfo,
          [action.payload.id]: action.payload
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case "ADD_ENTRY": {
      const patient = state.patients[action.payload.patientId];
      const patientInfo = state.patientInfo[action.payload.patientId];
      patient.entries = patient.entries.concat(action.payload.entry);
      patientInfo.entries = patientInfo.entries.concat(action.payload.entry);

      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.patientId]: patient
        },
        patientInfo: {
          ...state.patientInfo,
          [action.payload.patientId]: patientInfo
        }
      };
    }
    case "SET_DIAGNOSES":
      return {
        ...state,
        diagnoses: {
          ...action.payload.reduce(
            (memo, diagnosis) => ({ ...memo, [diagnosis.code]: diagnosis }),
            {}
          ),
          ...state.diagnoses
        }
      };
    default:
      return state;
  }
};

export const setPatientList = (patients: Patient[]): Action => {
  return {
    type: "SET_PATIENT_LIST",
    payload: patients
  };
};

export const addPatientInfo = (patient: Patient): Action => {
  return {
    type: "ADD_PATIENT_INFO",
    payload: patient
  };
};

export const addPatient = (patient: Patient): Action => {
  return {
    type: "ADD_PATIENT",
    payload: patient
  };
};

export const addEntry = (entry: Entry, patientId: string): Action => {
  return {
    type: "ADD_ENTRY",
    payload: { entry, patientId }
  };
};

export const setDiagnoses = (diagnoses: Diagnosis[]): Action => {
  return {
    type: "SET_DIAGNOSES",
    payload: diagnoses
  };
};