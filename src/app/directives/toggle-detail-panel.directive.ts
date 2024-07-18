import { Directive, ElementRef, Input, OnChanges, Renderer2, SimpleChanges, inject, HostListener } from '@angular/core';

@Directive({
  selector: '[appToggleDetailPanel]',
  standalone: true
})
export class ToggleDetailPanelDirective implements OnChanges {

  @Input('appToggleDetailPanel') isVisible: boolean = false;

  private renderer = inject(Renderer2);
  private el = inject(ElementRef);

  // Indicateur pour éviter l'exécution initiale
  private initialLoad = true;

  // Méthode pour déclencher manuellement le changement d'état
  @HostListener('click')
  private onClick() {
    this.togglePanel(this.isVisible);
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['isVisible'] && !this.initialLoad) {
      this.togglePanel(changes['isVisible'].currentValue);
    }
  }

  public ngAfterViewInit(): void {
    // Désactiver l'indicateur après le premier cycle de détection des changements
    this.initialLoad = false;
  }

  /**
   * Affiche ou cache le panneau.
   * @param visible Boolean indiquant si le panneau doit être visible ou pas.
   */
  private togglePanel(visible: boolean): void {
    const width = visible ? '50%' : '0';
    const addClass = visible ? 'visible' : 'hidden';
    const removeClass = visible ? 'hidden' : 'visible';

    this.renderer.setStyle(this.el.nativeElement, 'width', width);
    this.renderer.removeClass(this.el.nativeElement, removeClass);
    this.renderer.addClass(this.el.nativeElement, addClass);
  }
}
