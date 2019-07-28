import {Component, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  genders = ['male', 'female'];
  form: FormGroup;
  forbiddenUserNames = ['Chris', 'Anna'];

  ngOnInit() {
    this.form = new FormGroup({
      'userData': new FormGroup({
        'username': new FormControl(null,[Validators.required, this.forbiddenNames.bind(this)]),
        'email': new FormControl(null, [Validators.required, Validators.email], this.forbiddenEmails),
      }),
      'gender': new FormControl('male'),
      'hobbies': new FormArray([])
    });
    this.form.valueChanges.subscribe(console.log);
    this.form.statusChanges.subscribe(console.log);
    this.form.setValue({
      'userData': {
        'username': 'Crow',
        'email': 'mail@net.com'
      },
      'gender': 'male',
      'hobbies': []
    });
  }

  onSubmit() {
    console.log(this.form);
  }

  onAddHobby() {
    const control = new FormControl(null, Validators.required);
    (this.form.get('hobbies') as FormArray).push(control);
  }

  get hobbiesControls() {
    return <FormArray>this.form.get('hobbies');
  }

  forbiddenNames(control: FormControl): {[key: string]: boolean} {
    if (this.forbiddenUserNames.indexOf(control.value) >= 0) {
      return {nameIsForbidden: true};
    }
    return null;
  }

  forbiddenEmails(control: FormControl): Promise<any> | Observable<any> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'test@test.com') {
          resolve({'emailIsForbidden': true});
        } else {
          resolve(null);
        }
      }, 1500);
    });
  }
}
