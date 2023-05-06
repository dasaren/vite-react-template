import { combineReducers } from "redux";
import myUserReducer from "../features/redux-users/myUserSlice";
import chatReducer from "features/chatDS/slice/chatSlice";

const rootReducer = combineReducers({
  myuser: myUserReducer,
  chat: chatReducer,
});

export default rootReducer;
