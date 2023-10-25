import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, catchError, ignoreElements, of, take, takeUntil } from 'rxjs';
import { API } from 'src/app/api.service';
import { BuildingDto } from 'src/app/dto/BuildingDto';
import { Column, RequestState } from 'src/app/models/interfaces';

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
    if (window.confirm(`are you sure you want to delete building : ${building.englishName} ${building.number} `))
      this.api.buildingDataSource.delete(building.id)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe({ next: console.log })
  }
  edit = (building: BuildingDto) => {
    this.buildingToEdit = building
    this.toggleClose()
  }
  constructor(public api: API) { }

  ngOnInit(): void {
    this.columnDefinition = [
      { key: "id", displayLabel: "ID" },
      { key: "arabicName", displayLabel: "Arabic Name" },
      { key: "englishName", displayLabel: "English Name" },
      { key: "hospitalId", displayLabel: "HospitalId" },
      { key: "number", displayLabel: "Clinic Number" },
    ]

  }


  ngOnDestroy(): void {
    this.unsubscribe$.next()
    this.unsubscribe$.complete()
  }


}
