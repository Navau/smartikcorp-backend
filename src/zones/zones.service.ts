import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateZoneDto } from './dto/create-zone.dto';
import { UpdateZoneDto } from './dto/update-zone.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Zone } from './entities';
import { DataSource, Repository } from 'typeorm';
import { PaginationDto } from 'src/common/dtos';
import { Country } from 'src/countries/entities';

@Injectable()
export class ZonesService {
  private readonly logger = new Logger('ZonesService');

  constructor(
    @InjectRepository(Zone)
    private readonly zoneRepository: Repository<Zone>,
    private readonly dataSource: DataSource,

    @InjectRepository(Country)
    private readonly countryRepository: Repository<Country>,
  ) {}

  async create(createZoneDto: CreateZoneDto) {
    try {
      const { countryId } = createZoneDto;

      const country = await this.countryRepository.findOne({
        where: { id: countryId },
      });

      if (!country)
        throw new NotFoundException(`Country with id ${countryId} not found`);

      const newContributionDetail = this.zoneRepository.create({
        ...createZoneDto,
        country: country,
      });

      await this.zoneRepository.save(newContributionDetail);

      return newContributionDetail;
    } catch (err) {
      throw err;
    }
  }

  async findAll(paginationDto: PaginationDto) {
    try {
      const zones = await this.zoneRepository.find();

      return zones;
    } catch (err) {
      throw err;
    }
  }

  async findById(uuid: string) {
    try {
      const zone = await this.zoneRepository.findOneBy({
        id: uuid,
      });

      if (!zone) throw new NotFoundException('Zone not found');

      return zone;
    } catch (err) {
      throw err;
    }
  }

  async update(uuid: string, updateZoneDto: UpdateZoneDto) {
    try {
      const toUpdate = updateZoneDto;
      const zone = await this.zoneRepository.preload({
        id: uuid,
        ...toUpdate,
      });

      if (!zone) throw new NotFoundException('Zone not found');

      return await this.zoneRepository.save(zone);
    } catch (err) {
      throw err;
    }
  }

  async remove(uuid: string) {
    const zone = await this.findById(uuid);
    try {
      await this.zoneRepository.remove(zone);
      return zone;
    } catch (err) {
      throw err;
    }
  }

  async deleteAll() {
    try {
      const query = this.zoneRepository.createQueryBuilder('zone');
      return await query.delete().where({}).execute();
    } catch (err) {
      throw err;
    }
  }
}
