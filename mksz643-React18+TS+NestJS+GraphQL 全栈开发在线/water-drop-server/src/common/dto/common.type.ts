import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CommonType {
  @Field()
  id: string;

  @Field()
  createdAt: Date;

  @Field({ nullable: true })
  createdBy: string;

  @Field({ nullable: true })
  updatedAt: Date;

  @Field({ nullable: true })
  updatedBy: string;

  @Field({ nullable: true })
  deletedAt: Date;

  @Field({ nullable: true })
  deletedBy: string;
}
