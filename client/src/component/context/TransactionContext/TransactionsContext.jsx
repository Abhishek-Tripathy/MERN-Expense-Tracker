import React, { createContext, useReducer } from "react";
import axios from "axios";
import {
  TRANSACTION_CREATION_STARTED,
  TRANSACTION_CREATION_SUCCES,
  TRANSACTION_CREATION_FAIL,
  TRANSACTION_UPDATE_FAIL,
  TRANSACTION_UPDATE_SUCCES,
} from "./transactionsActionTypes";
import { API_URL_TRANSACTION } from "../../../utils/apiURL";

export const transactionContext = createContext();

const INITIAL_STATE = {
  transaction: null,
  transactions: [],
  loading: false,
  error: null,
  userAuth: JSON.parse(localStorage.getItem("userAuth")),
};
const transactionReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    
    case TRANSACTION_CREATION_SUCCES:
      return {
        ...state,
        loading: false,
        transaction: payload,
      };
    case TRANSACTION_CREATION_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    //update
    case TRANSACTION_UPDATE_SUCCES :
      return {
        ...state,
        loading: false,
        transaction: payload
      }
      case TRANSACTION_UPDATE_FAIL:
        return {
          ...state,
          loading: false,
          error: payload,
        };
    default:
      return state;
  }
};

export const TransactionContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(transactionReducer, INITIAL_STATE);
  console.log("TRANSACTION STATE ==> " , state);
  
  //create Transaction
  const createTransactionAction = async (accountData) => {
    try {
      console.log("accountData ===> ", accountData);
      
      // dispatch({ type: TRANSACTION_CREATION_STARTED });
      //header
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${state?.userAuth?.token}`,
        },
      };
      //request
      const res = await axios.post(`${API_URL_TRANSACTION}`, accountData, config );
      console.log("TRANSACTION RES ==> " , res);
      if(res?.data?.status){
        dispatch({ type: TRANSACTION_CREATION_SUCCES, payload: res?.data });
      }
      window.location.href = `/account-details/${accountData.account}`
    } catch (error) {
      dispatch({ type: TRANSACTION_CREATION_FAIL, payload: error?.response?.data?.message });
    }
  };

  //Update 
  const updateTransactionAction = async (id, updatedData) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${state?.userAuth?.token}`,
        },
      };

      const res = await axios.put(`${API_URL_TRANSACTION}/${id}`, updatedData, config)
      console.log("TRANSACTION UPDATION RES ==> " , res);
      console.log("TRANSACTION UPDATED DATA ==> " , updatedData);

      if(res?.data?.status){
        dispatch({ type: TRANSACTION_UPDATE_SUCCES, payload: res?.data });
      }
      //window.location.href = `/account-details/${accountData.account}`
    } catch (error) {
      dispatch({ type: TRANSACTION_UPDATE_FAIL, payload: error?.response?.data?.message });
    }
  }

  return (
    <transactionContext.Provider
      value={{
        transaction: state.transaction,
        transactions: state.transactions,
        createTransactionAction,
        error: state?.error,
        updateTransactionAction,
      }}
    >
      {children}
    </transactionContext.Provider>
  );
};
