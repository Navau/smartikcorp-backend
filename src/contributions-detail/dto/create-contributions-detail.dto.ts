import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsUUID, Min } from 'class-validator';

export class CreateContributionsDetailDto {
  @ApiProperty({
    description: 'Contribution ID',
    example: '29afd3d5-5057-4d60-901c-70c57a5184b4',
    type: 'string',
    nullable: false,
  })
  @IsUUID()
  @IsNotEmpty()
  contributionId: string;

  @ApiProperty({
    description: 'Product ID',
    example: '29afd3d5-5057-4d60-901c-70c57a5184b4',
    type: 'string',
    nullable: false,
  })
  @IsUUID()
  @IsNotEmpty()
  productId: string;

  @ApiProperty({
    description: 'Quantity',
    example: 10.0,
    type: 'number',
    nullable: false,
  })
  @IsNumber()
  @Min(0)
  quantity: number;

  @ApiProperty({
    description: 'Discount Product',
    example: 10.0,
    type: 'number',
    nullable: false,
  })
  @IsNumber()
  @Min(0)
  discountProduct: number;

  @ApiProperty({
    description: 'Discount Final',
    example: 10.0,
    type: 'number',
    nullable: false,
  })
  @IsNumber()
  @Min(0)
  discountFinal: number;

  @ApiProperty({
    description: 'Discounted Cost',
    example: 10.0,
    type: 'number',
    nullable: false,
  })
  @IsNumber()
  @Min(0)
  discountedCost: number;

  @ApiProperty({
    description: 'Discounted Price',
    example: 10.0,
    type: 'number',
    nullable: false,
  })
  @IsNumber()
  @Min(0)
  discountedPrice: number;
}
