import { Component, OnInit } from '@angular/core';
import { API } from '../api.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  state: "loading" | "error" | "complete" = 'loading'
  errorMessage: string | undefined;
  data: number[] | undefined;


  constructor(private api: API) {

  }

  isLoading() {
    return this.state = 'loading'
  }

  isError() {
    return this.state = 'error'
  }
  isComplete() {
    return this.state = 'complete'
  }

  setData(newData: number[]) {
    this.data = newData
  }
  ngOnInit(): void {
    this.api.getTest().subscribe({
      next: (value) => { this.data = value },
      error: (error) => {
        console.log(error);
        this.state = 'error'
        this.errorMessage = `${JSON.stringify(error)}`;
      },
      complete: () => { this.state = 'complete' },
    })
  }

  onError(error: any) {


  }




}
