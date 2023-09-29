import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { API } from 'src/app/api.service';
import { HospitalDto } from 'src/app/dto/HospitalDto';
import { Column, RequestState } from 'src/app/models/interfaces';

@Component({
  selector: 'app-hospital-panel',
  templateUrl: './hospital-panel.component.html',
  styleUrls: ['./hospital-panel.component.css']
})
export class HospitalPanelComponent implements OnInit, OnDestroy {
  columnsDefinition!: Column[];
  hospitalsList!: HospitalDto[]
  tableState: RequestState = 'loading';
  unsubscribe$: Subject<void> = new Subject<void>();

  constructor(public api: API) { }

  ngOnInit() {
    this.columnsDefinition = [
      { key: 'id', displayLabel: "ID" },
      { key: 'englishName', displayLabel: "English Name" },
      { key: 'arabicName', displayLabel: "Arabic Name" },
    ]
    this.api.hospitalDataSource.getAll()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        {
          complete: () => {
            this.tableState = 'complete'
          },
          error: (err) => {
            this.tableState = 'error'
          },
          next: (value) => {
            this.hospitalsList = value
          },
        }
      )
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next()
    this.unsubscribe$.complete()
  }
}
