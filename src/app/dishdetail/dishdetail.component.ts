import { Component, OnInit, ViewChild } from "@angular/core";
import { Dish } from "../shared/dish";
import { DishService } from "../services/dish.service";
import { switchMap } from "rxjs/operators";
import { Params, ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Feedback, ContactType } from "../shared/feedback";
@Component({
  selector: "app-dishdetail",
  templateUrl: "./dishdetail.component.html",
  styleUrls: ["./dishdetail.component.scss"],
})
export class DishdetailComponent implements OnInit {
  dish: Dish;
  dishIds: string[];
  prev: string;
  next: string;
  formatLabel(value: number) {
    return value;
  }
  @ViewChild("fform") feedbackFormDirective;
  formErrors = {
    author: "",
    comment:"",
    rating: "5"
  };
validationMessages = {
    author: {
      required: "author name is required.",
      minlength: "Author name must be at least 2 characters long.",
      maxlength: "FirstName cannot be more than 25 characters long.",
    },
    comment: {
      required: "Comment is required.",
      minlength: "Author name must be at least 1 characters long.",
    }
  };
  feedbackForm: FormGroup;
  feedback: Feedback;
  contactType = ContactType;
  constructor(
    private fb: FormBuilder,
    private dishservice: DishService,
    private route: ActivatedRoute,
    private location: Location
  ) 
  {
    this.createForm();
  }
  

  ngOnInit() {
    this.dishservice
      .getDishIds()
      .subscribe((dishIds) => (this.dishIds = dishIds));
    this.route.params
      .pipe(
        switchMap((params: Params) => this.dishservice.getDish(params["id"]))
      )
      .subscribe((dish) => {
        this.dish = dish;
        this.setPrevNext(dish.id);
      });
  }
  createForm() {
    this.feedbackForm = this.fb.group({
      author: [
        "",
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(25),
        ],
        
      ],
    comment: [
        "",
        [
          Validators.required,
          Validators.minLength(1),
        ],
      ],
    rating: [
        "5",
        [
        ],
      ]});
      this.feedbackForm.valueChanges.subscribe((data) =>
      this.onValueChanged(data)
    );
    this.onValueChanged();
  }
  onValueChanged(data?: any){
    if (!this.feedbackForm) {
      return;
    }
    const form = this.feedbackForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        // clear previous error message (if any)
        this.formErrors[field] = "";
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + " ";
            }
          }
        }
      }
    }
  }
  onSubmit() {
    var date = new Date();
    var data = this.feedbackForm.value;
    data.date=date;
    this.dish.comments.push(data);
    this.feedback = this.feedbackForm.value;
    this.feedbackFormDirective.resetForm();
    this.feedbackForm.reset({
      author: "",
      comment: "",
      rating: "5"
    });
  }
  setPrevNext(dishId: string) {
    const index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[
      (this.dishIds.length + index - 1) % this.dishIds.length
    ];
    this.next = this.dishIds[
      (this.dishIds.length + index + 1) % this.dishIds.length
    ];
  }

  goBack(): void {
    this.location.back();
  }
}
