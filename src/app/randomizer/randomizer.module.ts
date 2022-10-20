import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerComponent } from './player/player.component';
import { BackgroundComponent } from './background/background.component';
import { SettingsComponent } from './settings/settings.component';
import { RandomizerComponent } from './randomizer.component';



@NgModule({
  declarations: [
    PlayerComponent    ,
    BackgroundComponent,
    SettingsComponent  ,
    RandomizerComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    RandomizerComponent
  ]
})
export class RandomizerModule { }
