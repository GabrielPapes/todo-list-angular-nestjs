import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatSliderModule } from '@angular/material/slider';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { LayoutModule } from '@angular/cdk/layout';
import { MatListModule } from '@angular/material/list'
import { MatDividerModule } from '@angular/material/divider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HttpClientModule } from '@angular/common/http';
import { TodoFormComponent } from './todo-form/todo-form.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { StoreModule } from '@ngrx/store';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { todoReducer } from '../../states/todo.reducers';
import { EffectsModule } from '@ngrx/effects';
import { TodoService } from '../../services/todo.service';
import { BoardComponent } from './board/board.component';
import { MatTreeModule } from '@angular/material/tree';

@NgModule({
  declarations: [
    TodoFormComponent,
    BoardComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatSliderModule,
    DragDropModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    LayoutModule,
    MatListModule,
    MatDividerModule,
    MatToolbarModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule, 
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonToggleModule,
    StoreModule.forRoot({todos: todoReducer}),
    EffectsModule.forRoot([TodoService]),
    MatCheckboxModule,
    MatTreeModule,
    
  ],
  exports: [
    BoardComponent,
  ],
  providers: [],
})
export class TodosModule { }
