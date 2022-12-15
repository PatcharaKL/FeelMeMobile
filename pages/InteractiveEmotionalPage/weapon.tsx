import {Layout, Text, Avatar} from '@ui-kitten/components';
import React from 'react';
import {StyleSheet, ImageBackground} from 'react-native';
import {
  FlatList,
  ScrollView,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import {useWeaponListQuery} from './InteractivePageAPI';
const WeaponList = () => {
  const {data, isSuccess, isError, isLoading} = useWeaponListQuery({});
  return (
    <>
      <Layout level="2" style={styles.container}>
        {isSuccess && (
          <FlatList
            horizontal={true}
            data={data}
            renderItem={Weapon}
            contentContainerStyle={styles.flatList}
            showsHorizontalScrollIndicator={false}
          />
        )}
      </Layout>
    </>
  );
};
const Weapon = ({item}: any) => {
  return (
    <>
      <TouchableOpacity style={styles.touchable}>
        <Avatar
          source={{
            uri: item.urlWeapon,
          }}
          ImageComponent={ImageBackground}
        />
        <Text category="s1">{item.weaponName}</Text>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 30,
  },
  flatList: {
    alignItems: 'center',
  },
  touchable: {
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default WeaponList;
