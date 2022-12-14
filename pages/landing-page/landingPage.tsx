import {Layout, Text} from '@ui-kitten/components';
import React from 'react';
import {StyleSheet} from 'react-native';
import ResourceLoader from './ResourceLoader';
const LandingPage = ({navigation}: any) => {
  return (
    <Layout style={styles.container}>
      <Text style={styles.text} category="h1">
        FeelMe
      </Text>
      <Text style={styles.text} category="s1">
        WELCOME :D
      </Text>
      <ResourceLoader navigation={navigation} />
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
export default LandingPage;
