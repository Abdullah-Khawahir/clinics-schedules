import { Component, OnInit } from '@angular/core';
import { API } from 'src/app/api.service';
import { ClinicDto } from 'src/app/dto/ClinicDto';
import { Column, RequestState } from 'src/app/models/interfaces';

@Component({
  selector: 'app-clinics-panel',
  templateUrl: './clinics-panel.component.html',
  styleUrls: ['./clinics-panel.component.css']
})
export class ClinicsPanelComponent implements OnInit {
  clinicsList!: ClinicDto[]
  ColumnsDefinition!: Column[]
  tableState: RequestState = 'loading'
  constructor(public api: API) { }
  ngOnInit(): void {
    this.api.getClinics()
      .subscribe({
        complete: () => {
          this.tableState = 'complete'
        },
        error: (err) => {
          this.tableState = 'error'
        },
        next: (value) => {
          this.clinicsList = value
        }
      })
    this.ColumnsDefinition = [
      { key: "id", displayLabel: "ID" },
      { key: "englishName", displayLabel: "English Name" },
      { key: "arabicName", displayLabel: "Arabic Name" },
      { key: "number", displayLabel: "clinic number" },
      { key: "buildingId", displayLabel: "Building ID" },

    ]
  }
}
