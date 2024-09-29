import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { provideMockStore, MockStore } from '@ngrx/store/testing';

import { Task } from 'src/app/services/task/interface/task.interface';
import { ListTasksComponent } from './list-tasks.component';

class MockHttpClient { }

describe('ListTasksComponent', () => {
  let component: ListTasksComponent;
  let fixture: ComponentFixture<ListTasksComponent>;
  let store: MockStore;
  const initialState: Task[] = [];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ListTasksComponent,
      ],
      providers: [
        {
          provide: HttpClient,
          useClass: MockHttpClient,
        },
        provideMockStore({ initialState }),
      ]
    });
  });

  beforeEach(() => {
    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(ListTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
