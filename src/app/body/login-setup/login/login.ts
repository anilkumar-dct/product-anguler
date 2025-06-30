import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { AuthService } from '../sign-up/auth-service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  constructor(private authS: AuthService) {}
  form = new FormGroup({
    email: new FormControl('', { validators: [Validators.required] }),
    password: new FormControl('', { validators: [Validators.required] }),
  });
  login() {
    const email = this.form.value.email!;
    const password = this.form.value.password!;
    this.authS.login(email, password).subscribe({
      next: (res: any) => {
        console.log('Login successful', res);
        this.authS.setToken(res.token); // Save token
        // Navigate to dashboard or protected route if needed
      },
      error: (err) => {
        console.error('Login failed', err);
      },
    });
    console.log(email, password);
  }
}
