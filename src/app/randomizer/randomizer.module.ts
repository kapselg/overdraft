import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerComponent } from './player/player.component';
import { BackgroundComponent } from './background/background.component';
import { SettingsComponent } from './settings/settings.component';
import { RandomizerComponent } from './randomizer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ControlsComponent } from './controls/controls.component';
import { HeroListComponent } from './settings/hero-list/hero-list.component';



@NgModule({
  declarations: [
    PlayerComponent    ,
    BackgroundComponent,
    SettingsComponent  ,
    RandomizerComponent,
    ControlsComponent,
    HeroListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    RandomizerComponent
  ]
})
export class RandomizerModule { }
