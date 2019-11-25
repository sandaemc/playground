import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { Article } from '../_models/article'


@Injectable({
  providedIn: "root"
})
export class ArticleService {
  private articlesURL = `${environment.apiBaseURL}/articles`;

  constructor(private client: HttpClient) {}

  getArticles() {
    return this.client.get<Article[]>(this.articlesURL);
  }

  getArticle(id: number) {
    return this.client.get<Article>(this.articlesURL + `/${id}`);
  }

  addArticle(article: Omit<Article, "id">) {
    return this.client.post<Article>(this.articlesURL, article);
  }

  updateArticle(article: Article) {
    return this.client.put<Article>(
      this.articlesURL + `/${article.id}`,
      article
    );
  }

  deleteArticle(id: number) {
    return this.client.delete(this.articlesURL + `/${id}`);
  }
}
