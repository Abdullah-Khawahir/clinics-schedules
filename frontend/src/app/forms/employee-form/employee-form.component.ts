import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { API } from 'src/app/api.service';
import { EmployeeDto } from 'src/app/dto/EmployeeDto';
import { FormType } from 'src/app/models/interfaces';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css', './../../styles/popup-form.css']
})
export class EmployeeFormComponent implements OnInit {
  @Output() shouldClose = new EventEmitter()

  @Input({ required: false }) employee!: EmployeeDto;
  @Input({ required: true }) formType!: FormType;

  constructor(private api: API) { }
  ngOnInit() {
    if (this.employee == undefined) {
      this.employee = {
        id: -1,
        arabicName: "",
        englishName: "",
        email: "",
        phoneNumber: "",
        secondPhoneNumber: "",
      }
    }
  }

  submit(formValue: any) {
    const employee: EmployeeDto = {
      id: this.formType == 'Create' ? -1 : this.employee.id,
      arabicName: formValue.arabicName,
      englishName: formValue.englishName,
      email: formValue.email || "",
      phoneNumber: formValue.phoneNumber || "",
      secondPhoneNumber: formValue.secondPhoneNumber || "",
    }
    console.log(employee);

    if (this.formType == 'Create') {
      this.api.employeeDataSource
        .save(employee)
        .subscribe(
          {
            next: (value) => {
              this.close()
            },
            error: (err) => {
              console.log(err);
            }
          }
        )
    }
    if (this.formType == 'Update') {
      this.api.employeeDataSource.update(this.employee.id, employee)
        .subscribe(
          {
            next: (value) => {
              this.close()
            },
            error: (err) => {
              console.log(err);
            }
          }
        )
    }

  }
  close() {
    this.shouldClose.emit(true)
  }

}
