import { Component, OnInit, Inject } from "@angular/core";
import { Dish } from "../shared/dish";
import { DishService } from "../services/dish.service";
import { Promotion } from "../shared/promotion";
import { PromotionService } from "../services/promotion.service";
import { Leader } from "../shared/leader";
import { LeaderService } from "../services/leader.service";
import { BasePortalOutlet } from '@angular/cdk/portal';
@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  dish: Dish;
  promotion: Promotion;
  leader: Leader;
  constructor(
    private dishservice: DishService,
    private promotionservice: PromotionService,
    private leaderservice: LeaderService,
    @Inject('BaseURL') public BaseURL
  ) {}
  dishErrMess : string;
  promotionErrMess : string;
  leaderErrMess : string;
  ngOnInit() {
    this.dishservice.getFeaturedDish().subscribe((dish) => (this.dish = dish),errmess => this.dishErrMess = <any>errmess);
    this.leaderservice
      .getFeaturedLeader()
      .subscribe((leader) => (this.leader = leader),errmess => this.leaderErrMess = <any>errmess);
    this.promotionservice
      .getFeaturedPromotion()
      .subscribe((promotion) => (this.promotion = promotion),errmess => this.promotionErrMess = <any>errmess);
  }
}
