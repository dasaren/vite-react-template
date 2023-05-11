import { combineReducers } from "redux";
import myUserReducer from "../features/redux-users/myUserSlice";
import chatReducer from "features/chatDS/slice/chatSlice";
import commerceReducer from "features/commerce/Slice/commerceSlice";
import commerceCartReducer from "features/commerce/Slice/cartSlice";

const rootReducer = combineReducers({
  myuser: myUserReducer,
  chat: chatReducer,
  commerce: commerceReducer,
  cart: commerceCartReducer,
  
});

export default rootReducer;
