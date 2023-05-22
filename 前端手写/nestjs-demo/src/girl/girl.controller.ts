import { Controller,Get } from '@nestjs/common';

@Controller('girl')
export class GirlController {
@Get()
  getGirls():any{
    return{
      code:0,
      data:['翠花','小红','大丫'],
      msg:'请求女孩列表成功'
    }
  }

}
