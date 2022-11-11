import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import { History } from "history";
import * as Models from "../../models";
import player from "./player";
import user from "./user";
import resources from "./resources";
import media from "./media";
import images from "./images";

export default (history: History) =>
  combineReducers<Models.App.IReducerStates>({
    user,
    media,
    images,
    player,
    resources,
    router: connectRouter(history)
  });
