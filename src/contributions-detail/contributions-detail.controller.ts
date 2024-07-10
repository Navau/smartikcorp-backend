import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ContributionsDetailService } from './contributions-detail.service';
import { CreateContributionsDetailDto } from './dto/create-contributions-detail.dto';
import { UpdateContributionsDetailDto } from './dto/update-contributions-detail.dto';
import { PaginationDto } from 'src/common/dtos';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Contributions Details')
@Controller('contributionDetails')
export class ContributionsDetailsController {
  constructor(
    private readonly contributionDetailsService: ContributionsDetailService,
  ) {}

  @Post()
  create(@Body() createContributionDetailDto: CreateContributionsDetailDto) {
    return this.contributionDetailsService.create(createContributionDetailDto);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.contributionDetailsService.findAll(paginationDto);
  }

  @Get(':uuid')
  findById(@Param('uuid') uuid: string) {
    return this.contributionDetailsService.findById(uuid);
  }

  @Patch(':uuid')
  update(
    @Param('uuid') uuid: string,
    @Body() updateContributionDetailDto: UpdateContributionsDetailDto,
  ) {
    return this.contributionDetailsService.update(
      uuid,
      updateContributionDetailDto,
    );
  }

  @Delete(':uuid')
  remove(@Param('uuid') uuid: string) {
    return this.contributionDetailsService.remove(uuid);
  }
}
