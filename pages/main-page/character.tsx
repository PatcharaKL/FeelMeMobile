import React, {useState} from 'react';
import Images from '../../assets/image';
import {Image, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import {Layout} from '@ui-kitten/components';

const Character = ({_navigation}: any) => {
  const [_frame, _setFrame] = useState(null);
  return (
    <Layout style={styles.container}>
      <TouchableWithoutFeedback>
        <Image source={Images.pumpkin_happy} style={styles.image} />
      </TouchableWithoutFeedback>
    </Layout>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 250,
    height: 250,
  },
});
export default Character;
