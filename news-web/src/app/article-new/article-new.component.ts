import { Component, OnInit } from "@angular/core";
import { ArticleService } from "../article.service";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-article-new",
  templateUrl: "./article-new.component.html",
  styleUrls: ["./article-new.component.css"]
})
export class ArticleNewComponent implements OnInit {
  addForm: FormGroup;

  constructor(
    private articleService: ArticleService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.addForm = this.formBuilder.group({
      id: 0,
      title: ["", Validators.required],
      description: ""
    });
  }

  ngOnInit() {}

  onSubmit() {
    this.articleService.addArticle(this.addForm.value).subscribe(() => {
      this.router.navigate(["list"]);
    });
  }
}
