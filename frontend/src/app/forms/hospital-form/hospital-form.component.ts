import { Component, Input, OnInit } from '@angular/core';
@Component({
  selector: 'app-hospital-form',
  templateUrl: './hospital-form.component.html',
  styleUrls: ['./hospital-form.component.css',
    './../../styles/popup-form.css']
})
export class HospitalFormComponent implements OnInit {




  @Input({ required: false }) arabicName!: string;
  @Input({ required: false }) englishName!: string;



  submit(formValue: any) {
    
  }

  ngOnInit(): void {
    this.arabicName = this.arabicName || ""
    this.englishName = this.englishName || ""
  }
}
