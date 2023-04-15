import React from 'react';
import {Text} from '@ui-kitten/components';
import {StyleSheet, View} from 'react-native';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {useAppDispatch, useAppSelector} from '../../app/hook';
import {setAnswer} from '../../features/user/questionnaireSlice';
// import { View } from 'react-native';

const Questionnaire = () => {
  return (
    <View style={styles.container}>
      {/* <Text>Hello Questionnaire</Text> */}
      <Questions />
    </View>
  );
};

const Questions = () => {
  const questions = useAppSelector(state => state.questionnaire);
  return (
    <View style={styles.form}>
      {questions.map(question => {
        return (
          <Question
            key={question.id}
            id={question.id}
            question={question.question}
          />
        );
      })}
    </View>
  );
};

const Question = ({id, question}: any) => {
  return (
    <View style={styles.card}>
      <Text style={styles.question} key={id}>
        {question}
      </Text>
      <Rating questionID={id} />
    </View>
  );
};

const Rating = ({questionID}: any) => {
  //TODO DO Rating comp
  return (
    <View style={styles.ratingContainer}>
      <CircleButton questionID={questionID} buttonID={1} value={0} />
      <CircleButton questionID={questionID} buttonID={2} value={25} />
      <CircleButton questionID={questionID} buttonID={3} value={50} />
      <CircleButton questionID={questionID} buttonID={4} value={75} />
      <CircleButton questionID={questionID} buttonID={5} value={100} />
    </View>
  );
};

const CircleButton = ({questionID, buttonID, value}: any) => {
  const dispatch = useAppDispatch();
  const selectedAnswer = useAppSelector(state =>
    state.questionnaire.filter(question => question.id === questionID),
  );
  const selectedHandler = () => {
    dispatch(
      setAnswer({
        questionID: questionID,
        selectedID: buttonID,
        answerValue: value,
      }),
    );
  };

  return (
    <>
      <TouchableWithoutFeedback
        onPress={() => selectedHandler()}
        style={
          selectedAnswer[0]?.selectedID !== buttonID
            ? styles.button
            : [styles.button, {backgroundColor: 'black'}]
        }
      />
      {/* {selectedAnswer.map(ans => {
        return <Text>{ans.selectedID}</Text>;
      })} */}
    </>
  );
};

export default Questionnaire;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  form: {
    padding: 20,
    marginVertical: 20,
    borderRadius: 10,
    width: '90%',
  },
  question: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  card: {
    width: '100%',
    alignItems: 'center',
    marginVertical: 20,
  },
  ratingContainer: {
    // backgroundColor: 'gray',
    width: '100%',
    height: 45,
    marginTop: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    borderWidth: 4,
    width: 45,
    height: 45,
    borderRadius: 100,
  },
});
