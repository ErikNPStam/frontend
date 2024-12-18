import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
/**
   * @authored by Max Sijbrands
   */
export class AuthService {
    private readonly logoutUrl = 'http://localhost:3002/user/logout';
    private loginStatus = new BehaviorSubject<boolean>(this.checkLoginStatus());

    constructor(
        private readonly http: HttpClient,
        private readonly router: Router,
        private readonly snackBar: MatSnackBar
    ) { }

    public logout(): void {
        this.http.post(this.logoutUrl, {}, { withCredentials: true }).subscribe(
            () => {
                sessionStorage.clear();
                localStorage.clear();
                this.snackBar.open('Successfully logged out', 'Close', {
                    duration: 3000,
                });
                this.updateLoginStatus(false);
                this.router.navigate(['/login']);
            },
            (error) => {
                console.error('Logout failed', error);
                this.snackBar.open('Logout failed', 'Close', {
                    duration: 3000,
                });
            }
        );
    }

    public isLoggedIn(): Observable<boolean> {
        return this.loginStatus.asObservable();
    }

    public updateLoginStatus(status: boolean): void {
        this.loginStatus.next(status);
    }

    private checkLoginStatus(): boolean {
        // Check if the user is logged in based on the presence of session data
        return !!sessionStorage.getItem('user') || !!localStorage.getItem('user');
    }
}
