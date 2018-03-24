import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
  MatButtonModule,
  MatCheckboxModule,
  MatDialogModule,
  MatInputModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatSelectModule,
  MatSlideToggleModule,
  MatTabsModule,
  MatTooltipModule,
  MatFormFieldModule
} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatCheckboxModule,
    MatTooltipModule,
    MatTabsModule,
    MatSelectModule,
    MatRadioModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatInputModule,
    MatDialogModule,
    MatSlideToggleModule,
    MatFormFieldModule
  ],

  exports: [
    MatButtonModule,
    MatCheckboxModule,
    MatTooltipModule,
    MatTabsModule,
    MatSelectModule,
    MatRadioModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatInputModule,
    MatDialogModule,
    MatSlideToggleModule,
    MatFormFieldModule
  ],

  declarations: [],
  providers: []
})
export class LoanAppMaterialModule {
}
