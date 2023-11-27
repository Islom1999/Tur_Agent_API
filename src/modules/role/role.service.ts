import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { RoleDto } from './dto/role.dto';
import { PrismaService } from 'src/prisma';
import { Prisma } from '@prisma/client';
import { RoleType } from 'src/enumerations';
import { QueryDTO } from 'src/_query';

@Injectable()
export class RoleService {
  constructor(private _prisma: PrismaService) {}

  async create(roleDto: RoleDto) {
    try {
      const role = await this._prisma.role.create({ data: roleDto });
      return role;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002')
          throw new ForbiddenException('This role already exists');
      }
      throw error;
    }
  }

  async findAll() {
    const role = await this._prisma.role.findMany({
      orderBy: { id: 'asc' },
    });

    if (!role[0]) throw new HttpException('not found', HttpStatus.NOT_FOUND);

    return role;
  }

  async findAllPercentage(queryDto: QueryDTO) {
    const search = queryDto.search || '';
    const page = +queryDto.page || 1;
    const limit = +queryDto.limit || 25;
    const skip = (page - 1) * limit;
    const count = await this._prisma.role.count();

    const role = await this._prisma.role.findMany({
      orderBy: { id: 'asc' },
      where: {
        title: {
          contains: search,
          mode: 'insensitive',
        },
      },
      skip,
      take: limit,
    });

    if (!role[0]) throw new HttpException('not found', HttpStatus.NOT_FOUND);

    return { data: role, count };
  }

  async findOne(id: string) {
    const role = await this._prisma.role.findUnique({ where: { id } });
    if (!role) throw new HttpException('not found', HttpStatus.NOT_FOUND);

    return role;
  }

  async update(id: string, roleDto: RoleDto) {
    try {
      const existingRole = await this._prisma.role.findUnique({
        where: { id },
      });

      if (!existingRole) {
        throw new ForbiddenException(`Role with ID does not exist`);
      }
      if (existingRole.title === RoleType.SUPER_ADMIN) {
        throw new ForbiddenException(
          'Cannot update a role with title superAdmin',
        );
      }
      const role = await this._prisma.role.update({
        where: { id },
        data: roleDto,
      });
      return role;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002')
          throw new ForbiddenException('This role already exists');
      }
      throw error;
    }
  }

  async remove(id: string) {
    try {
      const existingRole = await this._prisma.role.findUnique({
        where: { id },
      });
      if (!existingRole) {
        throw new ForbiddenException(`Role with ID does not exist`);
      }
      if (existingRole.title === RoleType.SUPER_ADMIN) {
        throw new ForbiddenException(
          'Cannot delete a role with title superAdmin',
        );
      }

      const role = await this._prisma.role.delete({
        where: { id },
      });

      return role;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002')
          throw new ForbiddenException('This role already exists');
      }
      throw error;
    }
  }
}
