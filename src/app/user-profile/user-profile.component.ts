import { Component, OnInit, OnChanges } from '@angular/core';
import { AuthService } from '../core/auth.service';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit, OnChanges {

  /* auth:any = 'hello' */
  constructor(public auth: AuthService ) { 
 /*    this.auth.user.subscribe( (value: any ) => {
      console.log(value, 'the value from user profile')

        // do stuff with our data here.
        // ....
        // asign data to our class property in the end
        // so it will be available to our template
        
    }
      
    ) */
  }
  // log(val) { console.log(val); }

  ngOnInit() {
    
  }
  ngOnChanges() {
    console.log(this.auth)

  }

}
