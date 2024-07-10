import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { ProductsModule } from 'src/products/products.module';
import { ZonesModule } from 'src/zones/zones.module';
import { CountriesModule } from 'src/countries/countries.module';
import { TarifsModule } from 'src/tarifs/tarifs.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/products/entities';
import { Country } from 'src/countries/entities';
import { Zone } from 'src/zones/entities';
import { Tarif } from 'src/tarifs/entities';
import { ContributionsModule } from 'src/contributions/contributions.module';
import { ContributionsDetailModule } from 'src/contributions-detail/contributions-detail.module';
import { Contribution } from 'src/contributions/entities';
import { ContributionsDetail } from 'src/contributions-detail/entities';

@Module({
  controllers: [SeedController],
  providers: [SeedService],
  imports: [
    TypeOrmModule.forFeature([
      Product,
      Country,
      Zone,
      Tarif,
      Contribution,
      ContributionsDetail,
    ]),
    ProductsModule,
    ZonesModule,
    CountriesModule,
    TarifsModule,
    ContributionsModule,
    ContributionsDetailModule,
  ],
})
export class SeedModule {}
