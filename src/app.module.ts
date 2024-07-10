import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from './products/products.module';
import { ContributionsModule } from './contributions/contributions.module';
import { ContributionsDetailModule } from './contributions-detail/contributions-detail.module';
import { CountriesModule } from './countries/countries.module';
import { ZonesModule } from './zones/zones.module';
import { TarifsModule } from './tarifs/tarifs.module';
import { SeedModule } from './seed/seed.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      ssl: process.env.NODE_ENV === 'prod',
      extra:
        process.env.NODE_ENV === 'prod'
          ? { ssl: { rejectUnauthorized: false } }
          : {},
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      database: process.env.DB_NAME,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      autoLoadEntities: true, //? Carga las entidades automaticamente
      synchronize: true,
      // synchronize: process.env.NODE_ENV === 'dev', //? Sincroniza cualquier cambio que hay en la BD, usualmente no sea usa en produccion
    }),
    ProductsModule,
    ContributionsModule,
    ContributionsDetailModule,
    CountriesModule,
    ZonesModule,
    TarifsModule,
    SeedModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
