import { TestBed } from '@angular/core/testing';

import { TaskService } from './task.service';
import { HttpClient } from '@angular/common/http';

class MockHttpClient { }
class MockTaskService { }

describe('TaskService', () => {
  let httpClient: HttpClient;
  let service: TaskService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: HttpClient,
          useClass: MockHttpClient,
        },
        {
          provide: TaskService,
          useClass: MockTaskService,
        },
      ]
    });
    
    httpClient = TestBed.inject(HttpClient);
    service = TestBed.inject(TaskService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
