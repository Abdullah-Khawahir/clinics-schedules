import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { ObjectKeyToInputField } from './components/popup-form/popup-form.component';
import { UserDto } from './dto/userDto';
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}
const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(public http: HttpClient) { }
  title = 'clinics-schedules-frontend';
  input: ObjectKeyToInputField<UserDto>[] = [
    {
      key: 'username', definition: {
        inputBehavior: 'typing',
        inputType: 'text',
        label: "User name",
        required: true
      }
    }
    , {
      key: 'password', definition: {
        inputBehavior: 'typing',
        inputType: 'text',
        label: "Password",
        required: true
      }
    }
    , {
      key: 'email', definition: {
        inputBehavior: 'typing',
        inputType: 'text',
        label: "E-mail",
        required: true
      }
    }
    , {
      key: 'roles', definition: {
        inputBehavior: 'typing',
        inputType: 'text',
        label: "Role",
        required: true
      }
    }
  ]


  onSubmit(element: UserDto) {
    setInterval(() => console.log(window.location.hash) , 500)
    console.log("click");
    console.log(element);
    const header = new HttpHeaders()
    header.append("Authentication", "basic abdullah:4484")
    this.http.post<UserDto>(
      "127.0.0.1:8080/private/user",
      new UserDto({ ...element }), { headers: header }
    ).subscribe(response => console.log(response))
  }
}


