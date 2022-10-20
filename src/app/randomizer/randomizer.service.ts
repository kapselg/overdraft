import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { heroes, roles } from 'src/utils/heroInfo';
import { Hero, Layout, Role } from 'src/utils/types';

@Injectable({
  providedIn: 'root'
})
export class RandomizerService {

  constructor() { }

  heroes = new Subject<Hero[]>();
  roles = new Subject<Role[]>();
  singleMode = new BehaviorSubject<boolean>(true);
  configuratorMode = new BehaviorSubject<boolean>(false);

  randomHero(heroArr: Hero[]): Hero{
    return heroArr[Math.floor(Math.random() * heroArr.length)];
  }

  setupConfigurator(){
    this.roles.next(new Array(3).fill('any'))
  }

  generateOne(){
    const newHeroes = new Array();
    newHeroes[0] = this.randomHero(Object.values(heroes));
    this.heroes.next(newHeroes);
  }

  generateDeck(){
      const result: Hero[] = new Array(5);

      result[0] = this.randomHero(roles.tank);
      result[1] = this.randomHero(roles.dps);
      result[2] = this.randomHero([...roles.dps].filter(hero => hero.name !== result[1].name));
      result[3] = this.randomHero(roles.support);
      result[4] = this.randomHero([...roles.support].filter(hero => hero.name !== result[3].name));

      this.heroes.next(result);
  }
}
