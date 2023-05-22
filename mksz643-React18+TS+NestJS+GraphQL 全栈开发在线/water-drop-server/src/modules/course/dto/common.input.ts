import { Field, InputType } from '@nestjs/graphql';

@InputType()
class OrderTimeInput {
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

@InputType()
export class ReducibleTimeInput {
  @Field({
    description: '周几',
  })
  week: string;

  @Field(() => [OrderTimeInput], {
    description: '可约时间 json',
  })
  orderTime: OrderTimeInput[];
}
