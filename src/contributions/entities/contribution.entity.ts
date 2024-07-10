import { ApiProperty } from '@nestjs/swagger';
import { IsDecimal, IsNotEmpty, IsNumber } from 'class-validator';
import { LogEntity } from 'src/common/entities';
import { Country } from 'src/countries/entities';
import { Zone } from 'src/zones/entities';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'contributions' })
export class Contribution extends LogEntity {
  @ApiProperty({
    example: '29afd3d5-5057-4d60-901c-70c57a5184b4',
    description: 'Contribution ID',
    uniqueItems: true,
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    example: '',
    description: 'Contribution Name',
    uniqueItems: true,
  })
  @Column({ type: 'varchar', length: 255 })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: '',
    description: 'Contribution Email',
    uniqueItems: true,
  })
  @Column({ type: 'varchar', length: 255 })
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: '',
    description: 'Contribution Phone',
    uniqueItems: true,
  })
  @Column({ type: 'varchar', length: 50 })
  @IsNotEmpty()
  phone: string;

  @ApiProperty({
    example: '',
    description: 'Contribution Country',
    uniqueItems: true,
  })

  //? eager: Carga automaticamente la relacion
  @ManyToOne(() => Country, (country) => country.id, { eager: true })
  country: Country;

  @ManyToOne(() => Zone, (zone) => zone.id, { eager: true })
  zone: Zone;

  @ApiProperty({
    example: '',
    description: 'Contribution Total Cost',
    uniqueItems: true,
  })
  @Column({ type: 'float' })
  @IsNumber({ allowInfinity: false, allowNaN: false })
  @IsDecimal({ decimal_digits: '1,2', locale: 'en-US' })
  totalCost: number;

  @ApiProperty({
    example: '',
    description: 'Contribution Total Price',
    uniqueItems: true,
  })
  @Column({ type: 'float' })
  @IsNumber({ allowInfinity: false, allowNaN: false })
  @IsDecimal({ decimal_digits: '1,2', locale: 'en-US' })
  totalPrice: number;

  @ApiProperty({
    example: '',
    description: 'Contribution Shipping Cost',
    uniqueItems: true,
  })
  @Column({ type: 'float' })
  @IsNumber({ allowInfinity: false, allowNaN: false })
  @IsDecimal({ decimal_digits: '1,2', locale: 'en-US' })
  shippingCost: number;

  @ApiProperty({
    example: '',
    description: 'Contribution Total Final',
    uniqueItems: true,
  })
  @Column({ type: 'float' })
  @IsNumber({ allowInfinity: false, allowNaN: false })
  @IsDecimal({ decimal_digits: '1,2', locale: 'en-US' })
  totalFinal: number;
}
