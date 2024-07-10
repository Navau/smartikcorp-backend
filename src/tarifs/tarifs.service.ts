import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateTarifDto } from './dto/create-tarif.dto';
import { UpdateTarifDto } from './dto/update-tarif.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Tarif } from './entities';
import { DataSource, Repository } from 'typeorm';
import { PaginationDto } from 'src/common/dtos';
import { Country } from 'src/countries/entities';
import { Zone } from 'src/zones/entities';

@Injectable()
export class TarifsService {
  private readonly logger = new Logger('TarifsService');

  constructor(
    @InjectRepository(Tarif)
    private readonly tarifRepository: Repository<Tarif>,
    private readonly dataSource: DataSource,

    @InjectRepository(Country)
    private readonly countryRepository: Repository<Country>,
    @InjectRepository(Zone)
    private readonly zoneRepository: Repository<Zone>,
  ) {}

  async create(createTarifDto: CreateTarifDto) {
    try {
      const { countryId, zoneId } = createTarifDto;

      const country = await this.countryRepository.findOne({
        where: { id: countryId },
      });

      const zone = await this.zoneRepository.findOne({
        where: { id: zoneId },
      });

      if (!country)
        throw new NotFoundException(
          `Contribution with id ${countryId} not found`,
        );
      if (!zone)
        throw new NotFoundException(`Product with id ${zoneId} not found`);

      const newContributionDetail = this.tarifRepository.create({
        ...createTarifDto,
        country: country,
        zone: zone,
      });

      await this.tarifRepository.save(newContributionDetail);

      return newContributionDetail;
    } catch (err) {
      throw err;
    }
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;

    try {
      const tarifs = await this.tarifRepository.find({
        take: limit,
        skip: offset,
      });

      return tarifs;
    } catch (err) {
      throw err;
    }
  }

  async findById(uuid: string) {
    try {
      const tarif = await this.tarifRepository.findOneBy({
        id: uuid,
      });

      if (!tarif) throw new NotFoundException('Tarif not found');

      return tarif;
    } catch (err) {
      throw err;
    }
  }

  async update(uuid: string, updateTarifDto: UpdateTarifDto) {
    try {
      const toUpdate = updateTarifDto;
      const tarif = await this.tarifRepository.preload({
        id: uuid,
        ...toUpdate,
      });

      if (!tarif) throw new NotFoundException('Tarif not found');

      return await this.tarifRepository.save(tarif);
    } catch (err) {
      throw err;
    }
  }

  async remove(uuid: string) {
    const tarif = await this.findById(uuid);
    try {
      await this.tarifRepository.remove(tarif);
      return tarif;
    } catch (err) {
      throw err;
    }
  }

  async deleteAll() {
    try {
      const query = this.tarifRepository.createQueryBuilder('tarif');
      return await query.delete().where({}).execute();
    } catch (err) {
      throw err;
    }
  }
}
