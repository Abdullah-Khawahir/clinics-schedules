import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { API } from 'src/app/api.service';
import { ClinicDto } from 'src/app/dto/ClinicDto';
import { Column, RequestState } from 'src/app/models/interfaces';

@Component({
  selector: 'app-clinics-panel',
  templateUrl: './clinics-panel.component.html',
  styleUrls: ['./clinics-panel.component.css']
})
export class ClinicsPanelComponent implements OnInit, OnDestroy {
  clinicsList!: ClinicDto[]
  ColumnsDefinition!: Column[]
  tableState: RequestState = 'loading'
  unsubscribe$: Subject<void> = new Subject<void>();
  constructor(public api: API) { }

  ngOnInit(): void {
    this.api.clinicDataSource.getAll()
      .pipe(takeUntil(this.unsubscribe$))
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
  ngOnDestroy(): void {
    this.unsubscribe$.next()
    this.unsubscribe$.complete()
  }
}

