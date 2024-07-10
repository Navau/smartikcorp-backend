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
import { ZonesService } from './zones.service';
import { CreateZoneDto } from './dto/create-zone.dto';
import { UpdateZoneDto } from './dto/update-zone.dto';
import { PaginationDto } from 'src/common/dtos';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Zones')
@Controller('zones')
export class ZonesController {
  constructor(private readonly zonesService: ZonesService) {}

  @Post()
  create(@Body() createZoneDto: CreateZoneDto) {
    return this.zonesService.create(createZoneDto);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.zonesService.findAll(paginationDto);
  }

  @Get(':uuid')
  findById(@Param('uuid') uuid: string) {
    return this.zonesService.findById(uuid);
  }

  @Patch(':uuid')
  update(@Param('uuid') uuid: string, @Body() updateZoneDto: UpdateZoneDto) {
    return this.zonesService.update(uuid, updateZoneDto);
  }

  @Delete(':uuid')
  remove(@Param('uuid') uuid: string) {
    return this.zonesService.remove(uuid);
  }
}
