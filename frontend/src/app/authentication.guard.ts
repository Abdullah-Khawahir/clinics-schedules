import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthenticationService } from './authentication.service';

export const authenticationGuard: CanActivateFn = (route, state) => {
  let isLogged$ = inject(AuthenticationService).isLoggedIn()
  return isLogged$;
};

