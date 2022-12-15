import React, {useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {Layout, Spinner} from '@ui-kitten/components';
import HealthBar from '../InteractiveEmotionalPage/HealthBar';
import Character from '../InteractiveEmotionalPage/character';
import {useUserDetailQuery} from '../../features/api/apiSlice';
import {useAppDispatch, useAppSelector} from '../../app/hook';
import {setHp} from '../../features/user/userSlice';
const InteractiveEmotionPage = () => {
  const dispatch = useAppDispatch();
  const {accessToken} = useAppSelector(state => state.tokens);
  const {data, isSuccess, isLoading} = useUserDetailQuery({
    accessToken: accessToken,
  });
  useEffect(() => {
    if (isSuccess) {
      dispatch(setHp(data.hp));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);
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
        </>
      )}
    </Layout>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  nameBanner: {
    marginTop: 50,
    marginBottom: 10,
    alignItems: 'center',
  },
  button: {
    marginVertical: 10,
    marginHorizontal: 10,
  },
  bottomBanner: {
    flex: 1,
    marginHorizontal: 40,
    borderRadius: 15,
    backgroundColor: '#20243c',
    overflow: 'hidden',
  },
  bottomBannerLayout: {
    flex: 1,
    alignItems: 'center',
  },
  spinner: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default InteractiveEmotionPage;
