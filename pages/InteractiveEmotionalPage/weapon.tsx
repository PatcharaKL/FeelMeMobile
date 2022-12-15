import {Layout, Text} from '@ui-kitten/components';
import React from 'react';
import {StyleSheet} from 'react-native';

const Weapon = () => {
  return (
    <>
      <Layout style={styles.container}>
        <Text>Hello</Text>
      </Layout>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default Weapon;
