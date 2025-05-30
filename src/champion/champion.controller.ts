import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ChampionService } from './champion.service';
import { CreateChampionDto } from './dto/create-champion.dto';
import { UpdateChampionDto } from './dto/update-champion.dto';
import { ParseMongoIdPipe } from 'src/common/pipes/parse-mongo-id.pipe';

@Controller('champion')
export class ChampionController {
  constructor(private readonly championService: ChampionService) {}

  @Post()
  create(@Body() createChampionDto: CreateChampionDto) {
    return this.championService.create(createChampionDto);
  }

  @Get()
  findAll() {
    return this.championService.findAll();
  }

  @Get(':term')
  findOne(@Param('term') term: string) {
    return this.championService.findOne(term);
  }

  @Patch(':term')
  update(
    @Param('term') term: string,
    @Body() updateChampionDto: UpdateChampionDto,
  ) {
    return this.championService.update(term, updateChampionDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseMongoIdPipe) id: string) {
    return this.championService.remove(id);
  }
}
