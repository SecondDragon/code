import { ObjectType } from '@nestjs/graphql';

import { createResult, createResults } from '@/common/dto/result.type';
import { StudentType } from './student.type';

@ObjectType()
export class StudentResult extends createResult(StudentType) {}

@ObjectType()
export class StudentResults extends createResults(StudentType) {}
