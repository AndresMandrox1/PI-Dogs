import {
  GET_BREEDS,
  GET_BREED_DETAIL,
  SEARCH_BREED,
  TEMPERAMENT_FILTER,
  FILTER_BY_NAME,
  FILTER_BY_WEIGHT,
  FILTER_BY_ORIGIN,
} from "./Actions";

const initialState = {
  filteredBreeds: [],
  breeds: [],
  breedDetail: {},
};

const orderName = (bre) => {
  return bre.sort((b1, b2) => {
    if (b1.name?.toUpperCase() < b2.name?.toUpperCase()) {
      return -1;
    } else if (b1.name?.toUpperCase() > b2.name?.toUpperCase()) {
      return 1;
    }
    return 0;
  });
};

const orderWeight = (bre) => {
  return bre.sort((b1, b2) => {
    return parseInt(b1.weight?.slice(-2)) - parseInt(b2.weight?.slice(-2));
  });
};

const orderOrigin = (bre, from) => {
  if (from === "api") return bre.filter((e) => e.id < 300);
  if (from === "bd") return bre.filter((e) => e.id >= 300);
  else return bre;
};

function rootReducer(state = initialState, action) {
  if (action.type === GET_BREEDS) {
    if (!state.breeds.length) {
      if (!state.filteredBreeds.length) {
        return {
          ...state,
          breeds: action.payload,
          filteredBreeds: action.payload,
        };
      }
      return {
        ...state,
        breeds: action.payload,
      };
    }
  }
  if (action.type === GET_BREED_DETAIL) {
    return {
      ...state,
      breedDetail: action.payload,
    };
  }

  if (action.type === SEARCH_BREED) {
    let search = [];
    state.breeds.forEach((e) => {
      if (action.payload.includes(e.name)) {
        search.push(e);
      }
    });
    if (!search.length) search = state.breeds;
    return {
      ...state,
      filteredBreeds: search,
    };
  }

  if (action.type === TEMPERAMENT_FILTER) {
    let n = [];
    for (let i = 0; i < state.breeds?.length; i++) {
      let a = state.breeds[i].temperaments.filter(
        (e) => e.name === action.payload
      );
      if (a.length) {
        n.push(state.breeds[i]);
      }
    }
    return {
      ...state,
      filteredBreeds: n,
    };
  }

  if (action.type === FILTER_BY_NAME) {
    return {
      ...state,
      filteredBreeds: orderName(state.filteredBreeds).concat(""),
    };
  }

  if (action.type === FILTER_BY_WEIGHT) {
    return {
      ...state,
      filteredBreeds: orderWeight(state.filteredBreeds).concat(""),
    };
  }

  if (action.type === FILTER_BY_ORIGIN) {
    return {
      ...state,
      filteredBreeds: orderOrigin(state.breeds, action.payload).concat(""),
    };
  }

  return state;
}
export default rootReducer;
