import {
  Card,
  Divider,
  Icon,
  Input,
  Layout,
  Spinner,
  Text,
} from '@ui-kitten/components';
import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {useUserListDetailQuery} from '../../features/api/apiSlice';
const PeoplePage = () => {
  const {data, isLoading} = useUserListDetailQuery({});
  const [searchValue, setSearchValue] = useState('');
  const searchFunc = (userData: any) => {
    if (
      userData?.name.toLowerCase().includes(searchValue.toLowerCase()) ||
      userData?.surname.toLowerCase().includes(searchValue.toLowerCase())
    ) {
      return true;
    } else {
      return false;
    }
  };
  const searchByName = () => {
    const filteredUser = data?.filter(searchFunc);
    return filteredUser;
  };

  return (
    <Layout style={styles.container}>
      <Divider />
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <SearchBar value={searchValue} setValue={setSearchValue} />
          <FlatList
            contentContainerStyle={styles.contentContainer}
            data={searchByName()}
            renderItem={PeoplesCard}
          />
        </>
      )}
    </Layout>
  );
};
const PeoplesCard = ({item}: any) => {
  return (
    <Card status="basic" style={styles.card} header={Header({item})}>
      <Text>HP: {item.hp}</Text>
    </Card>
  );
};
const Header = ({item}: any) => {
  return (
    <Layout>
      <Text category="h5">{`${item.name} ${item.surname}`}</Text>
      <Text category="c2">{`${item.positionName} LVL.${item.level}`}</Text>
      <Text category="c2">{`${item.departmentName}`}</Text>
    </Layout>
  );
};
const SearchBar = ({value, setValue}: any) => {
  return (
    <Layout level="2" style={styles.searchContainer}>
      <Input
        value={value}
        onChangeText={setValue}
        accessoryRight={searchIcon}
        placeholder="Search"
      />
    </Layout>
  );
};
const searchIcon = (props: any) => {
  return <Icon {...props} name="search" />;
};
const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
  },
  contentContainer: {
    justifyContent: 'space-evenly',
  },
  searchContainer: {
    marginBottom: 10,
  },
  search: {
    margin: 0,
  },
  card: {
    borderRadius: 5,
    marginTop: 10,
  },
  flatListContainer: {
    backgroundColor: '#ff0000dd',
  },
});

interface UsersData {
  item: {
    id: string;
    name: string;
    surname: string;
    position: string;
    level: number;
    department: string;
    hp: number;
  };
}
export default PeoplePage;
