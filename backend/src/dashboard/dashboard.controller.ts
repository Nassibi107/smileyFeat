import { Body, Controller, Get, Header, Post, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { CreateDeliveryClientDto } from "./dto/create-delivery-client.dto";
import { CreateFinancialRecordDto } from "./dto/create-financial-record.dto";
import { CreateFreelancerDto } from "./dto/create-freelancer.dto";
import { CreatePartnerDto } from "./dto/create-partner.dto";
import { DashboardService } from "./dashboard.service";

@Controller("dashboard")
@UseGuards(JwtAuthGuard)
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get("overview")
  getOverview() {
    return this.dashboardService.getOverview();
  }

  @Get("clients")
  getClients() {
    return this.dashboardService.getClients();
  }

  @Post("clients")
  createClient(@Body() dto: CreateDeliveryClientDto) {
    return this.dashboardService.createClient(dto);
  }

  @Get("freelancers")
  getFreelancers() {
    return this.dashboardService.getFreelancers();
  }

  @Post("freelancers")
  createFreelancer(@Body() dto: CreateFreelancerDto) {
    return this.dashboardService.createFreelancer(dto);
  }

  @Get("partners")
  getPartners() {
    return this.dashboardService.getPartners();
  }

  @Post("partners")
  createPartner(@Body() dto: CreatePartnerDto) {
    return this.dashboardService.createPartner(dto);
  }

  @Get("financials")
  getFinancials() {
    return this.dashboardService.getFinancials();
  }

  @Post("financials")
  createFinancialRecord(@Body() dto: CreateFinancialRecordDto) {
    return this.dashboardService.createFinancialRecord(dto);
  }

  @Get("reports/financials.csv")
  @Header("Content-Type", "text/csv")
  @Header("Content-Disposition", 'attachment; filename="financial-report.csv"')
  async getFinancialCsv() {
    return this.dashboardService.getFinancialsCsv();
  }
}
