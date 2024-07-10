import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateCountryDto } from './dto/create-country.dto';
import { UpdateCountryDto } from './dto/update-country.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Country } from './entities';
import { DataSource, Repository } from 'typeorm';
import { PaginationDto } from 'src/common/dtos';

@Injectable()
export class CountriesService {
  private readonly logger = new Logger('CountriesService');

  constructor(
    @InjectRepository(Country)
    private readonly countryRepository: Repository<Country>,
    private readonly dataSource: DataSource,
  ) {}

  async create(createCountryDto: CreateCountryDto) {
    try {
      const countryDetail = createCountryDto;

      const country = this.countryRepository.create(countryDetail);

      await this.countryRepository.save(country);

      return country;
    } catch (err) {
      throw err;
    }
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;

    try {
      const countries = await this.countryRepository.find({
        take: limit,
        skip: offset,
      });

      return countries;
    } catch (err) {
      throw err;
    }
  }

  async findById(uuid: string) {
    try {
      const country = await this.countryRepository.findOneBy({
        id: uuid,
      });

      if (!country) throw new NotFoundException('Country not found');

      return country;
    } catch (err) {
      throw err;
    }
  }

  async update(uuid: string, updateCountryDto: UpdateCountryDto) {
    try {
      const toUpdate = updateCountryDto;
      const country = await this.countryRepository.preload({
        id: uuid,
        ...toUpdate,
      });

      if (!country) throw new NotFoundException('Country not found');

      return await this.countryRepository.save(country);
    } catch (err) {
      throw err;
    }
  }

  async remove(uuid: string) {
    const country = await this.findById(uuid);
    try {
      await this.countryRepository.remove(country);
      return country;
    } catch (err) {
      throw err;
    }
  }

  async deleteAll() {
    try {
      const query = this.countryRepository.createQueryBuilder('country');
      return await query.delete().where({}).execute();
    } catch (err) {
      throw err;
    }
  }
}
