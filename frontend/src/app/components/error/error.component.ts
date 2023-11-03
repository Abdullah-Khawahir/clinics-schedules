import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {
  @Input({ required: true }) error!: Observable<Error>;
  @Input({ required: false }) msg!: string;

  ngOnInit(): void {
    if (!this.msg)
      this.msg = "something went wrong"
  }


}

