import { createContext, useReducer } from "react";
import axios from "axios";
import {
  FETCH_PROFILE_FAIL,
  FETCH_PROFILE_SUCCESS,
  LOGIN_FAILED,
  LOGIN_SUCCESS,
  LOGOUT,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
} from "./AuthActionTypes";
import { API_URL_USER } from "../../../utils/apiURL";

export const authContext = createContext();

const INITIAL_STATE = {
  userAuth: JSON.parse(localStorage.getItem("userAuth")),
  loading: false,
  profile: null,
  error: null,
};

//Auth Reducer
const reducer = (state, action) => {
  console.log("ACTION ---> ",action);
  const { type, payload } = action;
  switch (type) {
    //Register
    case REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        userAuth: payload,
      };
    case REGISTER_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
        userAuth: null,
      };

    //Login
    case LOGIN_SUCCESS:
      localStorage.setItem("userAuth", JSON.stringify(payload));
      return {
        ...state,
        loading: false,
        error: null,
        userAuth: payload,
      };
    case LOGIN_FAILED:
      return {
        ...state,
        loading: false,
        error: payload,
        userAuth: null,
      };
    //Profile
    case FETCH_PROFILE_SUCCESS:
      return {
        ...state,
        loading: null,
        error: null,
        profile: payload,
      };
    case FETCH_PROFILE_FAIL:
      return {
        ...state,
        loading: null,
        error: payload,
        profile: null,
      };
      //LOGOUT
      case LOGOUT:
      //remove user
      localStorage.removeItem('userAuth')
      return {
        ...state,
        loading: null,
        error: null,
        userAuth: null,
      };
    default:
      return state;
  }
};

const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
   
   
  //login Action
  async function userLoginAction(formData) {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.post(`${API_URL_USER}/login`, formData, config);
      console.log(res);

      if (res?.data?.status === true) {
        dispatch({
          type: LOGIN_SUCCESS,
          payload: res.data,
        });
      }
      //redirect
      window.location.href = '/dashboard'
    } catch (error) {
      console.error("Error at userLoginAction", error);
      dispatch({
        type: LOGIN_FAILED,
        payload: error?.response?.data?.message,
      });
    }
  }

  //Register Action
  async function userRegisterAction(formData) {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.post(`${API_URL_USER}/register`, formData, config);
      console.log(res);

      if (res?.data?.status === true) {
        dispatch({
          type: REGISTER_SUCCESS,
          payload: res.data,
        });
      }
      //redirect
      window.location.href = '/login'
    } catch (error) {
      console.error("Error at userLoginAction", error);
      dispatch({
        type: REGISTER_FAIL,
        payload: error?.response?.data?.message,
      });
    }
  }

  //Profile Action
  async function fetchProfileAction() {
    try {
      const config = {
         headers: {
           "Content-Type": "application/json",
           "Authorization": `Bearer ${state?.userAuth?.token}`,
         },
       };
       
      const res = await axios.get(`${API_URL_USER}/profile`, config);
      
      if (res?.data) {
        dispatch({
          type: FETCH_PROFILE_SUCCESS,
          payload: res.data,
        });
      }
    } catch (error) {
      console.error("Error at FetchProfileAction --> ", error);
      dispatch({
        type: FETCH_PROFILE_FAIL,
        payload: error?.response?.data?.message,
      });
    }
  }

  //Logout
  async function logoutUserAction () {
    dispatch({
      type: LOGOUT,
      payload: null
    })

     //redirect
      window.location.href = '/login'
  }

  //console.log("STATE--> " , state);
  return (
    <authContext.Provider
      value={{ 
         userLoginAction, 
         userRegisterAction,
         userAuth: state,
         token: state?.userAuth?.token, 
         fetchProfileAction, 
         profile: state?.profile,
         error: state?.error,
         logoutUserAction,
         
      }}
    >
      {children}
    </authContext.Provider>
  );
};

export default AuthContextProvider;
