import axios from "axios";
import * as Models from "src/models";

class Endpoints {
  constructor(public config: Models.Api.EndpointsConfig = {}) { }
  private withBase = (path: string = "/"): string =>
    `${this.config.BASE_PATH}${path}`;

  public login = () => this.withBase(`/auth/login`);
  public logout = () => this.withBase(`/auth/logout`);
  public logoutForce = () => this.withBase(`/auth/logout-force`);
  public me = () => this.withBase(`/auth/me`);
  public resources = () => this.withBase(`/resources`);
  public resource = (id: string) => this.withBase(`/resources/${id}`);
  public medias = () => this.withBase(`/media`);
  public media = (id: string) => this.withBase(`/media/${id}`);
  public mediaResources = (id: string) =>
    this.withBase(`/media/resource/${id}`);
  public images = () => this.withBase(`/images`);
  public imagesUpload = () => this.withBase(`/images/upload`);
}

class API {
  constructor(public config: Models.Api.ApiConfig) { }

  // auth

  public login() {
    return this.config.adapter.get<Models.Resource.Data>(
      this.config.endpoints.login()
    );
  }
  public logout() {
    return this.config.adapter.get(this.config.endpoints.logout());
  }
  public logoutForce() {
    return this.config.adapter.get(this.config.endpoints.logoutForce());
  }

  // user

  public getMe() {
    return this.config.adapter.get<Models.User.Data>(
      this.config.endpoints.me()
    );
  }

  // resources

  public getResources() {
    return this.config.adapter.get<Models.Resource.Data[]>(
      this.config.endpoints.resources()
    );
  }
  public createResource(data: Models.Resource.ResourceBody) {
    return this.config.adapter.post<Models.Resource.Data>(
      this.config.endpoints.resources(),
      data
    );
  }
  public updateResource(data: Partial<Models.Resource.Data>) {
    return this.config.adapter.put<Models.Resource.Data>(
      this.config.endpoints.resources(),
      data
    );
  }
  public deleteResource(id: string) {
    return this.config.adapter.delete(this.config.endpoints.resource(id));
  }
  public getResource(id: string) {
    return this.config.adapter.get<Models.Resource.Data>(
      this.config.endpoints.resource(id)
    );
  }

  // media

  public createMedia(data: Models.Media.MediaBody) {
    return this.config.adapter.post<Models.Media.Data>(
      this.config.endpoints.medias(),
      data
    );
  }
  public getMedia(id: string) {
    return this.config.adapter.get<Models.Media.Data>(
      this.config.endpoints.media(id)
    );
  }
  public deleteMedia(id: string) {
    return this.config.adapter.delete(this.config.endpoints.media(id));
  }

  // media resources

  public getMediaResources(id: string) {
    return this.config.adapter.get<Models.Media.Data[]>(
      this.config.endpoints.mediaResources(id)
    );
  }
  public updateMediaResource({ _id, ...data }: Models.Media.MediaUpdateBody) {
    return this.config.adapter.put<Models.Media.Data[]>(
      this.config.endpoints.mediaResource(_id),
      data
    );
  }

  // images

  public uploadImage(data: Models.Images.ImageBody) {
    return this.config.adapter.post<string>(this.config.endpoints.imagesUpload(), data);
  }
  public deleteImage(data: Models.Images.DeleteBody) {
    return this.config.adapter.delete(this.config.endpoints.images(), { data });
  }
}

const endpoints = new Endpoints({ BASE_PATH: process.env.REACT_APP_API_URL });

export { Endpoints, endpoints };
export default new API({ adapter: axios as any, endpoints });
