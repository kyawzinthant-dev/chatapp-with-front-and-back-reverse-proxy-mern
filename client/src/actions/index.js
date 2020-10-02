import axios from "axios";
import { GET_USER,GET_CONTACTS, GET_MESSAGES, GET_ALL,GET_REQUEST,GET_RESPONSE } from "./types";

export const getUser = () => async (dispatch) => {
  const res = await axios.get("/api/user");
  dispatch({
    type: GET_USER,
    payload: res.data,
  });
};

export const getContacts = () => async (dispatch) => {
  const res = await axios.get("/api/contacts");
  dispatch({
    type: GET_CONTACTS,
    payload: res.data,
  });
};

export const getMessages = (room,limit) => async (dispatch) => {
  const res = await axios.get(`/api/messages/${room}/${limit}`);

  dispatch({
    type: GET_MESSAGES,
    payload: res.data,
  });
};

export const getAllusers = () => async (dispatch) => {
  const res = await axios.get("/api/users");
  dispatch({
    type: GET_ALL,
    payload: res.data,
  });
};

export const getRequest = () => async (dispatch) => {
  const res = await axios.get("/api/request");
  dispatch({
    type: GET_REQUEST,
    payload: res.data,
  });
};

export const getResponse = () => async (dispatch) => {
  const res = await axios.get("/api/response");
  dispatch({
    type: GET_RESPONSE,
    payload: res.data,
  });
};

