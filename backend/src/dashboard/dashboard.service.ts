import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateDeliveryClientDto } from "./dto/create-delivery-client.dto";
import { CreateFinancialRecordDto } from "./dto/create-financial-record.dto";
import { CreateFreelancerDto } from "./dto/create-freelancer.dto";
import { CreatePartnerDto } from "./dto/create-partner.dto";

type JsonTask = {
  title: string;
  status: "To Do" | "In Progress" | "Review" | "Completed";
  priority: "Low" | "Med" | "High";
  deadline: string;
  assignee: string;
};

@Injectable()
export class DashboardService {
  constructor(private readonly prisma: PrismaService) {}

  async getOverview() {
    const [leads, clients, freelancers, financials] = await Promise.all([
      this.prisma.lead.findMany(),
      this.prisma.deliveryClient.findMany(),
      this.prisma.freelancer.findMany({ where: { active: true } }),
      this.prisma.financialRecord.findMany({ orderBy: { createdAt: "asc" } }),
    ]);

    const totalRevenue = financials.reduce((sum: number, row) => sum + row.contract, 0);
    const totalCost = financials.reduce((sum: number, row) => sum + row.freelancerCost + row.opCost, 0);
    const netProfit = totalRevenue - totalCost;
    const margin = totalRevenue > 0 ? Math.round((netProfit / totalRevenue) * 100) : 0;

    return {
      stats: {
        totalLeads: leads.length,
        activeClients: clients.length,
        activeFreelancers: freelancers.length,
        totalRevenue,
        netProfit,
        margin,
      },
      pipelineStages: [
        "Lead Captured",
        "Qualified",
        "Call Booked",
        "Call Done",
        "Proposal",
        "Won",
        "Lost",
      ].map((stage) => ({
        stage,
        count: leads.filter((lead) => lead.stage === stage).length,
      })),
    };
  }

  getClients() {
    return this.prisma.deliveryClient.findMany({ orderBy: { createdAt: "desc" } });
  }

  createClient(dto: CreateDeliveryClientDto) {
    const owner = dto.owner?.trim() || "AL";
    const defaultTask: JsonTask = {
      title: "Kickoff and planning",
      status: "To Do",
      priority: "High",
      deadline: "TBD",
      assignee: owner,
    };

    return this.prisma.deliveryClient.create({
      data: {
        name: dto.name,
        owner,
        status: dto.status || "Active",
        health: dto.health || "Healthy",
        progress: dto.progress ?? 0,
        contract: dto.contract ?? 0,
        stage: dto.stage ?? 0,
        services: dto.services ?? [],
        team: dto.team ?? [owner],
        tasks: [defaultTask],
      },
    });
  }

  getFreelancers() {
    return this.prisma.freelancer.findMany({
      where: { active: true },
      orderBy: { createdAt: "desc" },
    });
  }

  createFreelancer(dto: CreateFreelancerDto) {
    const initials = dto.name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();

    const utilization = dto.utilization ?? 0;
    const availability = utilization > 90 ? "red" : utilization > 75 ? "yellow" : "green";

    return this.prisma.freelancer.create({
      data: {
        name: dto.name,
        initials,
        specialization: dto.specialization,
        rating: dto.rating ?? 4,
        rate: dto.rate ?? 0,
        utilization,
        availability,
        profile: dto.profile || "",
        activeProjects: 0,
        projects: [],
        tasks: [],
        payments: [],
      },
    });
  }

  getPartners() {
    return this.prisma.partner.findMany({ orderBy: { createdAt: "desc" } });
  }

  createPartner(dto: CreatePartnerDto) {
    return this.prisma.partner.create({
      data: {
        name: dto.name,
        category: dto.category,
        description: dto.description,
        website: dto.website,
        logoUrl: dto.logoUrl,
      },
    });
  }

  getFinancials() {
    return this.prisma.financialRecord.findMany({ orderBy: { createdAt: "asc" } });
  }

  createFinancialRecord(dto: CreateFinancialRecordDto) {
    return this.prisma.financialRecord.create({
      data: {
        month: dto.month,
        clientName: dto.clientName,
        contract: dto.contract,
        freelancerCost: dto.freelancerCost,
        opCost: dto.opCost,
        status: dto.status || "Healthy",
        notes: dto.notes,
      },
    });
  }

  async getFinancialsCsv() {
    const rows = await this.prisma.financialRecord.findMany({ orderBy: { createdAt: "asc" } });
    const header = "month,clientName,contract,freelancerCost,opCost,marginPercent,status,notes";

    const body = rows
      .map((row) => {
        const marginBase = row.contract || 1;
        const margin = Math.round(((row.contract - row.freelancerCost - row.opCost) / marginBase) * 100);
        const escapedNotes = (row.notes || "").replaceAll('"', '""');

        return [
          row.month,
          row.clientName,
          row.contract,
          row.freelancerCost,
          row.opCost,
          margin,
          row.status,
          `"${escapedNotes}"`,
        ].join(",");
      })
      .join("\n");

    return `${header}\n${body}`;
  }
}
