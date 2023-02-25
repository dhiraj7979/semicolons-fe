import { Component, Input, NgModule } from '@angular/core';

import { VgCoreModule } from '@videogular/ngx-videogular/core';
import { VgControlsModule } from '@videogular/ngx-videogular/controls';
import { VgOverlayPlayModule } from '@videogular/ngx-videogular/overlay-play';
import { VgBufferingModule } from '@videogular/ngx-videogular/buffering';
import { TranferDataToViewService } from '../shared/tranfer-data-to-view.service';

import { VgApiService } from '@videogular/ngx-videogular/core';
import { CommonMaterialModule } from '../common.material.module';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.scss']
})
export class VideoPlayerComponent {
  video_url = '../../assets/video/test.mp4';
  
  @Input()
  set selected(v: any[]) {
    if (v && v.length) {
      this.playlist = v;
      console.log("selected", this.playlist)
      this.onClickPlaylistVideo(this.playlist[0], 0)
    }
  }
  
  playlist: any = [
    {
      title: 'Agent 327!',
      src: '../../assets/video/test.mp4',
      meta: 'Procer in quariotnd',
      type: 'video/mp4'
    },
  ];

  
  currentIndex = 0;
  activeVideo = this.playlist[this.currentIndex];
  api!: { getDefaultMedia: () => { (): any; new(): any; subscriptions: { (): any; new(): any; loadedMetadata: { (): any; new(): any; subscribe: { (arg0: () => void): void; new(): any; }; }; ended: { (): any; new(): any; subscribe: { (arg0: () => void): void; new(): any; }; }; }; }; play: () => void; };


  constructor(private transfer: TranferDataToViewService, private vgApi: VgApiService) {
    this.transfer.getInfo()
    .subscribe(value => {
      this.video_url = value;
    });
  }
  
  onPlayerSet(api: any) {
    this.api = api;
    this.api.getDefaultMedia().subscriptions.loadedMetadata.subscribe(this.startVideo.bind(this));
    this.api.getDefaultMedia().subscriptions.ended.subscribe(this.nextVideo.bind(this));
  }

  nextVideo() {
    this.currentIndex++;
    if (this.currentIndex === this.playlist.length) {
      this.currentIndex = 0;
    }
    this.activeVideo = this.playlist[this.currentIndex];
  }

  startVideo() {
    this.api.play();
  }

  onClickPlaylistVideo(item: { title: string; src: string; type: string; }, 
    index: number
    ) {
    this.currentIndex = index;
    this.activeVideo = item;
  }

}

@NgModule({
  imports: [CommonModule, CommonMaterialModule, VgCoreModule, VgControlsModule, VgOverlayPlayModule, VgBufferingModule],
  exports:[VideoPlayerComponent],
  declarations: [VideoPlayerComponent]
})
export class VideoPlayerModule {
}
