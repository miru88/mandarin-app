import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiEndpoints } from '../resources/api-endpoints';
import { firstValueFrom } from 'rxjs';
import { Vocabulary } from '../models/vocabulary.model';
import { Character } from '../models/character.model';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private readonly httpClient: HttpClient) {}


  async getAllCharacters() {
    return firstValueFrom(this.httpClient.get<Character[]>(ApiEndpoints.getAllCharacters()));// dont i need a return type
  } 


}
