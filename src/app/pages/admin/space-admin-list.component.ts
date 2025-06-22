import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Router, RouterModule } from '@angular/router';
import { SpaceService, Space } from '../../core/services/space.service';

@Component({
  selector: 'app-space-admin-list',
  standalone: true,
  imports: [CommonModule, MatCardModule, RouterModule, MatButtonModule],
  templateUrl: './space-admin-list.component.html',
})
export class SpaceAdminListComponent implements OnInit {
  spaces: Space[] = [];

  constructor(private spaceService: SpaceService, private router: Router) {}

  ngOnInit(): void {
    this.spaceService.getSpaces().subscribe({
      next: (data) => {
        this.spaces = data.member;
      },
      error: (err) => {
        console.error('Error al cargar espacios:', err);
      }
    });
  }

  deleteSpace(id: number) {
    if (confirm('¿Seguro que quieres eliminar este espacio?')) {
      this.spaceService.deleteSpace(id).subscribe(() => {
        this.spaces = this.spaces.filter((s) => s.id !== id);
      });
    }
  }

  goToEdit(id: number) {
    this.router.navigate(['/admin/spaces/edit', id]);
  }

  goToCreate() {
    this.router.navigate(['/admin/spaces/create']);
  }

  goBack() {
    this.router.navigate(['/spaces']);
  }
}
