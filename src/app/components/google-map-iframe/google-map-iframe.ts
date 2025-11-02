import { Component, Input, OnChanges, SecurityContext } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-google-map-iframe',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './google-map-iframe.html',
  styleUrls: ['./google-map-iframe.scss'],
})
export class GoogleMapIframeComponent implements OnChanges {
  @Input({ required: true }) mapSrcUrl: string = '';
  @Input() height: string = '100%';

  safeMapUrl: SafeResourceUrl | null = null;

  constructor(private sanitizer: DomSanitizer) {}

  ngOnChanges(): void {
    if (this.mapSrcUrl) {
      this.safeMapUrl =
        this.sanitizer.bypassSecurityTrustResourceUrl(this.mapSrcUrl);
    }
  }
}