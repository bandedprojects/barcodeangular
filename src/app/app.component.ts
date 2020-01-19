import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { NavListService } from "./navigation/navlist.service";
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'kalliyath';

  isAuth:boolean;
  authSubscription: Subscription;
  navListSubscription: Subscription;
  sideNav =  [];
  

  constructor(private authService: AuthService,private navListService: NavListService) { }

  ngOnInit() {
    this.authSubscription = this.authService.authChange.subscribe(authChange => {
      this.isAuth = authChange;
    });
    //this.navList = this.navListService.getNavList('batches')
   /*this.navListSubscription = this.navListService.navListChange.subscribe(navList => {
      this.sideNav = navList.sidenav;
    })*/
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.navListSubscription = this.navListService.navListChange.subscribe(navList => {
        this.sideNav = navList.sidenav;
      })
    });
  }  

  ngOnDestroy() {
    this.authSubscription.unsubscribe();
    this.navListSubscription.unsubscribe();
  }

}
