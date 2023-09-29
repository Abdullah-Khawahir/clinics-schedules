import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject, takeUntil } from 'rxjs';
import { API } from 'src/app/api.service';
import { BuildingDto } from 'src/app/dto/BuildingDto';
import { Column, RequestState } from 'src/app/models/interfaces';

@Component({
  selector: 'app-buildings-panel',
  templateUrl: './buildings-panel.component.html',
  styleUrls: ['./buildings-panel.component.css']
})
export class BuildingsPanelComponent implements OnInit, OnDestroy {



  buildings!: BuildingDto[]
  tableState: RequestState = 'loading'
  columnDefinition!: Column[];
  unsubscribe$: Subject<void> = new Subject<void>();
  constructor(public api: API) { }

  ngOnInit(): void {
    this.columnDefinition = [
      { key: "id", displayLabel: "ID" },
      { key: "arabicName", displayLabel: "Arabic Name" },
      { key: "englishName", displayLabel: "English Name" },
      { key: "hospitalId", displayLabel: "HospitalId" },
      { key: "number", displayLabel: "Clinic Number" },
    ]
    this.api.buildingDataSource.getAll()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        error: () => {
          this.tableState = 'error'
        },
        next: (value) => {
          this.buildings = value
        }
        , complete: () => {
          this.tableState = 'complete'
        }
      })

  }


  ngOnDestroy(): void {
    this.unsubscribe$.next()
    this.unsubscribe$.complete()
  }
}
