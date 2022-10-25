import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { preloadList } from 'src/utils/preloadList';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor() { }

  preloadLeftProgress: Subject<string> = new Subject();

  preloadImages(){
    preloadList.forEach((image, index) => {
      var imgEl = new Image();
      imgEl.src = `assets/${image}`;

      const preloadLeftProgress = (index / preloadList.length) + '%';
      this.preloadLeftProgress.next(preloadLeftProgress)
    })
  }
}
