import axios from "axios";
export const GET_BREEDS = "GET_BREEDS";
export const GET_BREED_DETAIL = "GET_BREED_DETAIL";
export const CREATE_BREED = "CREATE_BREED";
export const SEARCH_BREED = "SEARCH_BREED";
export const TEMPERAMENT_FILTER = "TEMPERAMENT_FILTER";
export const FILTER_BY_NAME = "FILTER_BY";
export const FILTER_BY_WEIGHT = "FILTER_BY_WEIGHT";
export const FILTER_BY_ORIGIN = "FILTER_BY_ORIGIN";

export function getBreeds() {
  return function (dispatch) {
    return axios
      .get("/dogs")
      .then((response) => response.data)
      .then((json) => {
        dispatch({ type: GET_BREEDS, payload: json });
      });
  };
}

export function getBreedDetail(id) {
  return function (dispatch) {
    return axios
      .get("/dogs/" + id)
      .then((response) => response.data)
      .then((json) => {
        dispatch({ type: GET_BREED_DETAIL, payload: json[0] });
      });
  };
}

export function searchBreed(name) {
  return function (dispatch) {
    return axios
      .get(`/dogs/?name=${name}`)
      .then((res) => res.data)
      .then((json) => {
        dispatch({ type: SEARCH_BREED, payload: json });
      });
  };
}

export function temperamentFilter(temperament) {
  return { type: TEMPERAMENT_FILTER, payload: temperament };
}

export function filterByName() {
  return { type: FILTER_BY_NAME };
}

export function filterByWeight() {
  return { type: FILTER_BY_WEIGHT };
}

export function filterByOrigin(from) {
  return { type: FILTER_BY_ORIGIN , payload : from};
}
