import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Subject, catchError, ignoreElements, of, retry, switchMap } from 'rxjs';
import { API } from 'src/app/api.service';
import { HospitalDto } from 'src/app/dto/HospitalDto';
import { Column } from 'src/app/models/interfaces';
import { NotifierService } from 'src/app/notifier.service';

@Component({
  selector: 'app-hospital-panel',
  templateUrl: './hospital-panel.component.html',
  styleUrls: ['./hospital-panel.component.css']
})
export class HospitalPanelComponent implements OnInit {
  editFormClosed = true
  event$ = new BehaviorSubject(true)
  hospitalToEdit!: HospitalDto;
  columnsDefinition!: Column[];

  hospitalsList$ = this.event$
    .pipe(
      switchMap(() => this.api.hospitalDataSource
        .getAll()
        .pipe(retry(1))
      )
    )

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
    this.notifier.confirm(`are you sure you want to delete: ${hospital.englishName} hospital`,
      () => this.api.hospitalDataSource.delete(hospital.id).subscribe({ ... this.notifier.submitResponse() }))
  }
  constructor(public api: API, public notifier: NotifierService) { }

  ngOnInit() {
    this.columnsDefinition = [
      { key: 'id', displayLabel: "ID" },
      { key: 'englishName', displayLabel: "Name" },
      // { key: 'arabicName', displayLabel: "Arabic Name" },
    ]
  }


  toggleEditForm() {
    this.editFormClosed = !this.editFormClosed;

  }


}
