import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SpaceFormComponent } from './space-form.component';
import { SpaceService, Space } from '../../core/services/space.service';

@Component({
  standalone: true,
  imports: [CommonModule, SpaceFormComponent],
  template: `
    <ng-container *ngIf="space">
      <app-space-form [space]="space" [isEdit]="true" />
    </ng-container>
  `,
})
export class SpaceEditPageComponent implements OnInit {
  space!: Space;

  constructor(private route: ActivatedRoute, private spaceService: SpaceService) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.spaceService.getSpace(id).subscribe((space) => (this.space = space));
  }
}
