import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Column } from 'src/app/models/interfaces';

const DELIMITER = "\x01";

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent implements AfterViewInit, OnInit {


  @Input({ alias: "data-list", required: true }) dataArray!: any[] | null;
  @Input({ alias: "columns-definition", required: true }) ColumnsDefinition!: Column[];

  elementsArray = new MatTableDataSource();
  elementsFilters = new Map<string, string>()
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.elementsArray.sort = this.sort;
  }

  ngOnInit() {

    this.elementsArray.data = this.dataArray || []
    this.elementsArray.filterPredicate = (dataInList: any, targetKeyAndInput: string) => {
      let [keyTarget, input] = targetKeyAndInput.split(DELIMITER)
      this.elementsFilters.set(keyTarget, input)

      for (let [key, value] of this.elementsFilters.entries()) {
        const columnValue = JSON.stringify(dataInList[key]).toLowerCase();
        const currentFilter = value.toLowerCase();

        if (columnValue.match(currentFilter) == null) {
          return false
        }
      }
      return true;
    }
  }
  getAllKeys() {
    return this.ColumnsDefinition.map(column => column.key)
  }
  getAllLabels() {
    return this.ColumnsDefinition.map(column => column.displayLabel)
  }
  filterList(event: Event, keyTarget: string) {
    let input = (event.target as HTMLInputElement).value.trim()
    this.elementsArray.filter = [keyTarget, input].join(DELIMITER)
  }


  editAction(dataObject: any) {

  }
  deleteAction() {

  }
  addAction() {

  }

  dependencyAddAction() {

  }

}
