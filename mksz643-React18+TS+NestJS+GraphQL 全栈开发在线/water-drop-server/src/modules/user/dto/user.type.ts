import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserType {
  @Field()
  id?: string;
  @Field({ description: '昵称' })
  name?: string;
  @Field({ description: '简介' })
  desc: string;
  @Field({ description: 'tel' })
  tel: string;
  @Field({ description: '头像', nullable: true })
  avatar?: string;
}
