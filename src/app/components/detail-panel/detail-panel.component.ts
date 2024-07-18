import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Esn } from '../../interfaces/esn.model';

@Component({
  selector: 'app-detail-panel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detail-panel.component.html',
  styleUrl: './detail-panel.component.scss'
})
export class DetailPanelComponent {

  public rowDetail: Esn[] = [];
}
