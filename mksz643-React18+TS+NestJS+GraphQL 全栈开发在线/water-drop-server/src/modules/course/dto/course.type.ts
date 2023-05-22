import { CommonType } from '@/common/dto/common.type';
import { Field, ObjectType } from '@nestjs/graphql';
import { ReducibleTimeType } from './common.type';

/**
 * 课程
 */
@ObjectType()
export class CourseType extends CommonType {
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

  @Field(() => [ReducibleTimeType], {
    description: '可约时间',
    nullable: true,
  })
  reducibleTime: ReducibleTimeType[];
}
