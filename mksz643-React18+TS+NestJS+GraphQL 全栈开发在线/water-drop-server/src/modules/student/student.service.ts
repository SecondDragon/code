import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { Student } from './models/student.entity';
@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
  ) {}

  async findByAccount(account: string): Promise<Student> {
    return this.studentRepository.findOne({
      where: {
        account,
      },
    });
  }

  async create(entity: DeepPartial<Student>): Promise<boolean> {
    const res = await this.studentRepository.save(
      this.studentRepository.create(entity),
    );
    if (res) {
      return true;
    }
    return false;
  }

  async findById(id: string): Promise<Student> {
    return this.studentRepository.findOne({
      where: {
        id,
      },
    });
  }

  async updateById(id: string, entity: DeepPartial<Student>): Promise<boolean> {
    const res = await this.studentRepository.update(id, entity);
    if (res.affected > 0) {
      return true;
    }
    return false;
  }

  async findStudents({
    start,
    length,
  }: {
    start: number;
    length: number;
  }): Promise<[Student[], number]> {
    return this.studentRepository.findAndCount({
      take: length,
      skip: start,
      order: {
        createdAt: 'DESC',
      },
    });
  }
}
