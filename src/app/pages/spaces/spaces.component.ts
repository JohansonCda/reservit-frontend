import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { Router } from '@angular/router';

import { SpaceService, Space } from '../../core/services/space.service';
import { TypeService } from '../../core/services/type.service';
import { ReservationService, Reservation } from '../../core/services/reservation.service';

interface Type {
  id: number;
  name: string;
}

@Component({
  selector: 'app-spaces',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  templateUrl: './spaces.component.html',
  styleUrls: ['./spaces.component.scss']
})
export class SpacesComponent implements OnInit {
  spaces: Space[] = [];
  filteredSpaces: Space[] = [];

  loading = true;
  error = '';

  availableTypes: Type[] = [];

  filters = {
    type: '',
    minCapacity: 0,
    date: null as Date | null
  };

  reservations: Reservation[] = [];

  constructor(
    private spaceService: SpaceService,
    private typeService: TypeService,
    private reservationService: ReservationService,
    private router: Router
  ) {}

  ngOnInit() {
    this.spaceService.getEnrichedSpaces().then(spaces => {
      this.spaces = spaces;
      this.filteredSpaces = this.spaces;
      this.applyFilters();
      this.loading = false;
    }).catch(() => {
      this.error = 'No se pudo cargar la lista de espacios.';
      this.loading = false;
    });

    this.reservationService.getAllReservations().subscribe({
      next: (data) => {
        this.reservations = data.member;
        this.applyFilters();
      },
      error: () => {
        console.warn('No se pudieron cargar las reservas');
      }
    });

    this.typeService.getTypes().subscribe({
      next: (data) => {
        this.availableTypes = data.member;
      },
      error: () => {
        console.warn('No se pudieron cargar los tipos');
      }
    });
  }

  goToDetail(id: number) {
    this.router.navigate(['/spaces', id]);
  }

  applyFilters() {
    this.filteredSpaces = this.spaces.filter(space => {
      const matchType = this.filters.type ? space.type === this.filters.type : true;
      const matchCapacity = space.capacity >= this.filters.minCapacity;

      let matchDate = true;
      if (this.filters.date) {

        const selectedDate = new Date(this.filters.date);

        matchDate = !space.reservations?.some((res: any) => {

          const resStart = new Date(res.startTime);
          const resEnd = new Date(res.endTime);

          resStart.setHours(0, 0, 0, 0);
          resEnd.setHours(0, 0, 0, 0);

          return selectedDate >= resStart && selectedDate <= resEnd;
        });
      }

      return matchType && matchCapacity && matchDate;
    });
  }
}
