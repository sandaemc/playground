import { Component, OnInit } from "@angular/core";
import { ArticleService, Article } from "../article.service";
import { Router, ActivatedRoute } from "@angular/router";
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from "@angular/forms";

@Component({
  selector: "app-article-edit",
  templateUrl: "./article-edit.component.html",
  styleUrls: ["./article-edit.component.css"]
})
export class ArticleEditComponent implements OnInit {
  article: Article;
  editForm: FormGroup;

  constructor(
    private articleService: ArticleService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.editForm = this.formBuilder.group({
      id: 0,
      title: ["", [Validators.required]],
      description: "",
      created_at: "",
      updated_at: ""
    });
  }

  ngOnInit() {
    this.articleService
      .getArticle(parseInt(this.route.snapshot.paramMap.get("id")))
      .subscribe(data => this.editForm.setValue(data));
  }

  onSubmit() {
    this.articleService.updateArticle(this.editForm.value).subscribe(() => {
      this.router.navigate(["list"]);
    });
  }
}
