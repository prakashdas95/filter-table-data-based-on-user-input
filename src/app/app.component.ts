import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { combineLatest } from 'rxjs';

import { startWith } from 'rxjs/operators';

export interface FORM {
  firstName: string;
  lastName: string;
  company: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  displayedColumns: string[] = ['firstName', 'lastName', 'company'];
  dataSource;
  TABLEDATA: FORM[] = [
    { firstName: 'prakash', lastName: 'das', company: 'abc' },
    { firstName: 'prakash', lastName: 'das', company: 'hhh' },
    { firstName: 'rahul', lastName: 'das', company: 'abc' },
    { firstName: 'hhhh', lastName: 'das', company: 'abc' },
    { firstName: 'suraj', lastName: 'sharma', company: 'abc' },
    { firstName: 'prince', lastName: 'das', company: 'abc' },
  ];


  contactform: FormGroup;

  disable: any;
  FIRSTNAME: any;
  LASTNAME: any;
  COMPANY: any;

  constructor() { }

  ngOnInit() {
    this.contactform = new FormGroup({
      firstName: new FormControl(null),
      lastName: new FormControl(null),
      company: new FormControl(null),
    });

    combineLatest([
      this.contactform.get("firstName").valueChanges.pipe(startWith('')),
      this.contactform.get("lastName").valueChanges.pipe(startWith('')),
      this.contactform.get("company").valueChanges.pipe(startWith(''))
    ]).subscribe((value) => {
      const [FN, LN, COM] = value;
      let data = this.TABLEDATA;

      if (FN) {
        data = data.filter(item => item.firstName.startsWith(FN));
      }
      if (LN) {
        data = data.filter(item => item.lastName.startsWith(LN));
      }
      if (COM) {
        data = data.filter(item => item.company.startsWith(COM));
      }

      this.dataSource = data;
      console.log("filter data", data);

    });

    this.dataSource = this.TABLEDATA;
  }
}