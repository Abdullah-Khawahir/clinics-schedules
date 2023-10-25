import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable, catchError, ignoreElements, map, of } from 'rxjs';
import { API } from 'src/app/api.service';
import { BuildingDto } from 'src/app/dto/BuildingDto';
import { FormType, SelectInputOption } from 'src/app/models/interfaces';

@Component({
  selector: 'app-building-form',
  templateUrl: './building-form.component.html',
  styleUrls: ['./building-form.component.css', "../../styles/popup-form.css"]
})
export class BuildingFormComponent implements OnInit {

  @Output() shouldClose = new EventEmitter<boolean>()

  @Input({ required: false }) building!: BuildingDto;
  @Input({ required: true }) formType!: FormType;

  hospitalOptions$ = this.getHospitalsAsOptions();
  hospitalOptionsError$ = this.hospitalOptions$.pipe(
    ignoreElements(),
    catchError(err => of(new Error("cant fetch data")))
  )
  constructor(private api: API) { }

  ngOnInit(): void {
    if (!this.building)
      this.building = {
        id: -1,
        arabicName: "",
        englishName: "",
        hospitalId: -1,
        number: "" as unknown as number //  to keep it from appearing in the view number field  
      }
  }
  submit(formValue: any) {
    const building: BuildingDto = {
      id: this.building.id || -1,
      arabicName: formValue.arabicName,
      englishName: formValue.englishName,
      hospitalId: formValue.hospitalId,
      number: formValue.buildingNumber
    }


    if (this.formType == 'Create') {
      this.api.buildingDataSource.save(building)
        .subscribe({
          next: () => {
            this.close()
          },
          error: (err) => {
            console.log(err);
          },
        })
    }
    if (this.formType == "Update") {
      this.api.buildingDataSource.update(building.id, building)
        .subscribe({
          next: () => {
            this.close()
          },
          error: (err) => {
            console.log(err);
          },
        })
    }
  }

  getHospitalsAsOptions(): Observable<SelectInputOption[]> {
    return this.api.hospitalDataSource.getAll()
      .pipe(
        map(
          hospitalList => hospitalList
            .map(hospital => { return { value: hospital.id.toString(), name: `${hospital.id}: ${hospital.englishName}` } })
            .sort((a, b) => +a.value - +b.value)
        )
      )
  }
  close() {
    this.shouldClose.emit(true)
  }



}
