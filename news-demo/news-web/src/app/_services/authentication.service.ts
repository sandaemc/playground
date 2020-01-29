import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import { environment } from "../../environments/environment";

type jwtToken = {
  exp: string;
  token: string;
  username: string;
};

@Injectable({ providedIn: "root" })
export class AuthenticationService {
  private authURL = `${environment.apiBaseURL}/auth/login`;

  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    return this.http
      .post<jwtToken>(this.authURL, { email, password })
      .pipe(
        map(jwt => {
          localStorage.setItem("jwt", JSON.stringify(jwt));
          return jwt;
        })
      );
  }

  isLoggedIn() {
    const jwt = localStorage.getItem("jwt");
    return jwt !== null;
  }

  getToken() {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      return JSON.parse(jwt).token;
    }

    return null;
  }
}
