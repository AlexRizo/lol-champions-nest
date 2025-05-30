import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { ChampResponse } from './interfaces/champion-response.interface';
import { Champion } from 'src/champion/entities/champion.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class SeedService {
  private readonly axios: AxiosInstance = axios;

  constructor(
    @InjectModel(Champion.name)
    private readonly championModel: Model<Champion>,
  ) {}

  async executeSeed() {
    await this.championModel.deleteMany();

    const { data: response } = await this.axios.get<ChampResponse>(
      'https://ddragon.leagueoflegends.com/cdn/15.11.1/data/es_MX/champion.json',
    );

    const champions = response.data;
    const arrayChampions = Object.values(champions);

    const championsToInsert = arrayChampions.map(champ => ({
      championId: champ.id,
      name: champ.name,
      title: champ.title,
      key: champ.key,
    }));

    await this.championModel.insertMany(championsToInsert);

    return 'Se ha ejecutado el seed';
  }
}
