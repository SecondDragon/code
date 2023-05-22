import { Field, ObjectType } from '@nestjs/graphql';

/**
 *  input
 */
@ObjectType()
export class OrgImageType {
  @Field({ nullable: true })
  id?: string;

  @Field()
  url: string;

  @Field({ nullable: true })
  remark?: string;
}
