import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project, Project2User } from '../entities';
import { BaseServiceInterface, PermissionQuery } from '@pietro/common';

@Injectable()
export class ProjectService implements BaseServiceInterface {
  constructor(
    @InjectRepository(Project) private readonly projectRepository: Repository<Project>,
    @InjectRepository(Project2User) private readonly project2UserRepository: Repository<Project2User>
  ) { }

  async findAll(): Promise<Project[]> {
    return await this.projectRepository.find();
  }

  async findOne(id: number): Promise<Project> {
    return await this.projectRepository.findOne({ where: { id } });
  }

  async create(project: Project): Promise<Project> {
    return await this.projectRepository.save(project);
  }

  async update(id: number, project: Project): Promise<Project> {
    await this.projectRepository.update(id, project);
    return await this.projectRepository.findOne({ where: { id } });
  }

  async delete(id: number): Promise<Project> {
    const project = await this.projectRepository.findOne({ where: { id } });
    if (!project) {
      throw new Error(`Project with id ${id} not found`);
    }
    await this.projectRepository.delete(id);
    return project;
  }

  async checkPermissionRbac(userId: any, id: any, requestMethod: string): Promise<boolean> {
    const project = await this.projectRepository.findOne({ where: { id } });
    if (!project) {
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: 'Project not found',
      }, HttpStatus.NOT_FOUND, {
        cause: 'Project not found'
      });
    }
    console.log('PROJECT_' + id + '_GET');
    const test = await this.projectRepository.findOne({
      where: {
        group: {
          users: {
            id: userId
          },
          roles: {
            code: 'PROJECT_' + id + '_' + requestMethod
          }
        },
        id: id
      }
    });

    return !!test;
  }

  async checkPermissionAbac(userId: number, id: number, query: PermissionQuery): Promise<boolean> {
    const test2 = await this.project2UserRepository.findOne({
      where: {
        project: {
          id: id
        },
        user: {
          id: userId
        },
        ...query
      }
    });
    console.log(test2);

    return !!test2;
  }
}
