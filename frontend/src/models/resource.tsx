import { resourceActions } from "./actionTypes";
import { BaseResponse, DispatchAction } from "./app";

export type Data = {
  timestamps: {
    createdAt: string;
    updatedAt: string;
  };
  _id: string;
  title: string;
  notes: string;
  image: string;
  user: string;
  __v: number;
  media?: number;
};

export type FormNames = "title" | "notes" | "image";
export type FormValues = { [key in FormNames]: any };

export type ResourceBody = {
  title: string;
  notes: string;
  image: string;
};

export type Store = {
  current?: Data;
  all?: Data[];
};

export declare namespace Sagas {
  export type GetResource = {
    type: resourceActions.GET_RESOURCE_REQUEST;
    payload: {
      resolve: (data: Data) => void;
      reject: (error: BaseResponse["error"]) => void;
      id: Data["_id"];
    };
  };

  export type GetResources = {
    type: resourceActions.GET_RESOURCES_REQUEST;
    payload: {
      resolve: (data: Data[]) => void;
      reject: (error: BaseResponse["error"]) => void;
    };
  };

  export type AddResource = {
    type: resourceActions.ADD_RESOURCE_REQUEST;
    payload: {
      resolve: (data: Data) => void;
      reject: (error: BaseResponse["error"]) => void;
      data: ResourceBody;
    };
  };

  export type UpdResource = {
    type: resourceActions.UPD_RESOURCE_REQUEST;
    payload: {
      resolve: (data: Data) => void;
      reject: (error: BaseResponse["error"]) => void;
      data: Partial<Data>;
    };
  };

  export type DelResource = {
    type: resourceActions.DEL_RESOURCE_REQUEST;
    payload: {
      resolve: (id: Data["_id"]) => void;
      reject: (error: BaseResponse["error"]) => void;
      id: Data["_id"];
    };
  };
}

export declare namespace Actions {
  export type GetResource = DispatchAction<Data["_id"], Data>;
  export type GetResources = DispatchAction<void, Data[]>;
  export type AddResource = DispatchAction<ResourceBody, Data>;
  export type UpdResource = DispatchAction<Partial<Data>, Data>;
  export type DelResource = DispatchAction<Data["_id"], void>;
}

export type Cases = {
  [resourceActions.GET_RESOURCE_SUCCESS]: (
    state: Store,
    payload: Data
  ) => Partial<Store>;
  [resourceActions.GET_RESOURCES_SUCCESS]: (
    state: Store,
    payload: Data[]
  ) => Partial<Store>;
  [resourceActions.ADD_RESOURCE_SUCCESS]: (
    state: Store,
    payload: Data
  ) => Partial<Store>;
  [resourceActions.UPD_RESOURCE_SUCCESS]: (
    state: Store,
    payload: Data
  ) => Partial<Store>;
  [resourceActions.DEL_RESOURCE_SUCCESS]: (
    state: Store,
    payload: Data["_id"]
  ) => Partial<Store>;
};
