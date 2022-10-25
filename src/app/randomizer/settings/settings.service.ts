import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { heroesArr, heroesList } from 'src/utils/heroInfo';
import { Hero, HeroListType } from 'src/utils/types';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {

  selectedHeroes: BehaviorSubject<HeroListType> = new BehaviorSubject(heroesList);

  updateHeroList(heroes: string[]): void {
    const newHeroesList: HeroListType = {};

    ['support', 'dps', 'tank'].forEach(role => {
      newHeroesList[role] = Object.values(heroesList[role]).filter(hero => heroes.includes(hero.shortName))
    });

    this.selectedHeroes.next(newHeroesList);
  }
}
