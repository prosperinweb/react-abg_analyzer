import React, { createContext, useContext, useReducer, ReactNode } from "react";
import { InputValues, ABGResults } from "../types";
import {
  ACID_BASE,
  ELECTROLYTES,
  CO_OXIMETRY,
  METABOLITES,
} from "../utils/constants";

interface ABGState {
  inputs: InputValues;
  results: ABGResults | null;
  history: (ABGResults & { timestamp: Date })[];
  loading: boolean;
  errors: Record<string, string>;
  showEducationalMode: boolean;
  darkMode: boolean;
}

type ABGAction =
  | { type: "SET_INPUT"; payload: { name: string; value: string } }
  | { type: "SET_RESULTS"; payload: ABGResults }
  | { type: "ADD_TO_HISTORY"; payload: ABGResults & { timestamp: Date } }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_ERRORS"; payload: Record<string, string> }
  | { type: "RESET" }
  | { type: "TOGGLE_EDUCATIONAL_MODE" }
  | { type: "TOGGLE_DARK_MODE" };

const initialState: ABGState = {
  inputs: {
    ...Object.keys(ACID_BASE).reduce((acc, key) => ({ ...acc, [key]: "" }), {}),
    ...Object.keys(ELECTROLYTES).reduce(
      (acc, key) => ({ ...acc, [key]: "" }),
      {}
    ),
    ...Object.keys(CO_OXIMETRY).reduce(
      (acc, key) => ({ ...acc, [key]: "" }),
      {}
    ),
    ...Object.keys(METABOLITES).reduce(
      (acc, key) => ({ ...acc, [key]: "" }),
      {}
    ),
  } as InputValues,
  results: null,
  history: [],
  loading: false,
  errors: {},
  showEducationalMode: false,
  darkMode: false,
};

const abgReducer = (state: ABGState, action: ABGAction): ABGState => {
  switch (action.type) {
    case "SET_INPUT":
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.payload.name]: action.payload.value,
        },
      };
    case "SET_RESULTS":
      return { ...state, results: action.payload };
    case "ADD_TO_HISTORY":
      return { ...state, history: [...state.history, action.payload] };
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    case "SET_ERRORS":
      return { ...state, errors: action.payload };
    case "RESET":
      return {
        ...initialState,
        showEducationalMode: state.showEducationalMode,
      };
    case "TOGGLE_EDUCATIONAL_MODE":
      return { ...state, showEducationalMode: !state.showEducationalMode };
    case "TOGGLE_DARK_MODE":
        return { ...state, darkMode: !state.darkMode };
    default:
      return state;
  }
};

const ABGContext = createContext<
  | {
      state: ABGState;
      dispatch: React.Dispatch<ABGAction>;
    }
  | undefined
>(undefined);

export const ABGProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(abgReducer, initialState);

  return (
    <ABGContext.Provider value={{ state, dispatch }}>
      {children}
    </ABGContext.Provider>
  );
};

export const useABG = () => {
  const context = useContext(ABGContext);
  if (context === undefined) {
    throw new Error("useABG must be used within an ABGProvider");
  }
  return context;
};
