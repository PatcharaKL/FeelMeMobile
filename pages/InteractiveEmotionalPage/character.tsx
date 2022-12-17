import React, {useEffect, useState} from 'react';
import Images from '../../assets/image';
import {StyleSheet, TouchableWithoutFeedback} from 'react-native';
import {Layout} from '@ui-kitten/components';
import {useDealDamageMutation} from './InteractivePageAPI';
import useDebounce from '../../hooks/useDebouce';
import {useAppDispatch, useAppSelector} from '../../app/hook';
import {decreaseHp} from '../../features/user/userSlice';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

const Character = () => {
  const [dealDamage, {isLoading}] = useDealDamageMutation();
  const {selectedTypeId} = useAppSelector(state => state.weapon);
  const {hp} = useAppSelector(state => state.user);
  const [damage, setDamage] = useState(0);
  const debounceDamage = useDebounce(damage, 500);
  const dispatch = useAppDispatch();
  const DMG = 3;

  const avatarWidth = useSharedValue(350);
  const avatarHeight = useSharedValue(350);
  const avatarRotate = useSharedValue(0);
  const avatarOpacity = useSharedValue(1);
  const avatarTakingDmg = useAnimatedStyle(() => {
    return {
      width: avatarWidth.value,
      height: avatarHeight.value,
      opacity: avatarOpacity.value,
      transform: [{rotate: `${avatarRotate.value}deg`}],
    };
  });

  const dmgHandler = () => {
    setDamage(() => damage + DMG);
    dispatch(decreaseHp(DMG));
    const randomRotateValue = (min: number, max: number) => {
      return Math.random() * (max - min) + min;
    };
    avatarWidth.value = withSequence(
      withTiming(250, {duration: 50}),
      withTiming(350, {duration: 50}),
    );
    avatarHeight.value = withSequence(
      withTiming(250, {duration: 50}),
      withTiming(350, {duration: 50}),
    );
    avatarRotate.value = withSequence(
      withTiming(randomRotateValue(-10, 10), {duration: 50}),
      withTiming(0, {duration: 50}),
    );
    if (hp <= 0) {
      avatarOpacity.value = withTiming(0.3, {duration: 200});
    }
  };

  useEffect(() => {
    avatarOpacity.value = hp === 0 ? 0.3 : 1;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hp]);

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
  return (
    <Layout style={styles.container}>
      <TouchableWithoutFeedback
        disabled={isLoading || hp === 0}
        onPress={dmgHandler}>
        <Animated.Image source={avatar()} style={[avatarTakingDmg, ,]} />
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
});
export default Character;
