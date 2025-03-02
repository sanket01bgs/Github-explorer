export const ADD_FAVORITE = 'ADD_FAVORITE';
export const REMOVE_FAVORITE = 'REMOVE_FAVORITE';

export const addFavorite = (repo) => ({
  type: ADD_FAVORITE,
  payload: repo,
});

export const removeFavorite = (repoId) => ({
  type: REMOVE_FAVORITE,
  payload: repoId,
});


