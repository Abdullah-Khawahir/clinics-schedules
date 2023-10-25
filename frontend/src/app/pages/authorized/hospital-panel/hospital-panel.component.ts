import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, catchError, ignoreElements, of, retry, takeUntil, takeWhile, tap } from 'rxjs';
import { API } from 'src/app/api.service';
import { HospitalDto } from 'src/app/dto/HospitalDto';
import { Column, RequestState } from 'src/app/models/interfaces';

@Component({
  selector: 'app-hospital-panel',
  templateUrl: './hospital-panel.component.html',
  styleUrls: ['./hospital-panel.component.css']
})
export class HospitalPanelComponent implements OnInit {

  editFormClosed = true
  hospitalToEdit!: HospitalDto;
  columnsDefinition!: Column[];

  hospitalsList$ = this.api.hospitalDataSource
    .getAll()
    .pipe(retry(1))
  hospitalsListError$ = this.hospitalsList$
    .pipe(
      ignoreElements(),
      catchError(err => of(err))
    )


  edit = (hospital: HospitalDto) => {
    this.hospitalToEdit = hospital
    this.toggleEditForm()
  }

  remove = (hospital: HospitalDto) => {
    if (window.confirm(`are you sure you want to delete ${hospital.englishName} hospital`))
      this.api.hospitalDataSource
        .delete(hospital.id).subscribe()
  }
  constructor(public api: API) { }

  ngOnInit() {
    this.columnsDefinition = [
      { key: 'id', displayLabel: "ID" },
      { key: 'englishName', displayLabel: "English Name" },
      { key: 'arabicName', displayLabel: "Arabic Name" },
    ]
    // this.fetchAllHospitals();
  }

  // private fetchAllHospitals() {
  //   this.tableState = 'loading'
  //   this.api.hospitalDataSource.getAll()
  //     .pipe(takeUntil(this.unsubscribe$))
  //     .subscribe(
  //       {
  //         complete: () => {
  //           this.tableState = 'complete';
  //         },
  //         error: (err) => {
  //           this.tableState = 'error';
  //         },
  //         next: (value) => {
  //           this.hospitalsList = value;
  //         },
  //       }
  //     );
  // }

  // ngOnDestroy(): void {
  //   this.unsubscribe$.next()
  //   this.unsubscribe$.complete()
  // }

  toggleEditForm() {
    this.editFormClosed = !this.editFormClosed;

  }


}
