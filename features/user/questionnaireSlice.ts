import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface question {
  id: number;
  question: string;
  selectedID: number;
  answerValue: number;
}
interface answer {
  questionID: number;
  selectedID: number;
  answerValue: number;
}
const initialState: question[] = [
  {
    id: 1,
    question: 'How was your day?',
    selectedID: 0,
    answerValue: 0,
  },
  {
    id: 2,
    question: 'How would you rate yourself today?',
    selectedID: 0,
    answerValue: 0,
  },
  {
    id: 3,
    question: 'How was your team today?',
    selectedID: 0,
    answerValue: 0,
  },
  {
    id: 4,
    question: 'How about your workplace?',
    selectedID: 0,
    answerValue: 0,
  },
];
const questionnaireSlice = createSlice({
  name: 'questionnaire',
  initialState,
  reducers: {
    setAnswer: (state, action: PayloadAction<answer>) => {
      state.forEach((element, index) => {
        if (element.id === action.payload.questionID) {
          state[index].selectedID = action.payload.selectedID;
        }
      });
    },
  },
});

export const {setAnswer} = questionnaireSlice.actions;
export default questionnaireSlice.reducer;
