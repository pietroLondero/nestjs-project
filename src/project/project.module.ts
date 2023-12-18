import { Global, Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project, Project2User } from 'src/entities';
import { PermissionGuard } from '@pietro/common';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Project, Project2User])],
  providers: [
    {
      provide: 'BaseService',
      useClass: ProjectService,
    },
    ProjectService,
    PermissionGuard
  ],
  exports: [ProjectService,
    'BaseService'
  ],
  controllers: [ProjectController],
})
export class ProjectModule { }
