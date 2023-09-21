import { Component, Input, OnInit } from '@angular/core';

interface InputField<T> {
  inputType: "text" | "number" | "email" | "radio" | "checkbox"
  label?: string
  inputBehavior: "typing" | "select"
  // make this option field to be in `object key to input` since it is common to all of them 
  required: boolean,

};
export interface ObjectKeyToInputField<T> {
  key: string,
  definition: InputField<T>
  options?: {
    data: T[]
    valueMapper: (item: T) => string | number
    viewMapper: (item: T) => string | number,

  }
};
@Component({
  selector: 'app-popup-form',
  templateUrl: './popup-form.component.html',
  styleUrls: ['./popup-form.component.css']
})
export class PopupFormComponent<T> implements OnInit {
  formInputObject: any;
  @Input({ required: true }) inputsDefinition!: ObjectKeyToInputField<T>[];
  @Input({ required: true }) onSubmit!: (formObject: any) => void


  ngOnInit(): void {
    for (let i = 0; i < this.inputsDefinition.length; i++) {
      const key = this.inputsDefinition[i].key;
      this.formInputObject = { ...this.formInputObject, [key]: null }
    }

  }


  submit(formData: any) {

    this.onSubmit(formData)
  }

}
