import { BaseResponse } from "./app";

export type Res<R = boolean, E = boolean> = BaseResponse<R, E>;
export type EndpointsConfig = Partial<{ BASE_PATH: string }>;
export type Endpoints<E = any> = { [K in keyof E]: E[K] };
export type ApiConfig = { endpoints: Endpoints; adapter: Adapter };

export interface Adapter {
  get<R = boolean>(path: string, ...args: any[]): Promise<R>;
  put<R = boolean>(path: string, ...args: any[]): Promise<R>;
  post<R = boolean>(path: string, ...args: any[]): Promise<R>;
  patch<R = boolean>(path: string, ...args: any[]): Promise<R>;
  delete<R = boolean>(path: string, ...args: any[]): Promise<R>;
}
