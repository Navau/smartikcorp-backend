import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ContributionsDetailService } from './contributions-detail.service';
import { ContributionsDetailsController } from './contributions-detail.controller';

import { ContributionsDetail } from './entities';
import { Product } from 'src/products/entities';
import { Contribution } from 'src/contributions/entities';

import { CommonModule } from 'src/common/common.module';
import { ContributionsModule } from 'src/contributions/contributions.module';
import { ProductsModule } from 'src/products/products.module';

@Module({
  controllers: [ContributionsDetailsController],
  providers: [ContributionsDetailService],
  imports: [
    TypeOrmModule.forFeature([ContributionsDetail, Contribution, Product]),
    CommonModule,
    ContributionsModule,
    ProductsModule,
  ],
  exports: [ContributionsDetailService],
})
export class ContributionsDetailModule {}
