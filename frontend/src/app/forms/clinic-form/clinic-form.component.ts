import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Observable, Subject, catchError, ignoreElements, map, of, takeUntil } from 'rxjs';
import { API } from 'src/app/api.service';
import { ClinicDto } from 'src/app/dto/ClinicDto';
import { FormType, SelectInputOption } from 'src/app/models/interfaces';

@Component({
  selector: 'app-clinic-form',
  templateUrl: './clinic-form.component.html',
  styleUrls: ['./clinic-form.component.css', "./../../styles/popup-form.css"]
})
export class ClinicFormComponent implements OnInit {

  @Output() shouldClose = new EventEmitter<boolean>(false)

  @Input({ required: false }) clinic!: ClinicDto;
  @Input({ required: true }) formType!: FormType;


  allBuildingsAsOptions$ = this.getBuildingsAsOptions()
  allBuildingsAsOptionsError$ = this.allBuildingsAsOptions$
    .pipe(ignoreElements(),
      catchError(err => of(new Error("cant fetch data"))))

  constructor(private api: API) { }

  ngOnInit(): void {
    if (!this.clinic) {
      this.clinic = {
        id: -1,
        arabicName: "",
        englishName: "",
        buildingId: "" as unknown as number,
        ext: "",
        number: "" as unknown as number
      }

    }


  }
  getBuildingsAsOptions(): Observable<SelectInputOption[]> {
    return this.api.buildingDataSource
      .getAll()
      .pipe(
        map(buildings => buildings.map(building => {
          return {
            name: `${building.id}: ${building.englishName} ${building.number}`,
            value: building.id.toString()
          }
        }
        )))
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



}
