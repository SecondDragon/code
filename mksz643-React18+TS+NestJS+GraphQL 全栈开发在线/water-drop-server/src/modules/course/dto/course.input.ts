import { Field, InputType, PartialType } from '@nestjs/graphql';
import { ReducibleTimeInput } from './common.input';

@InputType()
export class CourseInput {
  @Field({
    description: '课程名称',
  })
  name: string;

  @Field({
    description: '课程描述',
    nullable: true,
  })
  desc: string;

  @Field({
    description: '适龄人群',
  })
  group: string;

  @Field({
    description: '适合基础',
  })
  baseAbility: string;

  @Field({
    description: '限制上课人数',
  })
  limitNumber: number;

  @Field({
    description: '持续时间',
  })
  duration: number;

  @Field({
    description: '预约信息',
    nullable: true,
  })
  reserveInfo: string;

  @Field({
    description: '退款信息',
    nullable: true,
  })
  refundInfo: string;

  @Field({
    description: '其他说明信息',
    nullable: true,
  })
  otherInfo: string;

  @Field(() => [ReducibleTimeInput], {
    description: '可约时间',
    nullable: true,
  })
  reducibleTime: ReducibleTimeInput[];
}

@InputType()
export class PartialCourseInput extends PartialType(CourseInput) {}
