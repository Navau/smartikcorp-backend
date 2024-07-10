import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateZoneDto {
  @ApiProperty({
    description: 'Name of the zone',
    example: 'Zone Name',
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
    description: 'Country ID',
    example: '29afd3d5-5057-4d60-901c-70c57a5184b4',
    type: 'string',
    nullable: false,
  })
  @IsUUID()
  @IsNotEmpty()
  countryId: string;

  @ApiProperty({
    description: 'Status of the zone',
    example: true,
    type: 'boolean',
    nullable: false,
  })
  @IsBoolean()
  active: boolean;

  @ApiProperty({
    description: 'Order of the zone',
    example: 1,
    type: 'number',
    nullable: false,
  })
  @IsNotEmpty()
  order: number;
}
