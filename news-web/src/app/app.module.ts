import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ArticleListComponent } from "./article-list/article-list.component";
import { ArticleEditComponent } from "./article-edit/article-edit.component";
import { ArticleDetailComponent } from "./article-detail/article-detail.component";

const appRoutes: Routes = [
  { path: "list", component: ArticleListComponent },
  { path: "view/:id", component: ArticleDetailComponent },
  { path: "edit/:id", component: ArticleEditComponent },
  { path: "", redirectTo: "list", pathMatch: "full" }
];

@NgModule({
  declarations: [
    AppComponent,
    ArticleListComponent,
    ArticleEditComponent,
    ArticleDetailComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes, { enableTracing: true })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
