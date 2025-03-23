import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-forms',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './forms.component.html',
  styleUrl: './forms.component.scss'
})
export class FormsComponent {
  public myForm = new FormGroup({
    login: new FormControl('' , Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  })

  handlerValue() {
    if(this.myForm.valid) {
      console.log(this.myForm.valid);
    } else {
      alert('this form invalid');
    }
    console.log(this.myForm.get(['login'])?.value);
  }
}
