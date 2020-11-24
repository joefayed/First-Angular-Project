import { Component, OnInit, Inject } from "@angular/core";
import { Leader } from "../shared/leader";
import { LeaderService } from "../services/leader.service";
import { flyInOut, expand } from '../animations/app.animation';
@Component({
  selector: "app-about",
  templateUrl: "./about.component.html",
  styleUrls: ["./about.component.scss"],
  host: {
  '[@flyInOut]': 'true',
  'style': 'display: block;'
  },
  animations: [
    flyInOut(), 
    expand()
  ]
})
export class AboutComponent implements OnInit {
  constructor(private leaderService: LeaderService, 
    @Inject('BaseURL') public BaseURL) {}
  leaders: Leader[];
  errMess: string;
  ngOnInit(): void {
    this.leaderService
      .getLeaders()
      .subscribe((leaders) => (this.leaders = leaders),errmess => this.errMess = <any>errmess);
  }
}
