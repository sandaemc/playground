import { Component, OnInit } from "@angular/core";
import { ArticleService } from "../_services/article.service";
import { Router } from "@angular/router";
import { Article } from "../_models/article";
import { AuthenticationService } from "../_services/authentication.service";

@Component({
  selector: "app-article-list",
  templateUrl: "./article-list.component.html",
  styleUrls: ["./article-list.component.css"]
})
export class ArticleListComponent implements OnInit {
  articles: Article[];
  isLoggedIn: boolean;

  constructor(
    private articleService: ArticleService,
    private authService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit() {
    this.articleService.getArticles().subscribe(data => (this.articles = data));
    this.isLoggedIn = this.authService.isLoggedIn();
  }

  onSelect(articleId: number) {
    this.router.navigate(["view", articleId]);
  }

  onDelete(articleId: number) {
    this.articleService.deleteArticle(articleId).subscribe(() => {
      this.articles = this.articles.filter(c => c.id != articleId);
    });
  }
}
