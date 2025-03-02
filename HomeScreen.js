import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Button,
} from 'react-native';
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import {addFavorite} from '../redux/actions';

const HomeScreen = ({navigation}) => {
  const [query, setQuery] = useState('');
  const [repositories, setRepositories] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const dispatch = useDispatch();
  const favorites = useSelector(state => state.favorites);

  useEffect(() => {
    if (query) {
      fetchRepositories(1, true);
    }
  }, [query]);

  const fetchRepositories = async (pageNumber, reset = false) => {
    if (loading || !hasMore) return;
    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.github.com/search/repositories?q=${query}&page=${pageNumber}&per_page=10`,
      );
      if (response.data.items.length > 0) {
        setRepositories(
          reset
            ? response.data.items
            : [...repositories, ...response.data.items],
        );
        setPage(pageNumber + 1);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error('Error fetching repositories:', error);
    }
    setLoading(false);
  };

  return (
    <View style={{padding: 16, flex: 1}}>
      <TextInput
        placeholder="Search GitHub Repositories"
        value={query}
        onChangeText={setQuery}
        style={{
          padding: 10,
          borderWidth: 1,
          borderRadius: 8,
          marginVertical: 10,
        }}
      />

      <Button
        title="Go to Favorites"
        onPress={() => navigation.navigate('Favorites')}
      />

      <FlatList
        data={repositories}
        keyExtractor={item => item.id.toString()}
        onEndReached={() => fetchRepositories(page)}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          loading && <ActivityIndicator size="large" color="blue" />
        }
        renderItem={({item}) => {
          const isFavorite = favorites.some(repo => repo.id === item.id);
          return (
            <TouchableOpacity
              onPress={() => navigation.navigate('Details', {repo: item})}>
              <View
                style={{
                  flexDirection: 'row',
                  padding: 10,
                  borderBottomWidth: 1,
                }}>
                <Image
                  source={{uri: item.owner.avatar_url}}
                  style={{width: 50, height: 50, marginRight: 10}}
                />
                <View>
                  <Text style={{fontWeight: 'bold'}}>{item.name}</Text>
                  <Text>{item.description}</Text>
                  <Text>
                    ⭐ {item.stargazers_count} | 🍴 {item.forks_count}
                  </Text>
                  <TouchableOpacity onPress={() => dispatch(addFavorite(item))}>
                    <Text style={{color: isFavorite ? 'green' : 'blue'}}>
                      {isFavorite ? 'Added to Favorites' : 'Add to Favorites'}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export {HomeScreen};
