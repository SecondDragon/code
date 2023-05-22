import { Module } from '@nestjs/common';
import { GirlController } from './girl.controller';

@Module({
  controllers: [GirlController]
})
export class GirlModule {
  
}
