import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { ProductsService } from '../products/products.service';
import { find, forEach, map } from 'lodash';
import { InjectRepository } from '@nestjs/typeorm';
import { seedData } from './data/seed-data';
import { Country } from 'src/countries/entities';
import { Zone } from 'src/zones/entities';
import { Tarif } from 'src/tarifs/entities';
import { Product } from 'src/products/entities';
import { CountriesService } from 'src/countries/countries.service';
import { ContributionsService } from 'src/contributions/contributions.service';
import { ContributionsDetailService } from 'src/contributions-detail/contributions-detail.service';
import { ZonesService } from 'src/zones/zones.service';
import { TarifsService } from 'src/tarifs/tarifs.service';

@Injectable()
export class SeedService {
  constructor(
    private readonly productsService: ProductsService,
    private readonly countriesService: CountriesService,
    private readonly zonesService: ZonesService,
    private readonly tarifsService: TarifsService,
    private readonly contributionsService: ContributionsService,
    private readonly contributionsDetailsService: ContributionsDetailService,

    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,

    @InjectRepository(Country)
    private readonly countryRepository: Repository<Country>,

    @InjectRepository(Zone)
    private readonly zoneRepository: Repository<Zone>,

    @InjectRepository(Tarif)
    private readonly tarifRepository: Repository<Tarif>,
  ) {}
  async runSeeds() {
    try {
      await this.deleteTables();
      return await this.insertTables();
    } catch (err) {
      throw err;
    }
  }

  private async deleteTables() {
    try {
      await this.contributionsDetailsService.deleteAll();
      await this.contributionsService.deleteAll();
      await this.tarifsService.deleteAll();
      await this.zonesService.deleteAll();
      await this.countriesService.deleteAll();
      await this.productsService.deleteAll();
    } catch (err) {
      throw err;
    }
  }

  private async insertTables() {
    try {
      const products = seedData.products;
      const countries = seedData.countries;
      const zones = seedData.zones;
      const tarifs = seedData.tarifs;

      const productPromises = map(products, (product) => {
        return this.productsService.create({
          code: product.code,
          name: product.name,
          price: product.price,
          active: product.active,
          ffValencia: product.ffValencia,
          model: '',
          unitMeasure: '',
          weight: product.weight,
        });
      });

      const productResults = await Promise.all(productPromises);

      const countryPromises = map(countries, (country) => {
        return this.countriesService.create({
          name: country.name,
          active: country.active,
          order: country.order,
        });
      });

      const countryResults = await Promise.all(countryPromises);

      const zonePromises = map(zones, (zone) => {
        return this.zonesService.create({
          name: zone.name,
          active: zone.active,
          order: zone.order,
          countryId: find(countryResults, { order: zone.countryId }).id,
        });
      });

      const zoneResults = await Promise.all(zonePromises);

      const tarifPromises = map(tarifs, (tarif) => {
        const _price = parseFloat(tarif.price);

        return this.tarifsService.create({
          range_kg: parseFloat(tarif.range_kg as any),
          price: _price,
          countryId: find(countryResults, { order: tarif.countryId }).id,
          zoneId: find(zoneResults, { order: tarif.zoneId }).id,
        });
      });

      const tarifResults = await Promise.all(tarifPromises);

      return {
        products: productResults,
        countries: countryResults,
        zones: zoneResults,
        tarifs: tarifResults,
      };
    } catch (err) {
      throw err;
    }
  }
}
