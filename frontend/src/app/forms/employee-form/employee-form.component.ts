import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { API } from 'src/app/api.service';
import { EmployeeDto } from 'src/app/dto/EmployeeDto';
import { FormType } from 'src/app/models/interfaces';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css', './../../styles/popup-form.css']
})
export class EmployeeFormComponent implements OnInit, OnDestroy {
  @Output() shouldClose = new EventEmitter()
  unsubscribe$ = new Subject<void>()

  @Input({ required: false }) employee!: EmployeeDto;
  @Input({ required: true }) formType!: FormType;

  constructor(private api: API) { }

  ngOnInit() {

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
    if (this.formType == 'Create') {
      this.api.employeeDataSource.save(employee)
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
  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete()

  }
}
