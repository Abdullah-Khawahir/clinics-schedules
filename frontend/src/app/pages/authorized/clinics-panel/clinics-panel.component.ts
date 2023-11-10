import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, catchError, ignoreElements, of, takeUntil } from 'rxjs';
import { API } from 'src/app/api.service';
import { ClinicDto } from 'src/app/dto/ClinicDto';
import { Column, RequestState } from 'src/app/models/interfaces';
import { NotifierService } from 'src/app/notifier.service';

@Component({
  selector: 'app-clinics-panel',
  templateUrl: './clinics-panel.component.html',
  styleUrls: ['./clinics-panel.component.css']
})
export class ClinicsPanelComponent implements OnInit, OnDestroy {

  editFormClosed = true;
  clinicToEdit!: ClinicDto;


  remove = (clinic: ClinicDto) => {
    this.notifier.confirm(`are you sure you want to delete : ${clinic.englishName} ${clinic.number} `,
      () => this.api.clinicDataSource.delete(clinic.id).subscribe({ ... this.notifier.submitResponse() }))
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
  unsubscribe$: Subject<void> = new Subject<void>();
  constructor(public api: API, public notifier: NotifierService) { }

  ngOnInit(): void {
    // this.fetchAllClinics();
    this.ColumnsDefinition = [
      { key: "id", displayLabel: "ID" },
      { key: "englishName", displayLabel: "Name" },
      // { key: "arabicName", displayLabel: "Arabic Name" },
      { key: "number", displayLabel: "clinic number" },
      { key: "buildingId", displayLabel: "Building ID" },
      { key: "ext", displayLabel: "Ext." },

    ]
  }

  toggleEditForm() {
    this.editFormClosed = !this.editFormClosed;
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next()
    this.unsubscribe$.complete()
  }

}

