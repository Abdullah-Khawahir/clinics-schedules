import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject, map, takeUntil } from 'rxjs';
import { API } from 'src/app/api.service';
import { ClinicDto } from 'src/app/dto/ClinicDto';
import { FormType, SelectInputOption } from 'src/app/models/interfaces';

@Component({
  selector: 'app-clinic-form',
  templateUrl: './clinic-form.component.html',
  styleUrls: ['./clinic-form.component.css', "./../../styles/popup-form.css"]
})
export class ClinicFormComponent implements OnInit, OnDestroy {

  @Output() shouldClose = new EventEmitter<boolean>(false)

  @Input({ required: false }) clinic!: ClinicDto;
  @Input({ required: true }) formType!: FormType;

  allBuildingsAsOptions!: SelectInputOption[];
  unsubscribe$ = new Subject<void>();

  constructor(private api: API) { }

  ngOnInit(): void {
    console.log(this.clinic);

    this.api.buildingDataSource
      .getAll()
      .pipe(
        takeUntil(this.unsubscribe$),
        map(buildings => buildings.map(building => { return { name: `${building.id}: ${building.englishName} ${building.number}`, value: building.id.toString() } })))
      .subscribe((value) => this.allBuildingsAsOptions = value)

  }
  submit(formValue: any) {
    const buildingIdElement = (document.getElementById('building-select') as HTMLSelectElement)

    const clinic: ClinicDto = {
      id: this.clinic.id,
      arabicName: formValue.arabicName,
      englishName: formValue.englishName,
      buildingId: Number.parseInt(buildingIdElement.value),
      ext: formValue.ext,
      number: formValue.number
    }

    console.log(clinic);

    if (this.formType == 'Create') {
      this.api.clinicDataSource.save(clinic)
        .subscribe({ next: () => this.close() })
    }

    if (this.formType == 'Update') {
      this.api.clinicDataSource.update(this.clinic.id, clinic)
        .subscribe({ next: () => this.close() })

    }

  }



  close() {
    this.shouldClose.emit(true)
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next()
    this.unsubscribe$.complete()
  }

}
