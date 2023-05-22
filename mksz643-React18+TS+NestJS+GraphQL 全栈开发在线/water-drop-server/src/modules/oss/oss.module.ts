import { Module } from '@nestjs/common';
import { OSSResolver } from './oss.resolver';
import { OSSService } from './oss.service';

@Module({
  imports: [],
  providers: [OSSResolver, OSSService],
  exports: [],
})
export class OSSModule {}
