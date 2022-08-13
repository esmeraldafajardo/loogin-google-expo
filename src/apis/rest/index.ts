import Axios from "axios";
import { getAuth, getIdToken } from "firebase/auth";
import type { Auth } from "firebase/auth";
import type { AuthUserData } from "../firebase/authTypes";

class RestApi {
  private static _api: RestApi | null = null;
  private _user: AuthUserData | null = null;

  private _auth: Auth | null = null;

  public static getInstance() {
    if (!this._api) {
      this._api = new RestApi();
    }
    return this._api;
  }

  public setUser(user: AuthUserData): void {
    this._user = user;
  }

  public getAuthApp(): Auth {
    this._auth = getAuth();
    return this._auth;
  }
}

export default RestApi;
