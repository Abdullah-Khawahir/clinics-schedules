import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, catchError, ignoreElements, of, takeUntil } from 'rxjs';
import { API } from 'src/app/api.service';
import { ClinicDto } from 'src/app/dto/ClinicDto';
import { Column, RequestState } from 'src/app/models/interfaces';

@Component({
  selector: 'app-clinics-panel',
  templateUrl: './clinics-panel.component.html',
  styleUrls: ['./clinics-panel.component.css']
})
export class ClinicsPanelComponent implements OnInit, OnDestroy {

  editFormClosed = true;
  clinicToEdit!: ClinicDto;


  remove = (clinic: ClinicDto) => {
    if (window.confirm(`are you sure you want to delete : ${clinic.englishName} ${clinic.number} `))
      this.api.clinicDataSource.delete(clinic.id)
        .subscribe(
        // { next: () => this.fetchAllClinics() }
      );
  }

  edit = (clinic: ClinicDto) => {
    this.clinicToEdit = clinic
    this.toggleEditForm()
  }


  clinicsList$ = this.api.clinicDataSource.getAll()
  clinicsListError$ = this.clinicsList$.pipe(
    ignoreElements(),
    catchError(err => of(new Error('cant connect to server')))
  );

  ColumnsDefinition!: Column[]
  tableState: RequestState = 'loading'
  unsubscribe$: Subject<void> = new Subject<void>();
  constructor(public api: API) { }

  ngOnInit(): void {
    // this.fetchAllClinics();
    this.ColumnsDefinition = [
      { key: "id", displayLabel: "ID" },
      { key: "englishName", displayLabel: "English Name" },
      { key: "arabicName", displayLabel: "Arabic Name" },
      { key: "number", displayLabel: "clinic number" },
      { key: "buildingId", displayLabel: "Building ID" },
      { key: "ext", displayLabel: "Ext." },

    ]
  }
  // private fetchAllClinics() {
  //   this.tableState = 'loading'
  //   this.api.clinicDataSource.getAll()
  //     .pipe(takeUntil(this.unsubscribe$))
  //     .subscribe({
  //       complete: () => {
  //         this.tableState = 'complete';
  //       },
  //       error: (err) => {
  //         this.tableState = 'error';
  //       },
  //       next: (value) => {
  //         this.clinicsList = value;
  //       }
  //     });
  // }

  toggleEditForm() {
    this.editFormClosed = !this.editFormClosed;
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next()
    this.unsubscribe$.complete()
  }

}

