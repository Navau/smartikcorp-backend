import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TarifsService } from './tarifs.service';
import { TarifsController } from './tarifs.controller';

import { Tarif } from './entities';
import { CommonModule } from 'src/common/common.module';
import { Country } from 'src/countries/entities';
import { Zone } from 'src/zones/entities';
import { CountriesModule } from 'src/countries/countries.module';

@Module({
  controllers: [TarifsController],
  providers: [TarifsService],
  imports: [
    TypeOrmModule.forFeature([Tarif, Country, Zone]),
    CommonModule,
    CountriesModule,
  ],
  exports: [TarifsService],
})
export class TarifsModule {}
