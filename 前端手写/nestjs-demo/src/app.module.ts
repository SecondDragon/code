import { Module } from '@nestjs/common';
import { GirlModule } from './girl/girl.module';
import { BoyModule } from './boy/boy.module';

@Module({
  imports: [GirlModule, BoyModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
