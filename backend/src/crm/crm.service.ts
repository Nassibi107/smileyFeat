import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateLeadDto } from "./dto/create-lead.dto";

@Injectable()
export class CrmService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.lead.findMany({
      orderBy: { createdAt: "desc" },
    });
  }

  create(dto: CreateLeadDto) {
    return this.prisma.lead.create({
      data: dto,
    });
  }
}
