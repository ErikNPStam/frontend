import { Component } from '@angular/core';
import { AdminReport } from '../data/interfaces/adminReport';
import { AdminReportService } from '../service/adminReport-service/admin-report.service';
import { Chart, PieController, ArcElement, CategoryScale, Tooltip, Legend } from 'chart.js';


@Component({
  selector: 'app-admin-report',
  templateUrl: './admin-report.component.html',
  styleUrl: './admin-report.component.css'
})

/**
 * Component for the admin report.
 * @author Erik Stam
 */
export class AdminReportComponent {

  // array to store the admin report
  private _adminReport: AdminReport[] = [];

  public get adminReport(): AdminReport[] {
    return this._adminReport;
  }

  public set adminReport(value: AdminReport[]) {
    this._adminReport = value;
  }

  // sort order and field
  private sortOrder: string = 'asc';
  private sortField: string

  // error object to store the error message
  private _error: {
    status: number;
    message: string;
  } | null;

  public get error(): { status: number; message: string } | null {
    return this._error;
  }

  public set error(value: { status: number; message: string } | null) {
    this._error = value;
  }
  private _fetched: boolean = false;

  public get fetched(): boolean {
    return this._fetched;
  }

  public set fetched(value: boolean) {
    this._fetched = value;
  }

  private _pageLength: number = 10;

  public get pageLength(): number {
    return this._pageLength;
  }

  public set pageLength(value: number) {
    this._pageLength = value;
  }

  private _pageNumber: number = 1;

  public get pageNumber(): number {
    return this._pageNumber;
  }

  public set pageNumber(value: number) {
    this._pageNumber = value;
  }

  private _errorMessage: string;

  public get errorMessage(): string {
    return this._errorMessage;
  }

  public set errorMessage(value: string) {
    this._errorMessage = value;
  }

  private _selectedMonth: string;

  public get selectedMonth(): string {
    return this._selectedMonth;
  }

  public set selectedMonth(value: string) {
    this._selectedMonth = value;
  }

  private _selectedYear: number;

  public get selectedYear(): number {
    return this._selectedYear;
  }

  public set selectedYear(value: number) {
    this._selectedYear = value;
  }

  private _chart: Chart<"pie", number[], string>;

  public get chart(): Chart<"pie", number[], string> {
    return this._chart;
  }

  public set chart(value: Chart<"pie", number[], string>) {
    this._chart = value;
  }

  private _isChartVisible: boolean = false;

  public get isChartVisible(): boolean {
    return this._isChartVisible;
  }

  public set isChartVisible(value: boolean) {
    this._isChartVisible = value;
  }
  constructor(private AdminReportService: AdminReportService) { }

  /**
   * Gets the admin report on initialization.
   */
  public ngOnInit() {
    this.selectedMonth = this.getMonths()[0];
    this.selectedYear = new Date().getFullYear();
    this.getAdminReport();
    Chart.register(PieController, ArcElement, CategoryScale, Tooltip, Legend);
  }

  /**
   * Gets the admin report from the server.
   */
  public getAdminReport(): void {
    const monthNumber = this.getMonthNumber(this.selectedMonth);
    const yearNumber = this.getYearNumber(String(this.selectedYear)); // Convert selectedYear to a string
    this.AdminReportService.getAdminReport(monthNumber, yearNumber).subscribe(
      (data: AdminReport[] | { error: string }) => {
        if ('error' in data) {
          this.errorMessage = data.error;
        } else {
          this.adminReport = data;
        }
      },
      () => {
        this.fetched = true;
      }
    );
  }

  /**
   * Gets the months of the year.
   * @returns - Array with the months of the year
   */
  public getMonths(): string[] {
    return ['All', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  }

  /**
   * Get the years
   * @returns - Array with the years
   */
  public getYears(): number[] {
    const currentYear = new Date().getFullYear();
    const minYear = currentYear - 5;
    const maxYear = currentYear + 5;
    const years = [];
    for (let i = minYear; i <= maxYear; i++) {
      years.push(i);
    }
   return years;
  }

  /**
   * Gets the month number for a given month.
   * @param month - Month to get the number for
   * @returns - The month number
   */
  public getMonthNumber(month: string): number {
    const months = ['All', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return months.indexOf(month);
  }


  public getYearNumber(year: string): number {
    const years = ['2020', '2021', '2022', '2023', '2024', '2025', '2026', '2027', '2028', '2029', '2030'];
    return years.indexOf(year) + 2020;
  }
  /**
   * Gets the month name for a given month number.
   */
  public onMonthChange(): void {
    this.getAdminReport();
  }

  public onYearChange(): void {
    this.getAdminReport();
  }

  /**
   * Sorts the reports by a given field.
   * @param field - Field to sort by
   * @param sortOrder - Sort order (asc or desc)
   */
  public sortReports(field: string, sortOrder: string): void {
    this.sortField = field;
    this.adminReport.sort((a, b) => {
      if (a[field] < b[field]) {
        return this.sortOrder === 'asc' ? -1 : 1;
      }
      if (a[field] > b[field]) {
        return this.sortOrder === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }

  /**
   * Toggles the sort order.
   */
  public toggleSortOrder(): void {
    this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
  }

  /**
 * Toggles the visibility of the pie chart.
 */
  public toggleChart(): void {
    const canvas = document.getElementById('pieChart') as HTMLCanvasElement;
    if (this.isChartVisible) {
      this.removePieChart();
      canvas.style.display = 'none';
    } else {
      this.generatePieChart();
      canvas.style.display = 'block';
    }
    this.isChartVisible = !this.isChartVisible;
  }

  /**
   * Removes the pie chart from the canvas.
   */
  public removePieChart(): void {
    this.chart.destroy();
  }

  /**
   * Generates a pie chart based on the admin report data.
   */
  public generatePieChart(): void {
    // Get the canvas element
    const canvas = document.getElementById('pieChart') as HTMLCanvasElement;

    // Group data by fuelType and sum emission for each group
    const groupedData = this.groupByFuelType();

    // Get the labels and data for the chart
    const labels = Object.keys(groupedData);
    const data = Object.values(groupedData);

    // Create the chart
    this.chart = new Chart(canvas as HTMLCanvasElement, {
      // Set the chart type to pie
      type: 'pie',
      // Set the data for the chart
      data: {
        labels: labels,
        datasets: [{
          data: data,
          backgroundColor: ['red', 'blue', 'yellow', 'green', 'purple', 'orange', 'pink', 'brown', 'grey', 'black'],
        }]
      },
      // Set the options for the chart
      options: {
        // Make the chart not responsive so you can style it better
        responsive: false,
        // Maintain aspect ratio to false to allow the chart to fill the canvas
        maintainAspectRatio: false,
      }
    });
  }

  /**
   * Groups the admin report data by fuel type and sums the emission for each group.
   * @returns - An object with the fuelType as key and the total emission as value.
   */
  private groupByFuelType(): { [key: string]: number } {
    return this.adminReport.reduce((acc, item) => {
      if (!acc[item.fuelType]) {
        acc[item.fuelType] = 0;
      }
      // Convert emission to a number and add it to the current total
      const emission = Number(item.emission);
      // Check if the emission is a number
      if (!isNaN(emission)) {
        // Add the emission to the total
        acc[item.fuelType] += emission;
      }
      // Return the accumulator
      return acc;
    }, {});
  }
}
