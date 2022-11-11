import { userActions } from './actionTypes'
import { BaseResponse, DispatchAction } from './app'

export type Data = {
  timestamps: {
    createdAt: string;
    updatedAt: string;
  };
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  picture: string;
  __v: number;
};

export type Store = {
  current?: Data;
};

export declare namespace Sagas {
  export type GetUser = {
    type: keyof userActions.GET_USER_REQUEST;
    payload: {
      resolve: (data: Data) => void;
      reject: (error: BaseResponse["error"]) => void;
    };
  };
}

export declare namespace Actions {
  export type GetUser = DispatchAction<void, Data>;
}

export type Cases = {
  [userActions.GET_USER_SUCCESS]: (state: Store, payload: Data) => Partial<Store>,
}
