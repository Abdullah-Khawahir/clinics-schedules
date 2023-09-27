import { Component, OnInit } from '@angular/core';
import { API } from 'src/app/api.service';
import { Employee } from 'src/app/dto/employeeDto';
import { Column, RequestState } from 'src/app/models/interfaces';

@Component({
  selector: 'app-employees-panel',
  templateUrl: './employees-panel.component.html',
  styleUrls: ['./employees-panel.component.css']
})
export class EmployeesPanelComponent implements OnInit {
  employeeList!: Employee[]
  columnDefinition!: Column[]
  tableState: RequestState = 'loading'
  constructor(public api: API) { }
  ngOnInit(): void {
    this.api.getEmployees()
      .subscribe({
        complete: () => {
          this.tableState = 'complete'
        },
        error: (err) => {
          this.tableState = 'error'
        },
        next: (value) => {
          this.employeeList = value
        }
      })
      
    this.columnDefinition = [
      { key: "id", displayLabel: "ID" },
      { key: "englishName", displayLabel: "English Name" },
      { key: "arabicName", displayLabel: "Arabic Name" },
      { key: "email", displayLabel: "E-mail" },
      { key: "phoneNumber", displayLabel: "Phone NO." },
      { key: "secondPhoneNumber", displayLabel: "Second Phone NO." },
    ]

  }
}
