import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { IsNotEmpty, IsNumber, IsDecimal, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { LogEntity } from 'src/common/entities';

@Entity({ name: 'products' })
export class Product extends LogEntity {
  @ApiProperty({
    example: '29afd3d5-5057-4d60-901c-70c57a5184b4',
    description: 'Product ID',
    uniqueItems: true,
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    example: '123456',
    description: 'Product Code',
    uniqueItems: true,
  })
  @Column({ type: 'varchar', length: 20 })
  @IsNotEmpty()
  code: string;

  @ApiProperty({
    example: 'Product Name',
    description: 'Product Name',
  })
  @Column({ type: 'varchar', length: 100 })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'Product Model',
    description: 'Product Model',
  })
  @Column({ type: 'varchar', length: 30 })
  @IsNotEmpty()
  model: string;

  @ApiProperty({
    example: true,
    description: 'Active',
  })
  @Column({ type: 'boolean', default: true })
  @IsBoolean()
  @IsNotEmpty()
  active: boolean;

  @ApiProperty({
    example: 'KG',
    description: 'Unit Measure',
  })
  @Column({ type: 'varchar', length: 20, default: '' })
  @IsNotEmpty()
  unitMeasure: string;

  @ApiProperty({
    example: 10.0,
    description: 'Weight',
  })
  @Column({ type: 'float' })
  @IsNumber({ allowInfinity: false, allowNaN: false })
  @IsDecimal({ decimal_digits: '1,2', locale: 'en-US' })
  weight: number;

  @ApiProperty({
    example: 10.0,
    description: 'Price',
  })
  @Column({ type: 'float', default: 0 })
  @IsNumber({ allowInfinity: false, allowNaN: false })
  @IsDecimal({ decimal_digits: '1,2', locale: 'en-US' })
  price: number;

  @ApiProperty({
    example: 10.0,
    description: 'FF Valencia',
  })
  @Column({ type: 'float', default: 0 })
  @IsNumber({ allowInfinity: false, allowNaN: false })
  @IsDecimal({ decimal_digits: '1,2', locale: 'en-US' })
  ffValencia: number;
}
