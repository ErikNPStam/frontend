import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { WorkersComponent } from './workers.component';
import { WORKERS } from '../data/mock/mock-worker';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';

describe('WorkersComponent', () => {
  let component: WorkersComponent;
  let fixture: ComponentFixture<WorkersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WorkersComponent],
      imports: [NgxPaginationModule, FormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(WorkersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should display workers', () => {
    // Assign the worker array to the workers
    component.workers = WORKERS;

    // Trigger change detection
    fixture.detectChanges();

    // Get the components template from an elements with the CSS class worker
    const workerElement = fixture.debugElement.query(By.css('.worker'));

    // Check if worker element exists
    expect(workerElement).toBeTruthy();
  });

  it('should display workers based on filter', () => {
    // Assign the worker array to the workers
    component.workers = WORKERS;

    // Set the filter term
    component.filterTerm = 'John';

    // calling the method to filter the workers
    let filterWorkers = component.getFilteredWorkers();

    // Check if the filtered workers array contains exactly two workers
    expect(filterWorkers.length).toEqual(2);

    // Check that one user has a firstname that contains 'John'
    expect(
      filterWorkers.some((worker) => worker.firstname.includes('John')),
    ).toBeTrue();

    // Check that one user has a lastname that contains 'John'
    expect(
      filterWorkers.some((worker) => worker.lastname.includes('John')),
    ).toBeTrue();
  });
});
