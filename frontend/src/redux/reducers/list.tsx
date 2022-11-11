import * as Models from "../../models";

type Props = {
  type: Models.ActionTypes.listActions;
  payload: IItem[];
};

type Reducer = (state: any, props: Props) => any;

const INITIAL_STATE: IItem[] = [];

export default function(state = INITIAL_STATE, { type, payload }: Props) {
  switch (type) {
    case Models.ActionTypes.listActions.FETCH_LIST_SUCCESS:
      return payload;
    default:
      return state;
  }
}
