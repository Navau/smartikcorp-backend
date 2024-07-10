import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { Country } from 'src/countries/entities';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'zones' })
export class Zone {
  @ApiProperty({
    example: '29afd3d5-5057-4d60-901c-70c57a5184b4',
    description: 'Zone ID',
    uniqueItems: true,
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    example: 'Zone Name',
    description: 'Zone Name',
  })
  @Column({ type: 'varchar', length: 100 })
  @IsNotEmpty()
  name: string;

  @ManyToOne(() => Country, (country) => country.id, { eager: true })
  country: Country;

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
