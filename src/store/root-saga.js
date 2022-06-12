import { all, call } from 'redux-saga/effects';

import { categoriesSaga } from './categories/category.saga';
import { usersSaga } from './user/user.saga';

export function* rootSaga() {
  yield all([call(categoriesSaga), call(usersSaga)]);
}
