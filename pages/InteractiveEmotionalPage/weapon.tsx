import React from 'react';
import {Layout, Text, Avatar, Divider} from '@ui-kitten/components';
import {StyleSheet, ImageBackground, View} from 'react-native';
import {FlatList, TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {useWeaponListQuery} from './InteractivePageAPI';
import {setSelectedWeapon} from '../../features/user/weaponSlice';
import {useAppDispatch, useAppSelector} from '../../app/hook';
const WeaponList = () => {
  const {data, isSuccess} = useWeaponListQuery({});
  const {selectedTypeId} = useAppSelector(state => state.weapon);
  const dispatch = useAppDispatch();
  const selectWeaponHandler = (weaponType: number) => {
    dispatch(setSelectedWeapon(weaponType));
  };
  const Weapon = ({item}: any) => {
    const backgroundColor = item.weaponsId === selectedTypeId ? '4' : '1';
    const opacity = item.weaponsId === selectedTypeId ? 1 : 0.3;
    return (
      <>
        <Layout level={backgroundColor} style={styles.selectedLayout}>
          <TouchableWithoutFeedback
            onPress={() => selectWeaponHandler(item.weaponsId)}
            style={[styles.touchable, {opacity}]}>
            <Avatar
              size="medium"
              source={{
                uri: item.urlWeapon,
              }}
              ImageComponent={ImageBackground}
            />
            <Text category="label">{item.weaponName}</Text>
          </TouchableWithoutFeedback>
        </Layout>
      </>
    );
  };

  return (
    <>
      <Layout style={styles.container}>
        <Text style={styles.headerText} category="h6">What hits you?</Text>
        {isSuccess && (
          <FlatList
            horizontal={true}
            data={data}
            renderItem={Weapon}
            contentContainerStyle={styles.flatList}
            showsHorizontalScrollIndicator={false}
            keyExtractor={item => item.weaponsId}
          />
        )}
      </Layout>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flatList: {
    alignItems: 'center',
  },
  touchable: {
    height: '100%',
    width: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedLayout: {
    borderRadius: 10,
  },
  headerText: {
    marginBottom: 10,
  },
});
export default WeaponList;
