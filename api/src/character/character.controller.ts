import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CharacterService } from './character.service';
import { CreateCharacterDto } from './dto/create-character.dto';
import { UpdateCharacterDto } from './dto/update-character.dto';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/auth/guard/roles.guard';

@Controller('character')
export class CharacterController {
  constructor(private readonly characterService: CharacterService) {}

  // @Post()
  // create(@Body() createCharacterDto: CreateCharacterDto) {
  //   return this.characterService.create(createCharacterDto);
  // }
  @Roles('ADMIN')
  @Get()
  findAll() {
    return this.characterService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.characterService.findOne(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: number, @Body() updateCharacterDto: UpdateCharacterDto) {
  //   return this.characterService.update(+id, updateCharacterDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: number) {
  //   return this.characterService.remove(+id);
  // }
}
