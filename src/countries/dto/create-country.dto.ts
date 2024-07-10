import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateCountryDto {
  @ApiProperty({
    description: 'Name of the country',
    example: 'Country Name',
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
    description: 'Status of the country',
    example: true,
    type: 'boolean',
    nullable: false,
  })
  @IsBoolean()
  active: boolean;

  @ApiProperty({
    description: 'Order of the country',
    example: 1,
    type: 'number',
    nullable: false,
  })
  @IsString()
  @IsBoolean()
  order: number;
}
