import _ from "lodash";
import { message } from "antd";

const getMessage = err => _.get(err, "message") || "Something went wrong";

export default async function Catch<T>(
  fn: any,
  cb = (conf: { error: any; loading: boolean }): any => {}
): Promise<T | undefined> {
  cb({ loading: true, error: null });
  try {
    const res = await (fn as any)();
    cb({ loading: false, error: null });
    return res;
  } catch (err) {
    cb({ loading: false, error: err });
    message.error(getMessage(err));
  }
}

(Catch as any).Dev = async function Dev<T>(
  fn: any,
  cb = (conf: { error: any; loading: boolean }): any => {}
): Promise<T | undefined> {
  cb({ loading: true, error: null });
  try {
    const res = await (fn as any)();
    cb({ loading: false, error: null });
    return res;
  } catch (err) {
    cb({ loading: false, error: err });
    console.error(getMessage(err));
  }
};
