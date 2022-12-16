import React from 'react';
import {Layout, Text, Avatar} from '@ui-kitten/components';
import {StyleSheet, ImageBackground} from 'react-native';
import {FlatList, TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {useWeaponListQuery} from './InteractivePageAPI';
import {setSelectedWeapon} from '../../features/user/weaponSlice';
import {useAppDispatch, useAppSelector} from '../../app/hook';
const WeaponList = () => {
  const {data, isSuccess} = useWeaponListQuery(
    {},
    {refetchOnMountOrArgChange: true},
  );
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
              size="small"
              source={{
                uri: item.urlWeapon,
              }}
              ImageComponent={ImageBackground}
            />
            <Text category="c1">{item.weaponName}</Text>
          </TouchableWithoutFeedback>
        </Layout>
      </>
    );
  };

  return (
    <>
      <Layout style={styles.container}>
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
    borderRadius: 20,
  },
  flatList: {
    alignItems: 'center',
  },
  touchable: {
    height: '100%',
    width: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedLayout: {
    borderRadius: 30,
  },
});
export default WeaponList;
