import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AdminReportService } from './admin-report.service';
import { ADMINREPORT } from '../../data/mock/mock-adminReport';

describe('AdminReportService', () => {
  let service: AdminReportService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      // Providers are used to configure the injector for the service under test
      providers: [AdminReportService]
    });
    service = TestBed.inject(AdminReportService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve the admin report', () => {
    const month = 4;
    const yearNumber = 2024;
    const expectedUrl = `http://localhost:3002/admin/rapport/${month}/${yearNumber}`;
    const mockResponse = ADMINREPORT;

    // Call the service and subscribe to the response (subscribe is used to listen to the response from the service)
    service.getAdminReport(month, yearNumber).subscribe((adminReport) => {
      expect(adminReport).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(expectedUrl);
    expect(req.request.method).toBe('GET');
    // Flush simulates the response to the request
    req.flush(mockResponse);
  });

});