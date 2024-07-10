import { ApiProperty } from '@nestjs/swagger';
import { IsDecimal, IsNotEmpty, IsNumber } from 'class-validator';
import { LogEntity } from 'src/common/entities';
import { Contribution } from 'src/contributions/entities';
import { Product } from 'src/products/entities';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'contributions_detail' })
export class ContributionsDetail extends LogEntity {
  @ApiProperty({
    example: '29afd3d5-5057-4d60-901c-70c57a5184b4',
    description: 'Contribution ID',
    uniqueItems: true,
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Contribution, (country) => country.id, { eager: true })
  contribution: Contribution;

  @ManyToOne(() => Product, (product) => product.id, { eager: true })
  product: Product;

  @ApiProperty({
    example: 100,
    description: 'Contribution Detail Quantity',
    uniqueItems: true,
  })
  @Column({ type: 'int' })
  @IsNotEmpty()
  quantity: number;

  @ApiProperty({
    example: 100,
    description: 'Contribution Detail Discount Product',
    uniqueItems: true,
  })
  @Column({ type: 'float' })
  @IsNumber({ allowInfinity: false, allowNaN: false })
  @IsDecimal({ decimal_digits: '1,2', locale: 'en-US' })
  discountProduct: number;

  @ApiProperty({
    example: 100,
    description: 'Contribution Detail Discount Final',
    uniqueItems: true,
  })
  @Column({ type: 'float' })
  @IsNumber({ allowInfinity: false, allowNaN: false })
  @IsDecimal({ decimal_digits: '1,2', locale: 'en-US' })
  discountFinal: number;

  @ApiProperty({
    example: 100,
    description: 'Contribution Detail Discounted Cost',
    uniqueItems: true,
  })
  @Column({ type: 'float' })
  @IsNumber({ allowInfinity: false, allowNaN: false })
  @IsDecimal({ decimal_digits: '1,2', locale: 'en-US' })
  discountedCost: number;

  @ApiProperty({
    example: 100,
    description: 'Contribution Detail Discounted Price',
    uniqueItems: true,
  })
  @Column({ type: 'float' })
  @IsNumber({ allowInfinity: false, allowNaN: false })
  @IsDecimal({ decimal_digits: '1,2', locale: 'en-US' })
  discountedPrice: number;
}
