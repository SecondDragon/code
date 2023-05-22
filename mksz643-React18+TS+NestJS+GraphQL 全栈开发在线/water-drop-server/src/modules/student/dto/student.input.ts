import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class StudentInput {
  @Field({
    description: '昵称',
  })
  name: string;

  @Field({
    description: '手机号',
  })
  tel: string;

  @Field({
    description: '头像',
  })
  avatar: string;
}
