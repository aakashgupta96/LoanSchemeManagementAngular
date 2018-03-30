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
  MatFormFieldModule,
  MatCardModule
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
    MatFormFieldModule,
    MatCardModule
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
    MatFormFieldModule,
    MatCardModule
  ],

  declarations: [],
  providers: []
})
export class LoanAppMaterialModule {
}
