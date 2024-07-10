import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ZonesService } from './zones.service';
import { ZonesController } from './zones.controller';

import { Zone } from './entities';
import { CommonModule } from 'src/common/common.module';
import { CountriesModule } from 'src/countries/countries.module';
import { Country } from 'src/countries/entities';

@Module({
  controllers: [ZonesController],
  providers: [ZonesService],
  imports: [
    TypeOrmModule.forFeature([Zone, Country]),
    CommonModule,
    CountriesModule,
  ],
  exports: [ZonesService],
})
export class ZonesModule {}
