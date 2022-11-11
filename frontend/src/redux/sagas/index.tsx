import { all } from "redux-saga/effects";
import userSagas from "./user";
import resourceSagas from "./resource";
import mediaSagas from "./media";
import imagesSagas from "./images";

export default function* rootSaga() {
  yield all([...userSagas, ...resourceSagas, ...mediaSagas, ...imagesSagas]);
}
