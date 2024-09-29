import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ButtonDirective } from 'src/app/directives/button/button.directive';

@Component({
  selector: 'app-list-tasks',
  standalone: true,
  imports: [
    CommonModule,
    ButtonDirective,
  ],
  templateUrl: './list-tasks.component.html',
  styleUrls: ['./list-tasks.component.scss']
})
export class ListTasksComponent {

}
