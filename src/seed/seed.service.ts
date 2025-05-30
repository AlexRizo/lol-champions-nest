import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import {
  Champion,
  ChampResponse,
} from './interfaces/champion-response.interface';

@Injectable()
export class SeedService {
  private readonly axios: AxiosInstance = axios;

  async executeSeed() {
    const { data: response } = await this.axios.get<ChampResponse>(
      'https://ddragon.leagueoflegends.com/cdn/15.11.1/data/es_MX/champion.json',
    );

    const champions = response.data;
    const arrayChampions = Object.values(champions);

    const newChampions: Champion[] = arrayChampions.map(champion => {
      return {
        id: champion.id,
        name: champion.name,
        title: champion.title,
        key: champion.key,
      };
    });

    console.log(newChampions);

    return 'This action adds a new seed';
  }
}
