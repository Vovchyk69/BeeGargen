import { Dispatch } from "redux";
import { Store as UserState } from "./user";
import { Store as ResourceState } from "./resource";
import { Store as MediaState } from "./media";
import { Store as ImagesState } from "./images";

export type BaseResponse<R = boolean, E = boolean> = { data: R; error: E };
export type DispatchAction<A = any, R = any> = (...args: A[]) => (dispatch: Dispatch) => Promise<R>;
export type AsyncReturnType<T extends (...args: any) => any> =
  T extends (...args: any) => Promise<infer U> ? U :
    T extends (...args: any) => infer U ? U :
      any

export type IReducerStates = {
  user: UserState;
  media: MediaState;
  images: ImagesState;
  resources: ResourceState;
  player: PlayerState;
  router: any;
};
