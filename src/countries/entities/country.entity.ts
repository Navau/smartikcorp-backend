import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'countries' })
export class Country {
  @ApiProperty({
    example: '29afd3d5-5057-4d60-901c-70c57a5184b4',
    description: 'Country ID',
    uniqueItems: true,
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    example: 'Country Name',
    description: 'Country Name',
  })
  @Column({ type: 'varchar', length: 100 })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: true,
    description: 'Activo',
  })
  @Column({ type: 'boolean' })
  @IsNotEmpty()
  active: boolean;

  @ApiProperty({
    example: 1,
    description: 'Order',
  })
  @Column({ type: 'int', default: 1 })
  order: number;
}
