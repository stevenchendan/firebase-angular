import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { composeAsyncValidators } from '@angular/forms/src/directives/shared';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  public signupForm: FormGroup;
  public hide = true;
  constructor(
    public fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {
    this.signupForm = fb.group({
      email: ['', Validators.email, Validators.required],
      password: ['',
        Validators.maxLength(26),
        Validators.minLength(6)]
    });
  }

  ngOnInit() {
  }

  get email() {
    return this.signupForm.get('email');
  }

  get password() {
    return this.signupForm.get('password');
  }

  public signUp() {
    return this.auth.emailSignUp(this.email.value, this.password.value)
      .then(user => {
        if (this.signupForm.valid) {
          this.router.navigate(['/']);
        }
      });
  }


}
