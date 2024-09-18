import {createContext, useReducer} from 'react'
import { ACCOUNT_DETAILS_SUCCESS, ACCOUNT_DETAILS_FAIL, ACCOUNT_DETAILS_STARTED, ACCOUNT_CREATION_FAIL, ACCOUNT_CREATION_SUCCES } from './accountActionTypes';
import { API_URL_ACC } from '../../../utils/apiURL';
import axios from 'axios'

export const accountContext = createContext()

//initial state

const INITIAL_STATE = {
   userAuth: JSON.parse(localStorage.getItem("userAuth")),
   account : null,
   accounts : [],
   loading: false,
   error: null,
};

//reducer

const accountReducer = (state, action ) => {
   const {type, payload } = action 

   switch(type) {
      //Details
      case ACCOUNT_DETAILS_SUCCESS: return {
         ...state,
         account: payload,
         loading: false,
         error: null
      };
      case ACCOUNT_DETAILS_FAIL: return {
         ...state,
         account: null,
         loading: false,
         error: payload
      };

       //create
       case ACCOUNT_CREATION_SUCCES: return {
         ...state,
         account: payload,
         loading: false,
         error: null
      };
      case ACCOUNT_CREATION_FAIL: return {
         ...state,
         account: null,
         loading: false,
         error: payload
      };

      default: return state
   }
}

//provider

export const AccountContextProvider = ({children}) => {
   const [state, dispatch] = useReducer(accountReducer, INITIAL_STATE)
   //console.log("STATE ===>" , state);
   
   //get account details ACTION
   const getAccountDetailsAction = async (id) => {
      const config = {
         headers: {
            "Authorization": `Bearer ${state?.userAuth?.token}`,
            "Content-Type": "application/json",
         }
      }
      try {
         const res = await axios.get(`${API_URL_ACC}/${id}`, config)

         if(res?.data?.status){
            dispatch({
               type: ACCOUNT_DETAILS_SUCCESS,
               payload: res?.data
            })
         }
         console.log("ACCOUNT RES ===> " ,res);
         
      } catch (error) {
         console.error("FETCHING ACCOUNT DETAILS ERROR --> ", error)
         dispatch({
            type: ACCOUNT_DETAILS_FAIL,
            payload: error?.response?.data?.message,
          })
      }
   }

   //Create Account
   const createAccountAction = async (formData) => {
      const config = {
         headers: {
            "Authorization": `Bearer ${state?.userAuth?.token}`,
            "Content-Type": "application/json",
         }
      }
      
      try {
         const res = await axios.post(`${API_URL_ACC}`,formData, config)

         if(res?.data?.status){
            dispatch({
               type: ACCOUNT_CREATION_SUCCES,
               payload: res?.data
            })
         }
         console.log("CREATE ACCOUNT RES ===> " ,res);
         window.location.href = '/dashboard'
      } catch (error) {
         console.log("CREATE ACCOUNT ERROR --> ", error)
         dispatch({
            type: ACCOUNT_CREATION_FAIL,
            payload: error?.response?.data?.message,
          })
      }
   }



   return <accountContext.Provider value={{
      getAccountDetailsAction,
      account: state?.account,
      error: state?.error,
      createAccountAction,
      accId: state?.account?.message?.id
   }}>
            {children}
         </accountContext.Provider>
}


export default AccountContextProvider