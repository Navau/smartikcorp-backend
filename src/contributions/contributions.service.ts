import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateContributionDto } from './dto/create-contribution.dto';
import { UpdateContributionDto } from './dto/update-contribution.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Contribution } from './entities';
import { DataSource, Repository } from 'typeorm';
import { PaginationDto } from 'src/common/dtos';
import { Zone } from 'src/zones/entities';
import { Country } from 'src/countries/entities';

@Injectable()
export class ContributionsService {
  private readonly logger = new Logger('ContributionsService');

  constructor(
    @InjectRepository(Contribution)
    private readonly contributionRepository: Repository<Contribution>,
    private readonly dataSource: DataSource,

    @InjectRepository(Zone)
    private readonly zoneRepository: Repository<Zone>,
    @InjectRepository(Country)
    private readonly countryRepository: Repository<Country>,
  ) {}

  async create(createContributionDto: CreateContributionDto) {
    try {
      const contributionDetail = createContributionDto;
      const { countryId, zoneId } = contributionDetail;

      const zone = await this.zoneRepository.findOne({
        where: { id: zoneId },
      });
      const country = await this.countryRepository.findOne({
        where: { id: countryId },
      });

      if (!zone)
        throw new NotFoundException(`Zone with id ${zoneId} not found`);
      if (!country)
        throw new NotFoundException(`Country with id ${countryId} not found`);

      const contribution = this.contributionRepository.create({
        ...contributionDetail,
        zone,
        country,
      });

      await this.contributionRepository.save(contribution);

      return contribution;
    } catch (err) {
      throw err;
    }
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;

    try {
      const contributions = await this.contributionRepository.find({
        take: limit,
        skip: offset,
      });

      return contributions;
    } catch (err) {
      throw err;
    }
  }

  async findById(uuid: string) {
    try {
      const contribution = await this.contributionRepository.findOneBy({
        id: uuid,
      });

      if (!contribution) throw new NotFoundException('Contribution not found');

      return contribution;
    } catch (err) {
      throw err;
    }
  }

  async update(uuid: string, updateContributionDto: UpdateContributionDto) {
    try {
      const toUpdate = updateContributionDto;
      const { countryId, zoneId } = toUpdate;

      const contribution = await this.contributionRepository.preload({
        id: uuid,
        ...toUpdate,
      });

      if (!contribution) throw new NotFoundException('Contribution not found');

      if (zoneId) {
        const zone = await this.zoneRepository.findOne({
          where: { id: zoneId },
        });
        if (!zone) throw new NotFoundException('Zone not found');
        contribution.zone = zone;
      }

      if (countryId) {
        const country = await this.countryRepository.findOne({
          where: { id: countryId },
        });
        if (!country) throw new NotFoundException('Country not found');
        contribution.country = country;
      }

      return await this.contributionRepository.save(contribution);
    } catch (err) {
      throw err;
    }
  }

  async remove(uuid: string) {
    const contribution = await this.findById(uuid);
    try {
      await this.contributionRepository.remove(contribution);
      return contribution;
    } catch (err) {
      throw err;
    }
  }

  async deleteAll() {
    try {
      const query =
        this.contributionRepository.createQueryBuilder('contribution');
      return await query.delete().where({}).execute();
    } catch (err) {
      throw err;
    }
  }
}
