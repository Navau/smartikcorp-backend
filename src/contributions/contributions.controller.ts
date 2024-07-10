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
import { ContributionsService } from './contributions.service';
import { CreateContributionDto } from './dto/create-contribution.dto';
import { UpdateContributionDto } from './dto/update-contribution.dto';
import { PaginationDto } from 'src/common/dtos';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Contributions')
@Controller('contributions')
export class ContributionsController {
  constructor(private readonly contributionsService: ContributionsService) {}

  @Post()
  create(@Body() createContributionDto: CreateContributionDto) {
    return this.contributionsService.create(createContributionDto);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.contributionsService.findAll(paginationDto);
  }

  @Get(':uuid')
  findById(@Param('uuid') uuid: string) {
    return this.contributionsService.findById(uuid);
  }

  @Patch(':uuid')
  update(
    @Param('uuid') uuid: string,
    @Body() updateContributionDto: UpdateContributionDto,
  ) {
    return this.contributionsService.update(uuid, updateContributionDto);
  }

  @Delete(':uuid')
  remove(@Param('uuid') uuid: string) {
    return this.contributionsService.remove(uuid);
  }
}
