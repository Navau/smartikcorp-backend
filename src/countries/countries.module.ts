import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CountriesService } from './countries.service';
import { CountriesController } from './countries.controller';

import { Country } from './entities';
import { CommonModule } from 'src/common/common.module';

@Module({
  controllers: [CountriesController],
  providers: [CountriesService],
  imports: [TypeOrmModule.forFeature([Country]), CommonModule],
  exports: [CountriesService],
})
export class CountriesModule {}
