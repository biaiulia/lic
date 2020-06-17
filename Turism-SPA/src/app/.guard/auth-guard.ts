import {
  Injectable
} from '@angular/core';
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot
} from '@angular/router';
import {
  AuthService
} from '../services/auth.service';
import {
  AlertifyService
} from '../services/alertify.service';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router,
              private alertify: AlertifyService) {}


  canActivate(next: ActivatedRouteSnapshot): boolean {
    debugger;
    const roles = next.data['roles'] as Array < string > ; // pentur ca nu protejam child routes. daca protejam puneam firstchild
    if (roles) {
      const match = this.authService.roleCheck(roles);
      if (match) {
        return true;
      }
      this.router.navigate(['home']);
      this.alertify.error('Nu sunteti autorizati sa intrati in aceasta zona!');
    }
  }
}
