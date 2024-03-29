import React, {useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {Layout, Spinner} from '@ui-kitten/components';
import HealthBar from '../InteractiveEmotionalPage/HealthBar';
import Character from '../InteractiveEmotionalPage/character';
import {useUserDetailQuery} from '../../features/api/apiSlice';
import {useAppDispatch, useAppSelector} from '../../app/hook';
import {setHp} from '../../features/user/userSlice';
// import Weapon from './weapon';
const InteractiveEmotionPage = () => {
  const dispatch = useAppDispatch();
  const {account_id} = useAppSelector(state => state.tokens);
  // const {hp} = useAppSelector(state => state.user);
  const {data, isSuccess, isLoading} = useUserDetailQuery({
    id: account_id,
  });
  useEffect(() => {
    if (isSuccess) {
      console.log('Dispatching hp');
      dispatch(setHp(data.hp));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess, data?.hp]);
  return (
    <Layout style={styles.container}>
      {isLoading ? (
        <Layout style={styles.spinner}>
          <Spinner />
        </Layout>
      ) : (
        <>
          <HealthBar />
          <Character />
          {/* <Weapon /> */}
        </>
      )}
    </Layout>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  spinner: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default InteractiveEmotionPage;
