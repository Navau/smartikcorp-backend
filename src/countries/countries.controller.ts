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
import { CountriesService } from './countries.service';
import { CreateCountryDto } from './dto/create-country.dto';
import { UpdateCountryDto } from './dto/update-country.dto';
import { PaginationDto } from 'src/common/dtos';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Countries')
@Controller('countries')
export class CountriesController {
  constructor(private readonly countriesService: CountriesService) {}

  @Post()
  create(@Body() createCountryDto: CreateCountryDto) {
    return this.countriesService.create(createCountryDto);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.countriesService.findAll(paginationDto);
  }

  @Get(':uuid')
  findById(@Param('uuid') uuid: string) {
    return this.countriesService.findById(uuid);
  }

  @Patch(':uuid')
  update(
    @Param('uuid') uuid: string,
    @Body() updateCountryDto: UpdateCountryDto,
  ) {
    return this.countriesService.update(uuid, updateCountryDto);
  }

  @Delete(':uuid')
  remove(@Param('uuid') uuid: string) {
    return this.countriesService.remove(uuid);
  }
}
