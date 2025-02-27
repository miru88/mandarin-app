import { Component, OnInit  } from '@angular/core';
import { HttpService } from '../http/http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{

  constructor(private readonly httpService: HttpService) {}



  stuff: any;

  async ngOnInit(): Promise<any>  {//how should i set the return type here???

    this.httpService.getAllCharacters().then((data) =>{
      this.stuff = data;
      console.log(this.stuff);
    })


    
    return;
  }

}
