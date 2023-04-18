import {
  Card,
  Divider,
  Icon,
  Input,
  Layout,
  Spinner,
  Text,
} from '@ui-kitten/components';
import Images from '../../assets/image';
import React, {useState} from 'react';
import {StyleSheet, Image} from 'react-native';
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
      <SearchBar value={searchValue} setValue={setSearchValue} />
      {isLoading ? (
        <Spinner />
      ) : (
        <FlatList
          contentContainerStyle={styles.contentContainer}
          data={searchByName()}
          renderItem={PeoplesCard}
          showsVerticalScrollIndicator={false}
        />
      )}
    </Layout>
  );
};
const PeoplesCard = ({item}: any) => {
  const avatar = () => {
    if (item.hp <= 100 && item.hp > 75) {
      return Images.monkeys.monkey_100;
    } else if (item.hp <= 75 && item.hp > 50) {
      return Images.monkeys.monkey_75;
    } else if (item.hp <= 50 && item.hp > 25) {
      return Images.monkeys.monkey_50;
    } else if (item.hp <= 25 && item.hp > 0) {
      return Images.monkeys.monkey_25;
    } else {
      return Images.monkeys.monkey_0;
    }
  };
  const cardStatus = () => {
    if (item.hp <= 100 && item.hp > 50) {
      return 'success';
    } else if (item.hp <= 50 && item.hp > 0) {
      return 'warning';
    } else if (item.hp <= 0) {
      return 'danger';
    }
  };
  return (
    <Card status={cardStatus()} style={styles.card} header={Header({item})}>
      <Image source={avatar()} style={[styles.image]} />
    </Card>
  );
};
const Header = ({item}: any) => {
  return (
    <Layout>
      <Text category="h5">{`${item.name} ${item.surname}`}</Text>
      <Text category="c2">{`${item.position_name} LVL.${item.level}`}</Text>
      <Text category="c2">{`${item.department_name}`}</Text>
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
    marginBottom: 30,
  },
  flatListContainer: {
    backgroundColor: '#ff0000dd',
  },
  image: {
    width: 200,
    height: 200,
    alignSelf: 'center',
  },
});
export default PeoplePage;
