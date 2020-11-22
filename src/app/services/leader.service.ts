import { Injectable } from "@angular/core";
import { Leader } from "../shared/leader";
import { Observable, of } from "rxjs";
import { delay } from "rxjs/operators";
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';
import { LEADERS } from '../shared/leaders';
@Injectable({
  providedIn: "root",
})
export class LeaderService {
  constructor(private http: HttpClient) {}
  getLeaders(): Observable<Leader[]> {
    /*return new Promise((resolve) => {
      // Simulate server latency with 2 second delay
      setTimeout(() => resolve(LEADERS), 2000);
    });
    return of(LEADERS).pipe(delay(2000));*/
    return this.http.get<Leader[]>(baseURL + 'leaders');
  }
  getLeader(id: string): Observable<Leader> {
    /*return new Promise((resolve) => {
      // Simulate server latency with 2 second delay
      setTimeout(
        () => resolve(LEADERS.filter((leader) => leader.id === id)[0]),
        2000
      );
    });
    return of(LEADERS.filter((leader) => leader.id === id)[0]).pipe(
      delay(2000)    );*/
      return this.http.get<Leader>(baseURL + 'leader/' + id);
  }

  getFeaturedLeader(): Observable<Leader> {
    /*return new Promise((resolve) => {
      // Simulate server latency with 2 second delay
      setTimeout(
        () => resolve(LEADERS.filter((leader) => leader.featured)[0]),
        2000
      );
    });
    return of(LEADERS.filter((leader) => leader.featured)[0]).pipe(delay(2000));*/
    return this.http.get<Leader[]>(baseURL + 'leaders?featured=true').pipe(map(leaders => leaders[0]));
  }
}
