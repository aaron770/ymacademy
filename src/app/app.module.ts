import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
//import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';
import { AuthService } from './core/auth.service';
import { AngularFirestoreModule } from 'angularfire2/firestore';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LessonNavigatorComponent } from './lesson-navigator/lesson-navigator.component';
import { LessonComponent } from './lesson/lesson.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CoreModule } from './core/core.module';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { RouterModule, Routes } from '@angular/router';

const appRoutes: Routes = [
  { path: 'user-profile', component: UserProfileComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LandingPageComponent,
    LessonNavigatorComponent,
    LessonComponent,
    NavbarComponent,
    UserProfileComponent
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebase, 'academy-dev'),
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    // AngularFireAuthModule,
    BrowserModule,
    CoreModule  ],
  /* providers: [AuthService], */
  bootstrap: [AppComponent]
})
export class AppModule { }
