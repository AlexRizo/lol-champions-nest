import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateChampionDto } from './dto/create-champion.dto';
import { UpdateChampionDto } from './dto/update-champion.dto';
import { isValidObjectId, Model } from 'mongoose';
import { Champion } from './entities/champion.entity';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ChampionService {
  constructor(
    @InjectModel(Champion.name)
    private readonly championModel: Model<Champion>,
  ) {}

  async create(createChampionDto: CreateChampionDto) {
    try {
      const champion = await this.championModel.create(createChampionDto);

      return champion;
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async findAll() {
    return await this.championModel.find();
  }

  async findOne(term: string) {
    let champion: Champion;

    if (!isNaN(+term)) {
      champion = await this.championModel.findOne({ key: term });
    }

    // ? Si el término es un ID de mongo válido, se busca por ID:
    if (isValidObjectId(term)) {
      champion = await this.championModel.findById(term);
    }

    // ? Si el término es un championId, se busca por championId:
    if (!champion) {
      champion = await this.championModel.findOne({ championId: term });
    }

    // ? Si no se encuentra el campeón, se lanza un error 404:
    if (!champion) {
      throw new NotFoundException(
        `Ningún campeón coincidecon el término: ${term}`,
      );
    }

    return champion;
  }

  async update(term: string, updateChampionDto: UpdateChampionDto) {
    const champion = await this.findOne(term);

    try {
      if (updateChampionDto.key) {
        const updatedChampion = await champion.updateOne(updateChampionDto, {
          new: true,
        });
        return updatedChampion;
      }

      if (updateChampionDto.championId) {
        const updatedChampion = await champion.updateOne(updateChampionDto, {
          new: true,
        });
        return updatedChampion;
      }
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async remove(id: string) {
    const result = await this.championModel.findOneAndDelete({ _id: id });

    if (!result) {
      throw new NotFoundException(`Campeón con ID: ${id} no encontrado`);
    }

    return {
      message: `Campeón eliminado correctamente: ${result.name}`,
    };
  }

  private handleExceptions(error: any) {
    if (error.code === 11000) {
      throw new BadRequestException(
        `El campeón ya existe. ${JSON.stringify(error.keyValue)}`,
      );
    }

    console.error(error);
    throw new InternalServerErrorException(
      'Ha ocurrido un error desconocido: [ERROR:500]',
    );
  }
}
