import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
// import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';
import { AuthService } from './core/auth.service';
import { LessonService } from './lesson/lesson.service';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LessonNavigatorComponent } from './lesson-navigator/lesson-navigator.component';
import { LessonComponent } from './lesson/lesson.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CoreModule } from './core/core.module';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
// import {MatButtonModule, MatCheckboxModule} from '@angular/material';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LogoutComponent } from './logout/logout.component';
import { AuthGuard } from './core/auth.guard';
import { MultipleChoiceComponent } from './lesson/multiple-choice/multiple-choice.component';
import { HttpClientModule } from '@angular/common/http';
import { RecordingComponent } from './lesson/recording/recording.component';
import { UploadFileService } from './shared/services/upload-file.service';
import { ManageLessonCategoriesService } from './shared/services/manage-lesson-categories.service';
import { UploadFile } from './shared/models/upload-file';
// import { environment } from ''


// tslint:disable-next-line:import-spacing
// @import '~@angular/material/prebuilt-themes/indigo-pink.css';

const appRoutes: Routes = [
  {path: '', component: LandingPageComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignUpComponent },
  {path: 'user-profile', component: UserProfileComponent },
  {path: 'lessons', component: LessonNavigatorComponent},
  {path: 'logout', component: LogoutComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignUpComponent,
    LandingPageComponent,
    LessonNavigatorComponent,
    LessonComponent,
    NavbarComponent,
    UserProfileComponent,
    LogoutComponent,
    MultipleChoiceComponent,
    RecordingComponent,
    // UploadFile
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebase, 'academy-dev'),
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    FormsModule,
    // MatButtonModule,
    // MatCheckboxModule,
    // BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    // AngularFireAuthModule,
    BrowserModule,
    CoreModule  ],
  providers: [AuthService, AuthGuard, LessonService, UploadFileService, ManageLessonCategoriesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
