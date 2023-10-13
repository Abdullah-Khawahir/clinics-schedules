import { Component, Input, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-edit-action',
  templateUrl: './edit-action.component.html',
  styleUrls: ['./edit-action.component.css']
})
export class EditActionComponent<T> {
  @Input({ alias: 'target', required: true }) target!: T
  @Input({ alias: 'editAction', required: true }) editAction!: (target: T) => (void)
  @Input({ alias: 'buttonContent', required: true }) content!: TemplateRef<any>

  onClick() {
    this.editAction(this.target)
  }
}
