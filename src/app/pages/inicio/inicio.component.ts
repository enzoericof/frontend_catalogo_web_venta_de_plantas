import { Component, ElementRef, ViewChild, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ANUNCIOS, FOTOS_HERO } from '../../core/tienda.data';
@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css',
})
export class InicioComponent {
  readonly anuncios = ANUNCIOS;
  readonly fotos = FOTOS_HERO;
  readonly fotoActiva = signal(0);
  @ViewChild('heroTrack') private heroTrack?: ElementRef<HTMLElement>;

  irAFoto(indice: number): void {
    const track = this.heroTrack?.nativeElement;
    if (!track) return;
    const destino = Math.max(0, Math.min(indice, this.fotos.length - 1));
    track.scrollTo({
      left: destino * track.clientWidth,
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
    });
  }

  actualizarFoto(): void {
    const track = this.heroTrack?.nativeElement;
    if (track?.clientWidth) {
      this.fotoActiva.set(Math.max(0, Math.min(this.fotos.length - 1, Math.round(track.scrollLeft / track.clientWidth))));
    }
  }

  manejarTecla(event: KeyboardEvent): void {
    const destinos: Record<string, number> = {
      ArrowLeft: this.fotoActiva() - 1,
      ArrowRight: this.fotoActiva() + 1,
      Home: 0,
      End: this.fotos.length - 1,
    };
    if (event.key in destinos) {
      event.preventDefault();
      this.irAFoto(destinos[event.key]);
    }
  }
}
