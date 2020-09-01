import configureStore from "./configureStore";
import rootReducer from "./reducers";

export default configureStore({
    reducer: rootReducer
})
