import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ContributionsService } from './contributions.service';
import { ContributionsController } from './contributions.controller';

import { Contribution } from './entities';
import { CommonModule } from 'src/common/common.module';
import { Zone } from 'src/zones/entities';
import { Country } from 'src/countries/entities';
import { ZonesModule } from 'src/zones/zones.module';
import { CountriesModule } from 'src/countries/countries.module';

@Module({
  controllers: [ContributionsController],
  providers: [ContributionsService],
  imports: [
    TypeOrmModule.forFeature([Contribution, Zone, Country]),
    CommonModule,
    ZonesModule,
    CountriesModule,
  ],
  exports: [ContributionsService],
})
export class ContributionsModule {}
