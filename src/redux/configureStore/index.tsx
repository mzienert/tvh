import { applyMiddleware, compose, createStore } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import monitorReducersEnhancer from '../../enhancers/monitorReducer'
import loggerMiddleware from '../../middleware/logger'
import rootReducer from '../reducers'

export default function configureStore(preloadedState: any) {
    const middlewares = [loggerMiddleware, thunkMiddleware]
    const middlewareEnhancer = applyMiddleware(...middlewares)

    const enhancers = [middlewareEnhancer, monitorReducersEnhancer]
    const composedEnhancers = composeWithDevTools(...enhancers as any)

    const store = createStore(rootReducer, preloadedState, composedEnhancers as any)

    if (process.env.NODE_ENV !== 'production' && module.hot) {
        module.hot.accept('../reducers', () => store.replaceReducer(rootReducer))
    }

    return store
}
