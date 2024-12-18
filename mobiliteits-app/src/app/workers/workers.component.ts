import { Component } from "@angular/core";
import { Worker } from "../data/interfaces/worker";
import { WORKERS } from "../data/mock/mock-worker";

@Component({
  selector: "app-workers",
  templateUrl: "./workers.component.html",
  styleUrl: "./workers.component.css",
})

/**
 * WorkersComponent class that contains the logic for the workers component
 */
export class WorkersComponent {
  // page number for the pagination count
  pageNumber: number = 1;
  
  // Mock data array
  collection: Worker[] = WORKERS;

  workers = WORKERS;
  selectedWorker: Worker;

  /**
   * Sets the selected worker.
   * @param worker - The worker object to be selected.
   */
  onSelect(worker: Worker): void {
    this.selectedWorker = worker;
  }

  // Filter term for the search bar
  filterTerm: string;

  /**
   * Get the workers that match the filter term.
   * If no filter term is provided, returns all workers.
   * @returns An array of workers that match the filter term.
   */
  getFilteredWorkers() {
    if (!this.filterTerm) {
      return this.workers;
    }

    return this.workers.filter(
      (worker) =>
        worker.firstname
          .toLowerCase()
          .includes(this.filterTerm.toLowerCase()) ||
        worker.lastname.toLowerCase().includes(this.filterTerm.toLowerCase()),
    );
  }
}
