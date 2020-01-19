import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Subscription } from 'rxjs/Subscription';
import { NavListService } from "../navlist.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit,OnDestroy {
  isAuth:boolean;
  authSubscription: Subscription;
  navList = [];
  constructor(private authService: AuthService, private navListService: NavListService) { }

  ngOnInit() {
    this.authSubscription = this.authService.authChange.subscribe(authChange => {
      this.isAuth = authChange;
    });
    this.navList = this.navListService.getNavList();
  }

  navBarClick(nav) {
    nav.disabled = true;
    this.navListService.onNavListChange(nav);
  }

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy() {
    this.authSubscription.unsubscribe();
  }

}
