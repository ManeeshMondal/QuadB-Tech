import {
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LIST_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_FAIL,
  USER_DETAILS_SUCCESS
} from "../userConstants";
import Axios from "axios";

export const listUsers = () => async (dispatch) => {
  dispatch({
    type: USER_LIST_REQUEST,
  });
  try {
    const {
      data:  data ,
    } = await Axios.get(`https://api.tvmaze.com/search/shows?q=all`);
    console.log("data", data);
    dispatch({ type: USER_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: USER_LIST_FAIL, payload: error.message });
  }
};

export const userDetails = (id) => async (dispatch) => {
  dispatch({
    type: USER_DETAILS_REQUEST,
  });
  try {
    const {
      data:  data ,
    } = await Axios.get(`https://api.tvmaze.com/search/shows?q=all`);
    console.log("data", data);
      const temp = data?.filter((i) => i.show.id == id);
       console.log({ temp });
    
    dispatch({ type: USER_DETAILS_SUCCESS, payload: temp[0] });
  } catch (error) {
    dispatch({ type: USER_DETAILS_FAIL, payload: error.message });
  }
};



