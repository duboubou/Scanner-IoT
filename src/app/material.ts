import {MatButtonModule, MatCheckboxModule, MatProgressSpinnerModule} from '@angular/material';
import { NgModule } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material';



@NgModule({
  imports: [MatButtonModule, MatCheckboxModule, MatProgressSpinnerModule, MatTableModule, MatFormFieldModule, MatInputModule],
  exports: [MatButtonModule, MatCheckboxModule, MatProgressSpinnerModule, MatTableModule, MatFormFieldModule, MatInputModule],
})
export class MaterialModule { }
