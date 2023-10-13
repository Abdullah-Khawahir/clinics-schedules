import { Component, Input, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-remove-action',
  templateUrl: './remove-action.component.html',
  styleUrls: ['./remove-action.component.css']
})
export class RemoveActionComponent<T> {
  @Input({ alias: 'target', required: true }) target!: T
  @Input({ alias: 'removeAction', required: true }) removeAction!: (target: T) => (void)
  @Input({ alias: 'buttonContent', required: true }) content!: TemplateRef<any>

  onClick() {
    this.removeAction(this.target)
  }
}
