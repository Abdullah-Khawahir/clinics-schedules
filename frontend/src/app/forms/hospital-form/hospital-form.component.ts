import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import { API } from 'src/app/api.service';
import { HospitalDto } from 'src/app/dto/HospitalDto';
import { FormType } from 'src/app/models/interfaces';
@Component({
  selector: 'app-hospital-form',
  templateUrl: './hospital-form.component.html',
  styleUrls: ['./hospital-form.component.css',
    './../../styles/popup-form.css']
})
export class HospitalFormComponent implements OnInit, OnDestroy {


  @Output() closeEvent = new EventEmitter<void>();
  @Input({ required: true }) formType!: FormType
  @Input({ required: false }) hospital!: HospitalDto

  unsubscribe$ = new Subject<void>();
  constructor(private api: API) { }


  ngOnInit(): void {
    if (this.formType == 'Create') {
      this.hospital = { id: -1, arabicName: "", englishName: "" }
    }
  }


  close(): void {
    this.closeEvent.emit()
  }

  submit(formValue: any) {

    const hospital: HospitalDto = {
      id: this.hospital.id,
      arabicName: formValue.arabicName,
      englishName: formValue.englishName,
    }



    if (this.formType == 'Create') {
      this.api.hospitalDataSource.save(hospital)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe({ next: (newHospital) => this.afterSubmit(newHospital) })
    }
    if (this.formType == 'Update') {
      this.api.hospitalDataSource.update(hospital.id, hospital)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe({ next: (newHospital) => this.afterSubmit(newHospital) })
    }


  }
  afterSubmit(value: any) {
    this.close()
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next()
    this.unsubscribe$.complete()

  }
}
