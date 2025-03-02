import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { removeFavorite } from '../redux/actions';

const FavoritesScreen = ({ navigation }) => {
  const favorites = useSelector((state) => state.favorites); // Get favorites from Redux
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      {favorites.length === 0 ? (
        <Text style={styles.noFavorites}>No favorite repositories yet!</Text>
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => navigation.navigate('Details', { repo: item })}>
              <View style={styles.repoContainer}>
                <Image source={{ uri: item.owner.avatar_url }} style={styles.avatar} />
                <View style={styles.textContainer}>
                  <Text style={styles.name}>{item.name}</Text>
                  <Text>{item.description}</Text>
                  <Text>⭐ {item.stargazers_count} | 🍴 {item.forks_count}</Text>
                  <TouchableOpacity onPress={() => dispatch(removeFavorite(item.id))}>
                    <Text style={styles.removeButton}>Remove from Favorites</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16, flex: 1 },
  repoContainer: { flexDirection: 'row', padding: 10, borderBottomWidth: 1 },
  avatar: { width: 50, height: 50, marginRight: 10 },
  textContainer: { flex: 1 },
  name: { fontWeight: 'bold' },
  removeButton: { color: 'red', marginTop: 5 },
  noFavorites: { textAlign: 'center', fontSize: 16, marginTop: 20 },
});

export { FavoritesScreen };
