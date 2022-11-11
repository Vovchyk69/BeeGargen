import { mediaActions } from "./actionTypes";
import { BaseResponse, DispatchAction } from "./app";
import { Resource } from ".";

export type Data = {
  timestamps: {
    createdAt: string;
    updatedAt: string;
  };
  isTextEdited: boolean;
  _id: string;
  imageLinkURL: string;
  imageAudioURL: string;
  imageText: string;
  locale: "uk";
  ssmlTextMarkup: string;
  user: string;
  resource?: string | Resource.Data;
  audioDuration: number;
  __v: number;
};

export type MediaBody = FormData;

export type MediaUpdateBody = {
  imageText: string;
  _id: string;
};

export type Store = {
  current?: Data;
  media_resources?: Data[];
};

export declare namespace Sagas {
  export type GetMedia = {
    type: keyof mediaActions.GET_MEDIA_REQUEST;
    payload: {
      resolve: (data: Data) => void;
      reject: (error: BaseResponse["error"]) => void;
      id: Data["_id"];
    };
  };

  export type AddMedia = {
    type: keyof mediaActions.ADD_MEDIA_REQUEST;
    payload: {
      resolve: (data: Data) => void;
      reject: (error: BaseResponse["error"]) => void;
      data: MediaBody;
    };
  };

  export type DelMedia = {
    type: keyof mediaActions.DEL_MEDIA_REQUEST;
    payload: {
      resolve: (id: Data["_id"]) => void;
      reject: (error: BaseResponse["error"]) => void;
      id: Data["_id"];
    };
  };

  export type GetMediaResources = {
    type: keyof mediaActions.GET_MEDIA_RESOURCES_REQUEST;
    payload: {
      resolve: (data: Data[]) => void;
      reject: (error: BaseResponse["error"]) => void;
      id: Data["_id"];
    };
  };

  export type UpdMediaResource = {
    type: keyof mediaActions.UPD_MEDIA_RESOURCE_REQUEST;
    payload: {
      resolve: (data: Data) => void;
      reject: (error: BaseResponse["error"]) => void;
      data: MediaUpdateBody;
    };
  };
}

export declare namespace Actions {
  export type GetMedia = DispatchAction<Data["_id"], Data>;
  export type AddMedia = DispatchAction<MediaBody, Data>;
  export type DelMedia = DispatchAction<Data["_id"], Data["_id"]>;
  export type GetMediaResources = DispatchAction<Data["_id"], Data[]>;
  export type UpdMediaResource = DispatchAction<MediaUpdateBody, Data>;
}

export type Cases = {
  [mediaActions.GET_MEDIA_SUCCESS]: (
    state: Store,
    payload: Data
  ) => Partial<Store>;
  [mediaActions.ADD_MEDIA_SUCCESS]: (
    state: Store,
    payload: Data
  ) => Partial<Store>;
  [mediaActions.DEL_MEDIA_SUCCESS]: (
    state: Store,
    payload: Data["_id"]
  ) => Partial<Store>;
  [mediaActions.GET_MEDIA_RESOURCES_SUCCESS]: (
    state: Store,
    payload: Data[]
  ) => Partial<Store>;
  [mediaActions.UPD_MEDIA_RESOURCE_SUCCESS]: (
    state: Store,
    payload: Data
  ) => Partial<Store>;
};
