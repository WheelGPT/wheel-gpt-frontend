import { HttpClient, HttpHeaders, type HttpParams } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { map } from "rxjs";
import { environment } from "../../environments/environment";
import { AuthenticationSchema, ChannelTokenSchema } from "../models/authentication";

@Injectable({
  providedIn: "root",
})
export class BackendService {
  private static readonly BASE_URL = environment.backend;
  private readonly http = inject(HttpClient);

  private get(path: string, params?: HttpParams) {
    const url = `${BackendService.BASE_URL}/${path}`;
    const token = localStorage.getItem("token");

    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set("Authorization", `${token}`);
    }
    return this.http.get(url, { headers, params });
  }

  private post(path: string, body: unknown) {
    const url = `${BackendService.BASE_URL}/${path}`;
    const token = localStorage.getItem("token");
    let headers = new HttpHeaders();
    if (token !== null) {
      headers = headers.set("Authorization", `${token}`);
    }
    return this.http.post(url, body, { headers });
  }

  private delete(path: string) {
    const url = `${BackendService.BASE_URL}/${path}`;
    const token = localStorage.getItem("token");
    let headers = new HttpHeaders();
    if (token !== null) {
      headers = headers.set("Authorization", `${token}`);
    }
    return this.http.delete(url, { headers });
  }

  public get authentication() {
    return {
      login: (code: string) => {
        return this.post("authentication/login", { code }).pipe(
          map((data) => AuthenticationSchema.parse(data)),
        );
      },
      getToken: () => {
        return this.get("authentication/token").pipe(
          map((data) => ChannelTokenSchema.parse(data)),
        );
      },
      renew: () => {
        return this.post("authentication/renew", {}).pipe(
          map((data) => ChannelTokenSchema.parse(data)),
        );
      },
      remove: () => {
        return this.delete("authentication/remove").pipe(
          map((data) => data),
        );
      },
    };
  }
}
