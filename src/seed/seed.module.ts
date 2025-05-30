import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { ChampionModule } from 'src/champion/champion.module';

@Module({
  controllers: [SeedController],
  providers: [SeedService],
  imports: [ChampionModule],
})
export class SeedModule {}
