import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable, catchError, ignoreElements, map, of } from 'rxjs';
import { API } from 'src/app/api.service';
import { ClinicDto } from 'src/app/dto/ClinicDto';
import { FormType, SelectInputOption } from 'src/app/models/interfaces';
import { NotifierService } from 'src/app/notifier.service';

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

  constructor(private api: API, public notifier: NotifierService) { }

  ngOnInit(): void {
    if (!this.clinic) {
      this.clinic = {
        id: -1,
        // arabicName: "",
        englishName: "",
        buildingId: "" as unknown as number,
        buildingName: undefined,
        ext: "",
        number: "" as unknown as number,
        note: ""
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
      // arabicName: formValue.arabicName,
      englishName: formValue.englishName,
      buildingId: Number.parseInt(buildingIdElement.value),
      buildingName: undefined,
      ext: formValue.ext,
      number: formValue.number,
      note: formValue.note
    }


    if (this.formType == 'Create') {
      this.api.clinicDataSource.save(clinic)
        .subscribe({ ... this.notifier.submitResponse({ completeLog: "complete" }) })
    }

    if (this.formType == 'Update') {
      this.api.clinicDataSource.update(this.clinic.id, clinic)
        .subscribe({ ... this.notifier.submitResponse({ completeLog: "complete" }) })
    }

  }



  close() {
    this.shouldClose.emit(true)
  }



}
