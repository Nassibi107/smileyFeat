import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateTeamMemberDto } from "./dto/create-team-member.dto";
import { UpdateSiteContentDto } from "./dto/update-site-content.dto";
import { UpdateTeamMemberDto } from "./dto/update-team-member.dto";

const DEFAULT_SITE_CONTENT = {
  id: 1,
  heroTitle: "We Build Revenue Infrastructure.",
  heroSubtitle:
    "We help business owners scale revenue by systemizing acquisition, eliminating operational chaos, and building predictable profit systems.",
  aboutTitle: "Infrastructure Over Guesswork.",
  aboutParagraph:
    "SMILEY was built to replace chaos, disconnected systems, and unclear metrics with structured revenue architecture that compounds month after month.",
  aboutHighlights: [
    "Operational clarity across acquisition, delivery, and reporting.",
    "Documented systems that continue working as the team grows.",
    "Executive visibility with reliable, decision-ready data.",
  ],
};

const DEFAULT_TEAM = [
  {
    name: "Yassine Nassibi",
    role: "Founder & CEO",
    specialty: "Revenue Architecture & Business Strategy",
    bio: "Architect of the SMILEY operating system. Turns business chaos into structured growth machines.",
    imageUrl: "",
    color: "#7A5CFF",
    displayOrder: 0,
    active: true,
  },
  {
    name: "Sarah Chen",
    role: "Head of Growth",
    specialty: "Acquisition Systems & Funnel Strategy",
    bio: "Builds acquisition engines with a focus on pipeline quality and sustainable CAC.",
    imageUrl: "",
    color: "#9C7CFF",
    displayOrder: 1,
    active: true,
  },
  {
    name: "Marcus Williams",
    role: "Operations Architect",
    specialty: "Process Automation & SOP Design",
    bio: "Designs operational systems that remove bottlenecks and protect delivery quality.",
    imageUrl: "",
    color: "#7A5CFF",
    displayOrder: 2,
    active: true,
  },
];

@Injectable()
export class ContentService {
  constructor(private readonly prisma: PrismaService) {}

  async getPublicContent() {
    await this.ensureSeedData();

    const [site, team] = await Promise.all([
      this.prisma.siteContent.findUnique({ where: { id: 1 } }),
      this.prisma.teamMember.findMany({
        where: { active: true },
        orderBy: [{ displayOrder: "asc" }, { createdAt: "asc" }],
      }),
    ]);

    return {
      site,
      team,
    };
  }

  async getAdminContent() {
    await this.ensureSeedData();

    const [site, team] = await Promise.all([
      this.prisma.siteContent.findUnique({ where: { id: 1 } }),
      this.prisma.teamMember.findMany({
        orderBy: [{ displayOrder: "asc" }, { createdAt: "asc" }],
      }),
    ]);

    return {
      site,
      team,
    };
  }

  async updateSiteContent(dto: UpdateSiteContentDto) {
    await this.ensureSeedData();

    const data: {
      heroTitle?: string;
      heroSubtitle?: string;
      aboutTitle?: string;
      aboutParagraph?: string;
      aboutHighlights?: string[];
    } = {
      heroTitle: dto.heroTitle,
      heroSubtitle: dto.heroSubtitle,
      aboutTitle: dto.aboutTitle,
      aboutParagraph: dto.aboutParagraph,
    };

    if (Array.isArray(dto.aboutHighlights)) {
      data.aboutHighlights = dto.aboutHighlights;
    }

    return this.prisma.siteContent.update({
      where: { id: 1 },
      data,
    });
  }

  createTeamMember(dto: CreateTeamMemberDto) {
    return this.prisma.teamMember.create({
      data: {
        ...dto,
        imageUrl: dto.imageUrl || null,
      },
    });
  }

  updateTeamMember(id: number, dto: UpdateTeamMemberDto) {
    return this.prisma.teamMember.update({
      where: { id },
      data: {
        ...dto,
        imageUrl: dto.imageUrl === undefined ? undefined : dto.imageUrl || null,
      },
    });
  }

  deleteTeamMember(id: number) {
    return this.prisma.teamMember.delete({ where: { id } });
  }

  private async ensureSeedData() {
    await this.prisma.siteContent.upsert({
      where: { id: 1 },
      update: {},
      create: DEFAULT_SITE_CONTENT,
    });

    const teamCount = await this.prisma.teamMember.count();
    if (teamCount === 0) {
      await this.prisma.teamMember.createMany({ data: DEFAULT_TEAM });
    }
  }
}
