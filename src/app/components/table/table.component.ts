import { CommonModule, CurrencyPipe } from '@angular/common';
import { AfterViewInit, Component, EventEmitter, inject, OnInit, Output, ViewChild } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelect, MatSelectChange, MatSelectModule } from '@angular/material/select';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { select, Store } from '@ngrx/store';
import { forkJoin, map, of, switchMap } from 'rxjs';
import { StatusLabel } from '../../enums/statut-label.enum';
import { Esn } from '../../interfaces/esn.model';
import { EsnListService } from '../../service/esn-list.service';
import { loadData } from '../../store/actions/consultant.action';
import { ConsultantState } from '../../store/reducer/consultant.reducer';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    CommonModule,
    CurrencyPipe,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSortModule,
    MatIconModule
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent implements OnInit, AfterViewInit {
  @ViewChild(MatSort) public sort: MatSort | undefined;
  @ViewChild('input', { static: true }) inputField: HTMLInputElement | undefined;

  @Output() emitRowClicked = new EventEmitter<Esn>();
  @Output() emitCloseDetailPanel = new EventEmitter();

  private esnListService = inject(EsnListService);
  private store = inject(Store<{ consultant: ConsultantState }>);

  private statusLabelMap: { [key: string]: StatusLabel } = {
    'Nouveau': StatusLabel.NOUVEAU,
    'En cours': StatusLabel.EN_COURS,
    'Validé': StatusLabel.VALIDÉ,
    'Refusé': StatusLabel.REFUSÉ
  };
  
  private textFilter: string = '';
  private statusFilter: string = '';

  public dataSource: MatTableDataSource<Esn> = new MatTableDataSource<Esn>();
  public displayedColumns: string[] = ['lastName', 'firstName', 'role', 'status', 'experiencesYears', 'availabilityDate', 'dailyRate'];
  public statutLabels: string[] = ['Nouveau', 'En cours', 'Validé', 'Refusé'];

  ngOnInit(): void {
    this.store.dispatch(loadData());
    this.filterConsultantsByIds();
  }

  ngAfterViewInit() {
    this.configureSortingAccessor();
  }

  /** 
   * Configure le tri personnalisé pour les propriétés spécifiques de la source de données de la table.
  */
  public configureSortingAccessor() {
    if (this.sort) {
      this.dataSource.sortingDataAccessor = (item, property) => {
        if (property === 'firstName' || property === 'lastName' || property === 'status' ||
          property === 'availabilityDate' || property === 'dailyRate' || property === 'experiencesYears') {
          switch (property) {
            case 'firstName': return item.user.firstName;
            case 'lastName': return item.user.lastName;
            case 'status': return item.status.label;
            case 'experiencesYears': return item.experiencesYears;
            case 'availabilityDate': return new Date(item.availabilityDate).getTime();
            case 'dailyRate': return item.dailyRate;
            default: return item[property];
          }
        }
        return '';
      };
      this.dataSource.sort = this.sort;
    }
  }

  /** Applique un filtre à la source de données en fonction de la valeur saisie. */
  public applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.textFilter = filterValue;
    this.updateFilter();
  }

  /** Met à jour le prédicat de filtre pour comparer les données avec les filtres actuels de texte et de statut. */
  public updateFilter() {
    this.dataSource.filterPredicate = (data: Esn, filter: string) => {
      const fullName = `${data.user.firstName} ${data.user.lastName}`.toLowerCase();
      const role = data.role.toLowerCase();
      const matchesFullName = fullName.includes(this.textFilter);
      const matchesRole = role.includes(this.textFilter);
      const matchesStatus = data.status.label.toLowerCase().includes(this.statusFilter);

      return (matchesFullName || matchesRole) && (!this.statusFilter || matchesStatus);
    };

    if (!this.textFilter && !this.statusFilter) {
      this.dataSource.filter = '';
    } else {
      this.dataSource.filter = `${this.textFilter}${this.statusFilter}`;
    }
  }

  /** Applique un filtre de statut à la source de données en fonction de la valeur sélectionnée. */
  public applyStatusFilter(event: MatSelectChange) {
    const selectedStatus = event.value;
    this.statusFilter = this.statusLabelMap[selectedStatus].toLowerCase();
    this.updateFilter();
  }

  public rowclicked(row: Esn) {
    this.emitRowClicked.emit(row);
  }

  public closeSidePanel(event: MouseEvent) {
    if (event) {
      this.emitCloseDetailPanel.emit();
    }
  }

  public clearInput(input: HTMLInputElement) {
    input.value = '';
    this.textFilter = '';
    this.updateFilter();
  }

  public clearSelect(selectValue: MatSelect) {
    selectValue.value = '';
    this.statusFilter = '';
    this.updateFilter();
  }

  /** Filtrage des consultants basé sur les identifiants récupérés */
  private filterConsultantsByIds() {
    this.store.pipe(
      select(state => state.consultant.data),
      switchMap(data =>
        forkJoin({
          listConsultant: of(data),
          consultantIds: this.esnListService.esnDetail()
        })
      ),
      map(({ listConsultant, consultantIds }) =>
        listConsultant.filter((consultant: Esn) =>
          consultantIds.some((id) => id.id === consultant.id)
        )
      )
    ).subscribe(filterData => {
      this.dataSource.data = filterData;
    });
  }

}
