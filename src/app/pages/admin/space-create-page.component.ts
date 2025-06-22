import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpaceFormComponent } from './space-form.component';
import { Space } from '../../core/services/space.service';

@Component({
  standalone: true,
  imports: [CommonModule, SpaceFormComponent],
  templateUrl: './space-create-page.component.html',
})
export class SpaceCreatePageComponent {
  space: Partial<Space> = {};
}
