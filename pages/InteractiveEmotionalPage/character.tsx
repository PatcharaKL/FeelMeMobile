import React, {useEffect, useState} from 'react';
import Images from '../../assets/image';
import {Image, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import {Layout} from '@ui-kitten/components';
import {useDealDamageMutation} from './InteractivePageAPI';
import useDebounce from '../../hooks/useDebouce';
import {useAppDispatch, useAppSelector} from '../../app/hook';
import {decreaseHp} from '../../features/user/userSlice';

const Character = () => {
  const [dealDamage, {isLoading}] = useDealDamageMutation();
  const {selectedTypeId} = useAppSelector(state => state.weapon);
  const {hp} = useAppSelector(state => state.user);
  const [damage, setDamage] = useState(0);
  const debounceDamage = useDebounce(damage, 500);
  const dispatch = useAppDispatch();
  const DMG = 3;

  const dmgHandler = () => {
    console.log('Character', hp);
    setDamage(() => damage + DMG);
    dispatch(decreaseHp(DMG));
  };
  useEffect(() => {
    const dealDamageHandler = async () => {
      await dealDamage({type: selectedTypeId, amount: damage});
    };
    if (debounceDamage) {
      dealDamageHandler();
      setDamage(0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounceDamage]);
  const avatar = () => {
    if (hp <= 100 && hp > 75) {
      return Images.monkeys.monkey_100;
    } else if (hp <= 75 && hp > 50) {
      return Images.monkeys.monkey_75;
    } else if (hp <= 50 && hp > 25) {
      return Images.monkeys.monkey_50;
    } else if (hp <= 25 && hp > 0) {
      return Images.monkeys.monkey_25;
    } else {
      return Images.monkeys.monkey_0;
    }
  };
  const opacity = hp === 0 ? 0.3 : 1;

  return (
    <Layout style={styles.container}>
      <TouchableWithoutFeedback
        disabled={isLoading || hp === 0}
        onPress={dmgHandler}>
        <Image source={avatar()} style={[styles.image, {opacity}]} />
      </TouchableWithoutFeedback>
    </Layout>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 300,
    height: 300,
  },
});
export default Character;
