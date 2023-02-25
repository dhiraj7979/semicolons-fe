
import { NgModule, Component, Input } from '@angular/core';
import { CommonMaterialModule } from '../common.material.module';
import { StepperModule } from '../stepper/stepper.component';
import { VideoPlayerModule } from '../video-player/video-player.component'
import { TranferDataToViewService } from '../shared/tranfer-data-to-view.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-presentation',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
export class VideoComponent {
  @Input() item_list: any = [
    {
      title: 'Demo 1',
      src: '../../assets/video/fridayoutput.mp4',
      meta: 'Produced by SS',
      type: 'video/mp4'
    },
    {
      title: 'Demo 2',
      src: '../../assets/video/test.mp4',
      meta: 'Created on PP',
      type: 'video/mp4'
    }
  ]

  currentItem: any[] = []

  constructor(private tranfer: TranferDataToViewService) {
    localStorage.setItem('video-link', '../../assets/video/fridayoutput.mp4');
    // setTimeout(() => this.item_list.push({
    //   title: 'Demo 2',
    //   src: '../../assets/video/satoutput4.mp4',
    //   meta: 'Created on PP',
    //   type: 'video/mp4'
    // }), 5000)
  }
  

  preview(i: number = -1) {
    // if(i == -1) return;

    // this.tranfer.setDataToShow(this.item_list[i]['url']);
    // localStorage.setItem('video-link', this.item_list[i]['url']);
    this.currentItem = [this.item_list[i]]
    console.log('this.currentItem', this.currentItem)
  }

  download(url?: string) {
    let a = document.createElement('a');
    a.href = url || "";
    a.click();
    a.remove();
  }
}

@NgModule({
  imports:[CommonModule, CommonMaterialModule, VideoPlayerModule, StepperModule],
  declarations:[VideoComponent]
})
export class VideoComponentModule {

}

 