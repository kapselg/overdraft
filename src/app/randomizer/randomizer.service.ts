import { Injectable } from '@angular/core';
import { heroes } from 'src/utils/heroInfo';
import { Hero, Layout, Role } from 'src/utils/types';

@Injectable({
  providedIn: 'root'
})
export class RandomizerService {

  constructor() { }

  randomHero(heroArr: Hero[]){
    return heroArr[Math.floor(Math.random() * heroArr.length)];
  }

  generateDeck(layout: Layout = '1-2-2'): Hero[]{
    if(layout == '1-2-2'){
      return new Array(5).fill('').map(() => this.randomHero(Object.values(heroes)))
    }
    return [];
  }
}
