import { Component, OnInit } from '@angular/core';
import { ApisprinttwoService } from 'src/app/services/apisprinttwo.service';

@Component({
  selector: 'app-zenquotes',
  templateUrl: './zenquotes.component.html',
  styleUrls: ['./zenquotes.component.scss']
})
export class ZenquotesComponent implements OnInit{
  quote: any;
  lowername:any;

  constructor(private quoteService: ApisprinttwoService) {}

  ngOnInit(): void {
    this.getQuoteRandomly();
  }

  getQuoteRandomly() {
    this.quoteService.getARandonQuote().subscribe((result) => {
      this.quote = result;
      this.lowername=result.author.toLowerCase().replace(/\s+/g, '-');;
      console.log(this.lowername)
    });
  }
}
