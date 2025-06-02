import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Champion, ChampionSchema } from './entities/champion.entity';
import { ChampionController } from './champion.controller';
import { ChampionService } from './champion.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [ChampionController],
  providers: [ChampionService],
  imports: [
    ConfigModule,
    MongooseModule.forFeature([
      {
        name: Champion.name,
        schema: ChampionSchema,
      },
    ]),
  ],
  exports: [MongooseModule],
})
export class ChampionModule {}
