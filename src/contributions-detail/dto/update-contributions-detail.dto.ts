import { PartialType } from '@nestjs/swagger';
import { CreateContributionsDetailDto } from './create-contributions-detail.dto';

export class UpdateContributionsDetailDto extends PartialType(CreateContributionsDetailDto) {}
