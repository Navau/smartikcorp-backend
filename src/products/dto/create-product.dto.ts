import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNumber,
  IsString,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class CreateProductDto {
  @ApiProperty({
    description: 'Code of the product',
    example: '123456',
    type: 'string',
    nullable: false,
    minLength: 1,
    maxLength: 20,
  })
  @IsString()
  @MinLength(1)
  @MaxLength(20)
  code: string;

  @ApiProperty({
    description: 'Name of the product',
    example: 'Product Name',
    type: 'string',
    nullable: false,
    minLength: 1,
    maxLength: 100,
  })
  @IsString()
  @MinLength(1)
  @MaxLength(100)
  name: string;

  @ApiProperty({
    description: 'Model of the product',
    example: 'Product Model',
    type: 'string',
    nullable: false,
    minLength: 0,
    maxLength: 30,
  })
  @IsString()
  @MinLength(0)
  @MaxLength(30)
  model: string;

  @ApiProperty({
    description: 'Status of the product',
    example: true,
    type: 'boolean',
    nullable: false,
  })
  @IsBoolean()
  active: boolean;

  @ApiProperty({
    description: 'Unit measure of the product',
    example: 'KG',
    type: 'string',
    nullable: false,
    minLength: 1,
    maxLength: 20,
  })
  @IsString()
  @MinLength(1)
  @MaxLength(20)
  unitMeasure: string;

  @ApiProperty({
    description: 'Weight of the product',
    example: 10.0,
    type: 'number',
    nullable: false,
  })
  @IsNumber()
  @Min(0)
  weight: number;

  @ApiProperty({
    description: 'Price of the product',
    example: 10.0,
    type: 'number',
    nullable: false,
  })
  @IsNumber()
  @Min(0)
  price: number;

  @ApiProperty({
    description: 'F.F. Valencia of the product',
    example: 10.0,
    type: 'number',
    nullable: false,
  })
  @IsNumber()
  @Min(0)
  ffValencia: number;
}
