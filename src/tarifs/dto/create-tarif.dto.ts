import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsUUID, Min } from 'class-validator';

export class CreateTarifDto {
  @ApiProperty({
    description: 'Country ID',
    example: '29afd3d5-5057-4d60-901c-70c57a5184b4',
    type: 'string',
    nullable: false,
  })
  @IsUUID()
  @IsNotEmpty()
  countryId: string;

  @ApiProperty({
    description: 'Zone ID',
    example: '29afd3d5-5057-4d60-901c-70c57a5184b4',
    type: 'string',
    nullable: false,
  })
  @IsUUID()
  @IsNotEmpty()
  zoneId: string;

  @ApiProperty({
    description: 'Range in kg',
    example: 10.0,
    type: 'number',
    nullable: false,
  })
  @IsNumber()
  @Min(0)
  range_kg: number;

  @ApiProperty({
    description: 'Price',
    example: 10.0,
    type: 'number',
    nullable: false,
  })
  @IsNumber()
  @Min(0)
  price: number;
}
