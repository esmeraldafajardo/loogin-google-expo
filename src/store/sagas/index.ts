import { all, fork } from 'redux-saga/effects';

import authSaga from './authSaga';

function* rootSaga(): Generator {
  yield all([fork(authSaga)]);
}

export default rootSaga;
