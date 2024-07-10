import { ApiProperty } from '@nestjs/swagger';
import { IsDecimal, IsNotEmpty, IsNumber } from 'class-validator';
import { LogEntity } from 'src/common/entities';
import { Country } from 'src/countries/entities';
import { Zone } from 'src/zones/entities';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'tarifs' })
export class Tarif extends LogEntity {
  @ApiProperty({
    example: '29afd3d5-5057-4d60-901c-70c57a5184b4',
    description: 'Tarif ID',
    uniqueItems: true,
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Country, (country) => country.id, { eager: true })
  country: Country;

  @ManyToOne(() => Zone, (zone) => zone.id, { eager: true })
  zone: Zone;

  @ApiProperty({
    example: 100,
    description: 'Tarif Range in kg',
    uniqueItems: true,
  })
  @Column({ type: 'int' })
  @IsNotEmpty()
  range_kg: number;

  @ApiProperty({
    example: 100,
    description: 'Tarif Price',
    uniqueItems: true,
  })
  @Column({ type: 'float' })
  @IsNumber({ allowInfinity: false, allowNaN: false })
  @IsDecimal({ decimal_digits: '1,2', locale: 'en-US' })
  price: number;
}
