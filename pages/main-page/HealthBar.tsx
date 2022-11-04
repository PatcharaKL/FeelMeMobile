import {Layout, Button, Text} from '@ui-kitten/components';
import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import theme from '../../assets/theme.json';

const HealthBar = ({_navigation}: any) => {
  const [hp, setHp] = useState(100);
  const dealDmg = () => {
    setHp(hp - 10);
  };
  const heal = () => {
    setHp(hp + 10);
  };

  return (
    <Layout>
      <View style={styles.nameBanner}>
        <Text category="h4">Patchara LV.2</Text>
        <Text category="s1">Fullstack Developer</Text>
      </View>
      <View style={styles.hpBar}>
        <View style={[styles.hp, {width: `${hp}%`}]} />
      </View>
      {/* <View style={styles.actionContainer}>
        <Button style={styles.button} onPress={dealDmg}>
          ATTACK!
        </Button>
        <Button style={styles.button} onPress={heal}>
          Heal!
        </Button>
      </View> */}
    </Layout>
  );
};

const styles = StyleSheet.create({
  hpBar: {
    paddingHorizontal: 5,
    backgroundColor: theme['color-basic-1100'],
    height: 30,
    justifyContent: 'center',
    marginHorizontal: 40,
    borderRadius: 20,
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
  hp: {
    backgroundColor: theme['color-danger-400'],
    height: 20,
    borderRadius: 10,
  },
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
export default HealthBar;
