import { TestBed } from '@angular/core/testing';

import { ManageLessonCategoriesService } from './manage-lesson-categories.service';

describe('ManageLessonCategoriesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ManageLessonCategoriesService = TestBed.get(ManageLessonCategoriesService);
    expect(service).toBeTruthy();
  });
});
