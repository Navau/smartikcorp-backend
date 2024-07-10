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
import { TarifsService } from './tarifs.service';
import { CreateTarifDto } from './dto/create-tarif.dto';
import { UpdateTarifDto } from './dto/update-tarif.dto';
import { PaginationDto } from 'src/common/dtos';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Tarifs')
@Controller('tarifs')
export class TarifsController {
  constructor(private readonly tarifsService: TarifsService) {}

  @Post()
  create(@Body() createTarifDto: CreateTarifDto) {
    return this.tarifsService.create(createTarifDto);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.tarifsService.findAll(paginationDto);
  }

  @Get(':uuid')
  findById(@Param('uuid') uuid: string) {
    return this.tarifsService.findById(uuid);
  }

  @Patch(':uuid')
  update(@Param('uuid') uuid: string, @Body() updateTarifDto: UpdateTarifDto) {
    return this.tarifsService.update(uuid, updateTarifDto);
  }

  @Delete(':uuid')
  remove(@Param('uuid') uuid: string) {
    return this.tarifsService.remove(uuid);
  }
}
