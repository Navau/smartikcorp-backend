import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities';
import { DataSource, Repository } from 'typeorm';
import { PaginationDto } from 'src/common/dtos';

@Injectable()
export class ProductsService {
  private readonly logger = new Logger('ProductsService');
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    private readonly dataSource: DataSource,
  ) {}

  async create(createProductDto: CreateProductDto) {
    try {
      const productDetail = createProductDto;

      const product = this.productRepository.create(productDetail);

      await this.productRepository.save(product);

      return product;
    } catch (err) {
      throw err;
    }
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;

    try {
      const products = await this.productRepository.find({
        take: limit,
        skip: offset,
      });

      return products;
    } catch (err) {
      throw err;
    }
  }

  async findById(uuid: string) {
    try {
      const product = await this.productRepository.findOneBy({
        id: uuid,
      });

      if (!product) throw new NotFoundException('Product not found');

      return product;
    } catch (err) {
      throw err;
    }
  }

  async update(uuid: string, updateProductDto: UpdateProductDto) {
    try {
      const toUpdate = updateProductDto;
      const product = await this.productRepository.preload({
        id: uuid,
        ...toUpdate,
      });

      if (!product) throw new NotFoundException('Product not found');

      return await this.productRepository.save(product);
    } catch (err) {
      throw err;
    }
  }

  async remove(uuid: string) {
    const product = await this.findById(uuid);
    try {
      await this.productRepository.remove(product);
      return product;
    } catch (err) {
      throw err;
    }
  }

  async deleteAll() {
    try {
      const query = this.productRepository.createQueryBuilder('product');
      return await query.delete().where({}).execute();
    } catch (err) {
      throw err;
    }
  }
}
