import React from 'react';
import {Button, Text} from '@ui-kitten/components';
import {StyleSheet, View} from 'react-native';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {useAppDispatch, useAppSelector} from '../../app/hook';
import {setAnswer} from '../../features/user/questionnaireSlice';
// import { View } from 'react-native';

const Questionnaire = () => {
  const submitHandler = () => {
    // TODO send result to backend
  };

  return (
    <View style={styles.container}>
      {/* <Text>Hello Questionnaire</Text> */}
      <Text category="h3">How was your feel?</Text>
      <Text category="p1">We wonder how was your day!</Text>
      <Questions />
      <Button onPress={submitHandler} status="primary" size="large">
        Confirm
      </Button>
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
      <Text style={styles.question} category="s1" key={id}>
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
  const circleSize = () => {
    if (buttonID === 1) {
      return {
        width: 30,
        height: 30,
      };
    } else if (buttonID === 2) {
      return {
        width: 35,
        height: 35,
      };
    } else if (buttonID === 3) {
      return {
        width: 40,
        height: 40,
      };
    } else if (buttonID === 4) {
      return {
        width: 45,
        height: 45,
      };
    } else if (buttonID === 5) {
      return {
        width: 50,
        height: 50,
      };
    }
  };
  const selectedColor = () => {
    if (buttonID === 1) {
      return {
        backgroundColor: '#ee6055',
      };
    } else if (buttonID === 2) {
      return {
        backgroundColor: '#ff9b85',
      };
    } else if (buttonID === 3) {
      return {
        backgroundColor: '#ffd97d',
      };
    } else if (buttonID === 4) {
      return {
        backgroundColor: '#aaf683',
      };
    } else if (buttonID === 5) {
      return {
        backgroundColor: '#60d394',
      };
    }
  };
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
            ? [styles.button, circleSize()]
            : [styles.button, selectedColor(), circleSize()]
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
    alignItems: 'center',
  },
  button: {
    borderWidth: 3,
    borderRadius: 100,
  },
});
