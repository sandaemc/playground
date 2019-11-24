import { Component, OnInit } from "@angular/core";
import { ArticleService, Article } from "../article.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-article-list",
  templateUrl: "./article-list.component.html",
  styleUrls: ["./article-list.component.css"]
})
export class ArticleListComponent implements OnInit {
  articles: Article[];

  constructor(private articleService: ArticleService, private router: Router) {}

  ngOnInit() {
    this.articleService.getArticles().subscribe(data => (this.articles = data));
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
