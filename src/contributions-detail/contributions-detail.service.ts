import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateContributionsDetailDto } from './dto/create-contributions-detail.dto';
import { UpdateContributionsDetailDto } from './dto/update-contributions-detail.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ContributionsDetail } from './entities';
import { DataSource, Repository } from 'typeorm';
import { PaginationDto } from 'src/common/dtos';
import { Contribution } from 'src/contributions/entities';
import { Product } from 'src/products/entities';

@Injectable()
export class ContributionsDetailService {
  private readonly logger = new Logger('ContributionsDetailService');

  constructor(
    @InjectRepository(ContributionsDetail)
    private readonly contributionDetailRepository: Repository<ContributionsDetail>,
    private readonly dataSource: DataSource,

    @InjectRepository(Contribution)
    private readonly contributionRepository: Repository<Contribution>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async create(createContributionDto: CreateContributionsDetailDto) {
    try {
      const { contributionId, productId } = createContributionDto;

      const contribution = await this.contributionRepository.findOne({
        where: { id: contributionId },
      });
      const product = await this.productRepository.findOne({
        where: { id: productId },
      });

      if (!contribution)
        throw new NotFoundException(
          `Contribution with id ${contributionId} not found`,
        );
      if (!product)
        throw new NotFoundException(`Product with id ${productId} not found`);

      const newContributionDetail = this.contributionDetailRepository.create({
        ...createContributionDto,
        contribution,
        product,
      });

      await this.contributionDetailRepository.save(newContributionDetail);

      return newContributionDetail;
    } catch (err) {
      throw err;
    }
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;

    try {
      const contributionsDetail = await this.contributionDetailRepository.find({
        take: limit,
        skip: offset,
      });

      return contributionsDetail;
    } catch (err) {
      throw err;
    }
  }

  async findById(uuid: string) {
    try {
      const contributionDetail =
        await this.contributionDetailRepository.findOneBy({
          id: uuid,
        });

      if (!contributionDetail)
        throw new NotFoundException('Contribution Detail not found');

      return contributionDetail;
    } catch (err) {
      throw err;
    }
  }

  async update(
    uuid: string,
    updateContributionDto: UpdateContributionsDetailDto,
  ) {
    try {
      const { contributionId, productId } = updateContributionDto;

      const oldContributionDetail =
        await this.contributionDetailRepository.preload({
          id: uuid,
          ...updateContributionDto,
        });

      if (!oldContributionDetail)
        throw new NotFoundException('Contribution Detail not found');

      if (contributionId) {
        const contribution = await this.contributionRepository.findOne({
          where: { id: contributionId },
        });
        if (!contribution)
          throw new NotFoundException('Contribution not found');
        oldContributionDetail.contribution = contribution;
      }

      if (productId) {
        const product = await this.productRepository.findOne({
          where: { id: productId },
        });
        if (!product) throw new NotFoundException('Product not found');
        oldContributionDetail.product = product;
      }

      return await this.contributionDetailRepository.save(
        oldContributionDetail,
      );
    } catch (err) {
      throw err;
    }
  }

  async remove(uuid: string) {
    const contributionDetail = await this.findById(uuid);
    try {
      await this.contributionDetailRepository.remove(contributionDetail);
      return contributionDetail;
    } catch (err) {
      throw err;
    }
  }

  async deleteAll() {
    try {
      const query =
        this.contributionDetailRepository.createQueryBuilder(
          'contributionDetail',
        );
      return await query.delete().where({}).execute();
    } catch (err) {
      throw err;
    }
  }
}
