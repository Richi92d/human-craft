import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { Esn } from '../../interfaces/esn.model';
import { DetailPanelComponent } from "../detail-panel/detail-panel.component";
import { TableComponent } from "../table/table.component";
import { ToggleDetailPanelDirective } from '../../directives/toggle-detail-panel.directive';

@Component({
  selector: 'app-consultant-list',
  standalone: true,
  imports: [TableComponent, DetailPanelComponent, CommonModule, ToggleDetailPanelDirective],
  templateUrl: './consultant-list.component.html',
  styleUrl: './consultant-list.component.scss'
})
export class ConsultantListComponent {

  @ViewChild('table') table: TableComponent | undefined;
  @ViewChild('detail') detail: DetailPanelComponent | undefined;

  public isPanelVisible: boolean = false;

  handleRowClick(clickedRow: Esn) {
    if (this.detail) {
      this.isPanelVisible = true;
      this.detail.rowDetail = [clickedRow];
    }
  }

  handleClosePanel() {
    this.isPanelVisible = false;
  }
}
