import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class CreateContributionDto {
  @ApiProperty({
    description: 'Name of the contribution',
    example: 'John Doe',
    type: 'string',
    nullable: false,
    minLength: 1,
    maxLength: 255,
  })
  @IsString()
  @MinLength(1)
  @MaxLength(255)
  name: string;

  @ApiProperty({
    description: 'Email of the contribution',
    example: 'pMkP3@example.com',
    type: 'string',
    nullable: false,
    minLength: 1,
    maxLength: 255,
  })
  @IsEmail()
  @IsString()
  @MinLength(1)
  @MaxLength(255)
  email: string;

  @ApiProperty({
    description: 'Phone of the contribution',
    example: '+1 1234567890',
    type: 'string',
    nullable: false,
    minLength: 1,
    maxLength: 50,
  })
  @IsString()
  @MinLength(1)
  @MaxLength(50)
  phone: string;

  @ApiProperty({
    description: 'Country id of the contribution',
    example: '29afd3d5-5057-4d60-901c-70c57a5184b4',
    type: 'string',
    nullable: false,
  })
  @IsUUID()
  @IsNotEmpty()
  countryId: string;

  @ApiProperty({
    description: 'Zone id of the contribution',
    example: '29afd3d5-5057-4d60-901c-70c57a5184b4',
    type: 'string',
    nullable: false,
  })
  @IsUUID()
  @IsNotEmpty()
  zoneId: string;

  @ApiProperty({
    description: 'Total cost of the contribution',
    example: 10.0,
    type: 'number',
    nullable: false,
  })
  @IsNumber()
  @Min(0)
  totalCost: number;

  @ApiProperty({
    description: 'Total price of the contribution',
    example: 10.0,
    type: 'number',
    nullable: false,
  })
  @IsNumber()
  @Min(0)
  totalPrice: number;

  @ApiProperty({
    description: 'Shipping cost of the contribution',
    example: 10.0,
    type: 'number',
    nullable: false,
  })
  @IsNumber()
  @Min(0)
  shippingCost: number;

  @ApiProperty({
    description: 'Total final of the contribution',
    example: 10.0,
    type: 'number',
    nullable: false,
  })
  @IsNumber()
  @Min(0)
  totalFinal: number;
}
