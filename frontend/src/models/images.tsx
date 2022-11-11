import { imagesActions } from './actionTypes'
import { BaseResponse, DispatchAction } from './app'

export type Data = {
  id: string,
}

export type ImageBody = FormData;

export type DeleteBody = {
  data: string;
};

export type Store = {
  current?: Data['id'];
  all?: Data['id'][];
};

export declare namespace Sagas {
  export type AddImage = {
    type: keyof imagesActions.ADD_IMAGE_REQUEST;
    payload: {
      resolve: (id: Data['id']) => void;
      reject: (error: BaseResponse["error"]) => void;
      data: ImageBody
    };
  };

  export type DelImage = {
    type: keyof imagesActions.DEL_IMAGE_REQUEST;
    payload: {
      resolve: (id: Data['id']) => void;
      reject: (error: BaseResponse["error"]) => void;
      data: DeleteBody
    };
  };
}

export declare namespace Actions {
  export type AddImage = DispatchAction<ImageBody, Data>;
  export type DelImage = DispatchAction<DeleteBody, Data['id']>;
}

export type Cases = {
  [imagesActions.ADD_IMAGE_SUCCESS]: (state: Store, payload: Data['id']) => Partial<Store>,
  [imagesActions.DEL_IMAGE_SUCCESS]: (state: Store, payload: Data['id']) => Partial<Store>,
}
