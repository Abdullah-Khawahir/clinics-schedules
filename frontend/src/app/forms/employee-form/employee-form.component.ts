import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { API } from 'src/app/api.service';
import { EmployeeDto } from 'src/app/dto/EmployeeDto';
import { FormType } from 'src/app/models/interfaces';
import { NotifierService } from 'src/app/notifier.service';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css', './../../styles/popup-form.css']
})
export class EmployeeFormComponent implements OnInit {
  @Output() shouldClose = new EventEmitter()

  @Input({ required: false }) employee!: EmployeeDto;
  @Input({ required: true }) formType!: FormType;

  constructor(private api: API, public notifier: NotifierService) { }
  ngOnInit() {
    if (this.employee == undefined) {
      this.employee = {
        id: -1,
        // arabicName: "",
        englishName: "",
        specialty: "",
      }
    }
  }

  submit(formValue: any) {
    const employee: EmployeeDto = {
      id: this.formType == 'Create' ? -1 : this.employee.id,
      // arabicName: formValue.arabicName,
      englishName: formValue.englishName,
      specialty: formValue.specialty
    }
    console.log(employee);

    if (this.formType == 'Create') {
      this.api.employeeDataSource
        .save(employee)
        .subscribe(
          { ...this.notifier.submitResponse() }
        )
    }
    if (this.formType == 'Update') {
      this.api.employeeDataSource.update(this.employee.id, employee)
        .subscribe(
          { ...this.notifier.submitResponse() }
        )
    }

  }
  close() {
    this.shouldClose.emit(true)
  }

}
