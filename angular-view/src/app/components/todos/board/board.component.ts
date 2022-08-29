import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { Todo } from 'src/app/models/todo.model';
import { GetTodo } from 'src/app/states/todo.action';
import { selectTodoList, TodoState } from 'src/app/states/todo.state';
import { TodoFormComponent } from '../todo-form/todo-form.component';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  //cardStore: CardStore;
  treeControl = new NestedTreeControl<Todo>(node => node.children);
  dataSource = new MatTreeNestedDataSource<Todo>();
  flatTodos = new Map();

  todoState$: Observable<Todo[]>;

  private subscriptions: Array<Subscription>;
  set subscription(s: Subscription) {
    this.subscriptions.push(s);
  }

  constructor(
    private store: Store<TodoState>,
    private dialog: MatDialog,
  ) {
    this.subscriptions = new Array<Subscription>();
    this.todoState$ = this.store.pipe(select((states: any) => selectTodoList(states)));

  }

  hasChild = (_: number, node: Todo) => !!node.children && node.children.length > 0;

  openDialog(todoId: string | undefined = undefined, parentId: string | undefined = undefined): void {
    const data = { id: todoId || null, parentId: parentId || null }

    const dialogRef = this.dialog.open(TodoFormComponent, {
      width: '50vw',
      data: data
    });

    this.subscription = dialogRef.afterClosed().subscribe(() => {
      console.log('Closed Form');
    })
  }


  ngOnInit(): void {
    const getTodoAction = new GetTodo();

    this.subscription = this.todoState$
      .subscribe((todos: Todo[]) => {

        function buildTree(data: Todo[]) {
          const store = new Map();
          const rels = new Map();
          const roots: string[] = [];
          data.forEach(d => {
            store.set(d._id, d);
            !rels.get(d._id) ? rels.set(d._id, []) : undefined;
            if (!d.parentId) {
              roots.push(d._id!);
              return;
            }
            const parent = rels.get(d.parentId) || [];
            parent.push(d._id);
            rels.set(d.parentId, parent);
          });

          function build(id: string) {
            const data = store.get(id);
            const children = rels.get(id);
            if (children.length === 0) {
              return { ...data }
            }
            return { ...data, children: children.map((c: any) => build(c)) };
          }
          return { tree: roots.map(r => build(r)), flat: store };
        }

        const buildedTree = buildTree(todos);
        this.dataSource.data = buildedTree.tree;
        this.flatTodos = buildedTree.flat;
      });

    this.store.dispatch(getTodoAction);
  }

}
