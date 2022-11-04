import React, {useContext} from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import {
  Button,
  Divider,
  Layout,
  TopNavigation,
  Text,
} from '@ui-kitten/components';
import {userContext} from '../../contexts/userContext';
import {ThemeContext} from '../../contexts/theme';
import HealthBar from './HealthBar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Character from './character';
const Main = ({navigation}: any) => {
  const navigateToSetting = () => {
    navigation.navigate('Setting');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Layout style={styles.container}>
        <TopNavigation title="Feel Me" alignment="center" />
        <Divider />
        <HealthBar />
        <Character />
        {/* <View style={styles.bottomBanner}>
          <Layout style={styles.bottomBannerLayout} level="2">
            <Text category="h5">- STATUS -</Text>
          </Layout>
        </View> */}
        <Button onPress={navigateToSetting}>Setting</Button>
      </Layout>
    </SafeAreaView>
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
});
export default Main;
