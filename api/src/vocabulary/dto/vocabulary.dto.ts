import { IsInt, IsString, IsOptional } from 'class-validator';

export class CreateVocabularyDto {

  @IsString()
  chinese: string;

  @IsString()
  pinyin: string;

  @IsString()
  english: string;

  @IsInt()
  number: number;
}

export class UpdateVocabularyDto {

  @IsInt()
  id: number;

  @IsOptional()
  @IsString()
  chinese: string;

  @IsOptional()
  @IsString()
  pinyin: string;

  @IsOptional()
  @IsString()
  english: string;

  @IsInt()
  number: number;
}