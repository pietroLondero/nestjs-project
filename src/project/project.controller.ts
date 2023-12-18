import { Controller, UseGuards } from '@nestjs/common';
import { ProjectService } from './project.service';
import { Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common'
import { PermissionGuard } from '@pietro/common';
import { RoleService } from '@pietro/auth'


@Controller('project')
export class ProjectController {
  constructor(
    private readonly projectService: ProjectService,
    private readonly rolService: RoleService
  ) { }

  @Get()
  async findAll() {
    return await this.projectService.findAll()
  }

  @UseGuards(PermissionGuard)
  @Get(':id/user/:userId')
  async findOne(@Param('id') id: number, @Param('userId') userId: number) {
    return await this.projectService.findOne(id)
  }

  @Post()
  async create(@Body() body) {
    return await this.projectService.create(body)
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() body) {
    return await this.projectService.update(id, body)
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return await this.projectService.delete(id)
  }
}
