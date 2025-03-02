import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';

const DetailsScreen = ({route}) => {
  const {repo} = route.params;

  return (
    <View style={styles.container}>
      <Image source={{uri: repo.owner.avatar_url}} style={styles.avatar} />
      <Text style={styles.name}>{repo.name}</Text>
      <Text>{repo.description}</Text>
      <Text>⭐ Stars: {repo.stargazers_count}</Text>
      <Text>🍴 Forks: {repo.forks_count}</Text>
      <Text>🛠 Language: {repo.language || 'Unknown'}</Text>
      <Text>👤 Owner: {repo.owner.login}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {padding: 16},
  avatar: {width: 100, height: 100, borderRadius: 50, marginBottom: 10},
  name: {fontSize: 20, fontWeight: 'bold'},
});

export {DetailsScreen};
