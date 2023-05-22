import { OrgImageService } from './../orgImage/orgImage.service';
import { OrgImage } from './../orgImage/models/orgImage.entity';
import { OrganizationResolver } from './organization.resolver';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Organization } from './models/organization.entity';
import { OrganizationService } from './organization.service';

@Module({
  imports: [TypeOrmModule.forFeature([Organization, OrgImage])],
  providers: [OrganizationService, OrganizationResolver, OrgImageService],
  exports: [OrganizationService],
})
export class OrganizationModule {}
