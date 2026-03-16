import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { CrmService } from "./crm.service";
import { CreateLeadDto } from "./dto/create-lead.dto";

@Controller("crm/leads")
@UseGuards(JwtAuthGuard)
export class CrmController {
  constructor(private readonly crmService: CrmService) {}

  @Get()
  getLeads() {
    return this.crmService.findAll();
  }

  @Post()
  createLead(@Body() dto: CreateLeadDto) {
    return this.crmService.create(dto);
  }
}
