import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { LoginOptions} from './login-options';
// import { auth } from 'firebase/app';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']/* ,
  directives: [FORM_DIRECTIVES] */
})
export class LoginComponent implements OnInit {
  signUpForm: FormGroup;
  userRole: String = 'student';

  constructor(public _auth: AuthService, private fb: FormBuilder) {
    this.createForm();
  }

  createForm() {
    this.signUpForm = this.fb.group({
      displayName: ['', Validators.required ], // <--- the FormControl called "name"
      email: ['', Validators.required ],
      currentClass: ['', Validators.required ],
      password: [''], // need to see if they logged in with google
      confirmPassword: [''],
      roles: ['', Validators.required ],
    });
  }

  emailSignUp() {
    this._auth.emailSignUp(this.signUpForm.value.email, this.signUpForm.value.password)
    .then((userCredential) => {
      const data = {
        email: this.signUpForm.value.email,
        displayName: this.signUpForm.value.displayName,
        currentClass: this.signUpForm.value.currentClass,
      };
      const user = {...userCredential, ...data};

      this._auth.addRoleStudent(user);
    });

  }

  googleUserSignUp() {
    this._auth.googleLogin()
    .then((userCredential) => {
      // TODO: Add the data now just testing
      const data = {
        email: this.signUpForm.value.email,
        displayName: this.signUpForm.value.displayName,
        currentClass: this.signUpForm.value.currentClass,
      };
      const user = {...userCredential, ...data};
      this._auth.addRoleStudent(user);
    });
  }
  // uid: string;
  //   email: string;
  //   displayName: string;
  //   currentClass?: string;
  //   //reportCard?: string;
  //   //points?: string;
  //   //stuff?: string;
  //   currentLesson?: number;
  //   roles: Roles;

  ngOnInit() {
  }

}
