import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';

export class CreateChampionDto {
  @IsString()
  @IsNotEmpty()
  readonly championId: string;

  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @IsNumber()
  @IsPositive()
  readonly key: number;
}
