import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { ContentService } from "./content.service";
import { CreateTeamMemberDto } from "./dto/create-team-member.dto";
import { UpdateSiteContentDto } from "./dto/update-site-content.dto";
import { UpdateTeamMemberDto } from "./dto/update-team-member.dto";

@Controller("content")
export class ContentController {
  constructor(private readonly contentService: ContentService) {}

  @Get("public")
  getPublic() {
    return this.contentService.getPublicContent();
  }

  @Get("admin")
  @UseGuards(JwtAuthGuard)
  getAdmin() {
    return this.contentService.getAdminContent();
  }

  @Put("site")
  @UseGuards(JwtAuthGuard)
  updateSite(@Body() dto: UpdateSiteContentDto) {
    return this.contentService.updateSiteContent(dto);
  }

  @Post("team")
  @UseGuards(JwtAuthGuard)
  createTeamMember(@Body() dto: CreateTeamMemberDto) {
    return this.contentService.createTeamMember(dto);
  }

  @Put("team/:id")
  @UseGuards(JwtAuthGuard)
  updateTeamMember(@Param("id", ParseIntPipe) id: number, @Body() dto: UpdateTeamMemberDto) {
    return this.contentService.updateTeamMember(id, dto);
  }

  @Delete("team/:id")
  @UseGuards(JwtAuthGuard)
  deleteTeamMember(@Param("id", ParseIntPipe) id: number) {
    return this.contentService.deleteTeamMember(id);
  }
}
