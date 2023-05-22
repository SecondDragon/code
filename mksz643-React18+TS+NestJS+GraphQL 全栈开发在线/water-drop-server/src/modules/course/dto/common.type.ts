import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
class OrderTimeType {
  @Field({
    description: '开始时间',
  })
  startTime: string;

  @Field({
    description: '结束时间',
  })
  endTime: string;

  @Field({
    description: 'key',
  })
  key: number;
}

@ObjectType()
export class ReducibleTimeType {
  @Field({
    description: '周几',
  })
  week: string;

  @Field(() => [OrderTimeType], {
    description: '可约时间 json',
  })
  orderTime: OrderTimeType[];
}
