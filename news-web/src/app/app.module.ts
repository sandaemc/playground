import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { JwtInterceptor } from "./_helpers/jwt.interceptor";

import { ArticleListComponent } from "./article-list/article-list.component";
import { ArticleEditComponent } from "./article-edit/article-edit.component";
import { ArticleDetailComponent } from "./article-detail/article-detail.component";
import { ArticleNewComponent } from "./article-new/article-new.component";
import { LoginComponent } from "./login/login.component";

const appRoutes: Routes = [
  { path: "list", component: ArticleListComponent },
  { path: "view/:id", component: ArticleDetailComponent },
  { path: "edit/:id", component: ArticleEditComponent },
  { path: "login", component: LoginComponent },
  { path: "new", component: ArticleNewComponent },
  { path: "", redirectTo: "list", pathMatch: "full" }
];

@NgModule({
  declarations: [
    AppComponent,
    ArticleListComponent,
    ArticleEditComponent,
    ArticleDetailComponent,
    ArticleNewComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes, { enableTracing: true })
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
