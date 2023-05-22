import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Page {
  @Field(() => Int)
  total: number;
  @Field(() => Int)
  pageNum?: number;
  @Field(() => Int)
  pageSize?: number;
}
