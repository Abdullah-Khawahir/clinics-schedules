import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Column } from 'src/app/models/interfaces';

const NUM_REGEX = /^\d+$/
type SortDirection = 'ASC' | "DES"
type SortColumn = {
  key: string,
  direction: SortDirection
}
@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent<T> implements OnInit {

  @Input({ alias: "data-list", required: true })
  dataArray!: T[];

  @Input({ alias: "columns-definition", required: true })
  ColumnsDefinition!: Column[];

  @Input({ alias: "edit-action", required: true })
  editAction!: ((target: T) => void) 

  @Input({ alias: "remove-action", required: true })
  removeAction!: ((target: T) => void) 

  columnsFilters = new Map<string, string>()
  viewList!: T[];
  filter: string = "";

  @Input({ alias: "sort-key", required: false }) sortingColumn!: SortColumn;


  ngOnInit() {
    this.viewList = this.dataArray

    if (!this.sortingColumn) {
      this.sortingColumn = { key: this.ColumnsDefinition[0].key, direction: 'ASC' }
    }
  }


  sortBy(column: Column) {
    if (this.sortingColumn.key == column.key) {
      this.switchSortDirection(this.sortingColumn.direction);
    } else {
      this.sortingColumn = { key: column.key, direction: 'ASC' }
    }

    console.log(this.sortingColumn);

  }

  switchSortDirection(direction: SortDirection) {
    if (direction == 'ASC') {
      this.sortingColumn.direction = 'DES'
    } else {
      this.sortingColumn.direction = 'ASC'
    }
  }

  getData(): any[] {
    return this.viewList.sort((a, b) => this.sorterFunction(a, b))
  }

  sorterFunction(a: any, b: any) {
    const column = this.sortingColumn;
    if (column?.key == undefined) return 0;

    const v1 = a[column?.key].toString().trim()
    const v2 = b[column?.key].toString().trim()

    if (NUM_REGEX.test(v1) && NUM_REGEX.test(v2)) {

      switch (this.sortingColumn?.direction) {
        case "ASC": return v1 - v2
        case "DES": return v1 + v2
      }
    } else {

      switch (this.sortingColumn?.direction) {
        case "ASC": return (v1.toString() as string).localeCompare(v2)
        case "DES": return (v2.toString() as string).localeCompare(v1)
      }
    }


    return 0
  }



  filterPredicate(itemInList: any, input: string, objectKey: string) {
    this.columnsFilters.set(objectKey, input)

    for (let [key, value] of this.columnsFilters.entries()) {
      const columnValue = JSON.stringify(itemInList[key]).toLowerCase();
      const currentFilter = value.toLowerCase();

      if (columnValue.match(currentFilter) == null) {
        return false
      }
    }
    return true;
  }




  filterList(event: Event, objectKey: string) {
    let input = (event.target as HTMLInputElement).value.trim()
    this.viewList = this.dataArray?.filter((item: T) => this.filterPredicate(item, input, objectKey))
  }

  getAllLabels() {
    return this.ColumnsDefinition.map(column => column.displayLabel)
  }

}
