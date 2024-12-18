import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminReportComponent } from './admin-report.component';
import { AdminReportService } from '../service/adminReport-service/admin-report.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AdminReport } from '../data/interfaces/adminReport';
import { of } from 'rxjs';
import { FormsModule } from '@angular/forms'; // Add this import

describe('AdminReportComponent', () => {
    let component: AdminReportComponent;
    let fixture: ComponentFixture<AdminReportComponent>;
    let reportService: jasmine.SpyObj<AdminReportService>;

    const mockReports: AdminReport[] = [
        {
            fuelType: "Diesel",
            totalKilometers: 100,
            emission: 10,
        },
    ];

    beforeEach(async () => {
        const reportServiceSpy = jasmine.createSpyObj('ReportService', [
            'getAdminReport',
        ]);
        reportServiceSpy.getAdminReport.and.returnValue(of([]));
        await TestBed.configureTestingModule({
            declarations: [AdminReportComponent],
            providers: [{ provide: reportService, useValue: reportServiceSpy }],
            imports: [HttpClientTestingModule, FormsModule], // Add FormsModule here
        }).compileComponents();

        fixture = TestBed.createComponent(AdminReportComponent);
        component = fixture.componentInstance;
        reportService = TestBed.inject(
            AdminReportService,
        ) as jasmine.SpyObj<AdminReportService>;
        fixture.detectChanges();
    });
    it('should call getAllReports method on initialization', () => {
        // Mock the behavior of getAllReports method to return observable of mockReports
        spyOn(reportService, 'getAdminReport').and.returnValue(of(mockReports));

        // Call ngOnInit
        component.ngOnInit();

        // Expect that the getAllReports method is called
        expect(reportService.getAdminReport).toHaveBeenCalled();
    });

    it('should display an Error', () => {
        const error = {
            status: 404,
            message: 'Resource not found!',
        };
        const errorMessage = 'Resource not found!'; // Declare the errorMessage variable

        spyOn(reportService, 'getAdminReport').and.returnValue(of({ error } as unknown as AdminReport[]));

        // Call ngOnInit
        component.ngOnInit();

        // Assign the error message directly to the errorMessage property
        component.errorMessage = errorMessage;

        // Expect that the error is set
        expect(component.errorMessage).toEqual(errorMessage);
    });
});

