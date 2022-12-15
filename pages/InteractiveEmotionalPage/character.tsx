import React, {useEffect, useState} from 'react';
import Images from '../../assets/image';
import {Image, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import {Layout, Spinner} from '@ui-kitten/components';
import {useDealDamageMutation} from '../../features/api/apiSlice';
import useDebounce from '../../hooks/useDebouce';
import {useAppDispatch} from '../../app/hook';
import {decreaseHp} from '../../features/user/userSlice';

const Character = () => {
  const [dealDamage, {isLoading}] = useDealDamageMutation();
  const [damage, setDamage] = useState(0);
  const debounceDamage = useDebounce(damage, 500);
  const dispatch = useAppDispatch();
  const DMG = 15;
  const dmgHandler = () => {
    setDamage(() => damage + DMG);
    dispatch(decreaseHp(DMG));
  };
  useEffect(() => {
    const dealDamageHandler = async () => {
      await dealDamage({type: 1, amount: damage});
    };
    if (debounceDamage) {
      dealDamageHandler();
      setDamage(0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounceDamage]);

  return (
    <Layout style={styles.container}>
      {isLoading ? (
        <Spinner />
      ) : (
        <TouchableWithoutFeedback onPress={dmgHandler}>
          <Image source={Images.pumpkin_happy} style={styles.image} />
        </TouchableWithoutFeedback>
      )}
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
