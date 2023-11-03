import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, catchError, ignoreElements, of, take, takeUntil } from 'rxjs';
import { API } from 'src/app/api.service';
import { BuildingDto } from 'src/app/dto/BuildingDto';
import { HospitalDto } from 'src/app/dto/HospitalDto';
import { Column, RequestState } from 'src/app/models/interfaces';
import { NotifierService } from 'src/app/notifier.service';

@Component({
  selector: 'app-buildings-panel',
  templateUrl: './buildings-panel.component.html',
  styleUrls: ['./buildings-panel.component.css']
})
export class BuildingsPanelComponent implements OnInit, OnDestroy {
  editFormClosed = true;
  buildingToEdit!: BuildingDto;


  toggleClose() {
    this.editFormClosed = !this.editFormClosed
  }



  buildings$ = this.api.buildingDataSource.getAll()
  buildingsError$ = this.buildings$.pipe(
    ignoreElements(),
    catchError(err => of(new Error('cant connect to server')))
  )

  columnDefinition!: Column[];
  unsubscribe$: Subject<void> = new Subject<void>();


  remove = (building: BuildingDto) => {
    this.notifier.confirm(`are you sure you want to delete building : ${building.englishName} of number ${building.number} `,
      () => this.api.buildingDataSource.delete(building.id)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe({ ... this.notifier.submitResponse() }))
  }
  edit = (building: BuildingDto) => {
    this.buildingToEdit = building
    this.toggleClose()
  }
  constructor(public api: API, public notifier: NotifierService) { }

  ngOnInit(): void {
    this.columnDefinition = [
      { key: "id", displayLabel: "ID" },
      { key: "arabicName", displayLabel: "Arabic Name" },
      { key: "englishName", displayLabel: "English Name" },
      { key: "hospitalId", displayLabel: "Hospital Id" },
      { key: "number", displayLabel: "Clinic Number" },
    ]

  }


  ngOnDestroy(): void {
    this.unsubscribe$.next()
    this.unsubscribe$.complete()
  }


}
