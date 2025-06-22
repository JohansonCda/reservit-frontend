import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { SpaceService, Space } from '../../core/services/space.service';
import { TypeService, Type } from '../../core/services/type.service';

@Component({
  selector: 'app-space-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatOptionModule
  ],
  templateUrl: './space-form.component.html',
})
export class SpaceFormComponent implements OnInit {
  @Input() space: Partial<Space> = {};
  @Input() isEdit = false;

  availableTypes: Type[] = [];

  constructor(
    private spaceService: SpaceService,
    private typeService: TypeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.typeService.getTypes().subscribe({
      next: (res) => this.availableTypes = res.member,
      error: () => console.warn('No se pudieron cargar los tipos')
    });

    if (!this.space.photos) {
      this.space.photos = [''];
    }
  }

  onSubmit() {
    if (this.isEdit && !this.space.id) {
      console.error('No se puede actualizar: falta el ID');
      return;
    }

    const payload: Partial<Space> = {
      ...this.space,
      pricePerHour: String(this.space.pricePerHour),
      isAvailable: this.space.isAvailable ?? true,
      photos: this.space.photos ?? [],
    };

    const saveOperation = this.isEdit
      ? this.spaceService.updateSpace(this.space.id!, this.space)
      : this.spaceService.createSpace(payload);

    saveOperation.subscribe(() => {
      this.router.navigate(['/admin/spaces']);
    });
  }

  goBack() {
    this.router.navigate(['/admin/spaces']);
  }

  addPhotoField() {
    this.space.photos!.push('');
  }

  removePhotoField(index: number) {
    this.space.photos!.splice(index, 1);
  }
}
