import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';
import createRootReducer from './slices';
import saga from './sagas';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: createRootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false })
      .concat(logger)
      .concat(sagaMiddleware),
  enhancers: [],
});

sagaMiddleware.run(saga);

export type RootState = ReturnType<typeof store.getState>;

export default store;
