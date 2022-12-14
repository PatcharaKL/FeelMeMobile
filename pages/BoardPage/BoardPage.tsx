import {Layout, Text} from '@ui-kitten/components';
import React from 'react';
import {StyleSheet} from 'react-native';
const BoardPage = () => {
  return (
    <Layout style={styles.container}>
      <Text style={styles.text} category="h1">
        Board Page
      </Text>
      <Text style={styles.text} category="s1">
        Comming soon..
      </Text>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    textAlign: 'center',
  },
});
export default BoardPage;
