import { ADD_FAVORITE, REMOVE_FAVORITE } from './actions';

const initialState = {
  favorites: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_FAVORITE:
      if (state.favorites.find((repo) => repo.id === action.payload.id)) {
        return state;
      }
      return {
        ...state,
        favorites: [...state.favorites, action.payload],
      };
      
    case REMOVE_FAVORITE:
      return {
        ...state,
        favorites: state.favorites.filter((repo) => repo.id !== action.payload),
      };
      
    default:
      return state;
  }
};

export default rootReducer;
