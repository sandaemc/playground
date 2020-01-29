import { Component, OnInit } from "@angular/core";
import { ArticleService } from "../_services/article.service";
import { Router, ActivatedRoute } from "@angular/router";
import { Article } from '../_models/article';

@Component({
  selector: "app-article-detail",
  templateUrl: "./article-detail.component.html",
  styleUrls: ["./article-detail.component.css"]
})
export class ArticleDetailComponent implements OnInit {
  article: Article;

  constructor(
    private articleService: ArticleService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.articleService
      .getArticle(parseInt(this.route.snapshot.paramMap.get("id")))
      .subscribe(data => (this.article = data));
  }

  onDelete(articleId: number) {
    this.articleService
      .deleteArticle(articleId)
      .subscribe(() => this.router.navigate(["list"]));
  }

  onEdit(articleId: number) {
    this.router.navigate(["edit", articleId]);
  }
}
