import {Layout, Text, Spinner} from '@ui-kitten/components';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useAppSelector} from '../../app/hook';
import theme from '../../assets/theme.json';
import {useUserDetailQuery} from '../../features/api/apiSlice';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  useDerivedValue,
} from 'react-native-reanimated';

const HealthBar = () => {
  const {accessToken} = useAppSelector(state => state.tokens);
  const {hp} = useAppSelector(state => state.user);
  const {data, isLoading} = useUserDetailQuery({
    accessToken: accessToken,
  });
  // Client-Side HP animation
  const hpBar = useSharedValue(hp);
  const derivedHp = useDerivedValue(() => {
    hpBar.value = hp;
    return hpBar.value;
  }, [hp]);
  const hpDecreaseAnim = useAnimatedStyle(() => {
    return {
      width: withTiming(`${derivedHp.value}%`, {duration: 500}),
    };
  });
  // Sever-Side HP animation
  const serverHpBar = useSharedValue(data.hp);
  const serverDeriveHpBar = useDerivedValue(() => {
    serverHpBar.value = data.hp;
    return serverHpBar.value;
  }, [data.hp]);
  const serverHpDecreaseAnim = useAnimatedStyle(() => {
    return {
      width: withTiming(`${serverDeriveHpBar.value}%`, {duration: 500}),
    };
  });
  // User Details Top Component
  return (
    <Layout level="2" style={styles.container}>
      {isLoading ? (
        <Layout style={styles.spinner}>
          <Spinner size="large" />
        </Layout>
      ) : (
        <>
          <View style={styles.nameBanner}>
            <Text category="h2">
              {data?.name} {data?.surname}
            </Text>
            <Text category="s1">
              {data?.positionName} {`LVL.${data?.level}`}
            </Text>
            <Text category="s1">
              {data?.companyName} {data?.departmentName}
            </Text>
          </View>
          <Animated.View style={styles.hpBar}>
            <Animated.View
              style={[
                styles.hp,
                serverHpDecreaseAnim,
                {
                  backgroundColor: theme['color-danger-100'],
                },
              ]}
            />
            <Animated.View style={[styles.hp, hpDecreaseAnim]} />
          </Animated.View>
        </>
      )}
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 2,
    justifyContent: 'center',
    borderRadius: 20,
  },
  nameBanner: {
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  hpBar: {
    paddingHorizontal: 5,
    backgroundColor: theme['color-basic-1100'],
    height: 30,
    justifyContent: 'center',
    marginHorizontal: 40,
    borderRadius: 20,
    overflow: 'hidden',
  },
  hp: {
    position: 'absolute',
    left: 5,
    backgroundColor: theme['color-danger-400'],
    height: 20,
    borderRadius: 10,
  },
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  spinner: {
    marginTop: 50,
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
export default HealthBar;
