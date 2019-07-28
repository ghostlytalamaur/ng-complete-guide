import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validator, ValidatorFn, Validators} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  form: FormGroup;

  ngOnInit(): void {
    this.form = new FormGroup({
      'projectName': new FormControl(null, [Validators.required, this.forbiddenNames('Test')]),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'projectStatus': new FormControl('stable', Validators.required)
    });
  }

  forbiddenNames(...names: string[]): ValidatorFn {
    return (control) => {
      if (names.indexOf(control.value) >= 0) {
        return {'isForbiddenName': true};
      }
      return null;
    };
  }

  onSubmit() {
    console.log(this.form.value);
  }
}
