import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const RepositoryItem = ({ repo, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Image source={{ uri: repo.owner.avatar_url }} style={styles.avatar} />
      <View>
        <Text style={styles.name}>{repo.name}</Text>
        <Text>{repo.description}</Text>
        <Text>⭐ {repo.stargazers_count} | 🍴 {repo.forks_count}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: { flexDirection: 'row', padding: 10, borderBottomWidth: 1 },
  avatar: { width: 50, height: 50, marginRight: 10 },
  name: { fontWeight: 'bold' },
});

export default RepositoryItem;
