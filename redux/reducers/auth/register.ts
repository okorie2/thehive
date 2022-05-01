import { Reducer } from "redux";
import {
  REGISTER,
  REGISTER_SUCCESS,
  REGISTER_ERROR,
  AuthActionState,
} from "../../actions/actionTypes";

const initialState: AuthActionState = {
  loading: false,
  error: {
    status: false,
    data: {
      data: {
        message: "error",
      },
    },
  },
  data: {
    status: 0,
    data: {
      message: "success",
    },
  },
};
export const register: Reducer<AuthActionState> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case REGISTER:
      return {
        ...state,
        loading: true,
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    case REGISTER_ERROR:
      return {
        ...state,
        loading: false,
        error: { ...state.error, status: true, data: action.payload },
      };
    default:
      return state;
  }
};
