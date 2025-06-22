import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { ReservationService, Reservation } from '../../core/services/reservation.service';
import { AuthService } from '../../core/services/auth.service';
import { SpaceService } from '../../core/services/space.service';

type ReservationWithSpaceName = Reservation & { spaceName?: string };

@Component({
  selector: 'app-my-reservations-page',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule],
  templateUrl: './my-reservations-page.component.html',
  styleUrls: ['./my-reservations-page.component.scss']
})
export class MyReservationsPageComponent implements OnInit {
  reservations: ReservationWithSpaceName[] = [];
  loading = true;
  error = '';
  isAdmin = false;

  constructor(
    private reservationService: ReservationService,
    private authService: AuthService,
    private spaceService: SpaceService,
    private router: Router
  ) {}

  ngOnInit(): void {
  this.isAdmin = this.authService.isAdmin();

  this.reservationService.getUserReservations().subscribe({
    next: (data) => {
      const rawReservations = data.member;

      Promise.all(
        rawReservations.map(async (res) => {
          const resWithName: ReservationWithSpaceName = { ...res };

            const parts = res.space.split('/');
            const idPart = parts[parts.length - 1];
            const id = Number(idPart);

            const space = await this.spaceService.getSpace(id).toPromise();
            resWithName.spaceName = space?.name ?? 'Nombre no disponible';

          return resWithName;
        })
      ).then((enriched) => {
        this.reservations = enriched;
        this.loading = false;
      });
    },
    error: () => {
      this.error = 'No se pudieron cargar tus reservas.';
      this.loading = false;
    }
  });
}

  editReservation(id: number) {
    this.router.navigate(['/reservations/edit', id]);
  }

  cancelReservation(id: number) {
    if (confirm('¿Deseas cancelar esta reserva?')) {
      this.reservationService.deleteReservation(id).subscribe(() => {
        this.reservations = this.reservations.filter(r => r.id !== id);
      });
    }
  }

  requestCancellation(id: number) {
    if (confirm('¿Deseas solicitar la cancelación de esta reserva?')) {
      this.reservationService.requestCancellation(id).subscribe(() => {
        alert('Solicitud enviada al administrador.');
      });
    }
  }

  goBack() {
    this.router.navigate(['/spaces']);
  }
}
