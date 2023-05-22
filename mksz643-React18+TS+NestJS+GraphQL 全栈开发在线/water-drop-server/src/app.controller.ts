import { Controller, Get } from '@nestjs/common';
import { User } from './modules/user/models/user.entity';
import { UserService } from './modules/user/user.service';

@Controller()
export class AppController {
  constructor(private readonly userService: UserService) {}

  @Get('/create')
  async create(): Promise<boolean> {
    return await this.userService.create({
      name: '水滴超级管理员',
      desc: '管理员',
      tel: '8800888',
    });
  }

  @Get('/del')
  async del(): Promise<boolean> {
    return await this.userService.del('0d56828d-5b72-47c3-955a-f76caf4793f2');
  }

  @Get('/update')
  async update(): Promise<boolean> {
    return await this.userService.update(
      'cb71e40d-9f15-40ef-a137-1acaa38831f4',
      {
        name: '水滴超级管理员11111',
      },
    );
  }

  @Get('/find')
  async find(): Promise<User> {
    return await this.userService.find('cb71e40d-9f15-40ef-a137-1acaa38831f4');
  }
}
