import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { SharedService } from '../shared-service/shared.service';

@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.css']
})
export class BarComponent implements OnInit {


    private data = [
      {
        "day_of_week": "Monday",
        "count": 191
      },
      
      {
        "day_of_week": "Tuesday  ",
        "count": 227
      },
      {
        "day_of_week": "Wednesday",
        "count": 220
      },
     
      {
        "day_of_week": "Thursday ",
        "count": 241
      },
      {
        "day_of_week": "Friday   ",
        "count": 210
      },
      {
        "day_of_week": "Saturday ",
        "count": 32
      }
    ];

    
    private svg: any;
    private margin = 50;
    private width = 750 - (this.margin * 2);
    private height = 400 - (this.margin * 2);

    constructor(private sharedService: SharedService) { }

   

    private createSvg(): void {
      this.svg = d3.select("figure#bar")
      .append("svg")
      .attr("width", this.width + (this.margin * 2))
      .attr("height", this.height + (this.margin * 2))
      .append("g")
      .attr("transform", "translate(" + this.margin + "," + this.margin + ")");
  }

  private drawBars(data: any[]): void {
    // Create the X-axis band scale
    const x = d3.scaleBand()
    .range([0, this.width])
    .domain(data.map(d => d.day_of_week))
    .padding(0.2);

    // Draw the X-axis on the DOM
    this.svg.append("g")
    .attr("transform", "translate(0," + this.height + ")")
    .call(d3.axisBottom(x))
    .selectAll("text")
    .attr("transform", "translate(-10,0)rotate(-45)")
    .style("text-anchor", "end");

    // Create the Y-axis band scale
    const y = d3.scaleLinear()
    .domain([0, 300])
    .range([this.height, 0]);

    // Draw the Y-axis on the DOM
    this.svg.append("g")
    .call(d3.axisLeft(y));

    // Create and fill the bars
    this.svg.selectAll("bars")
    .data(data)
    .enter()
    .append("rect")
    .attr("x", (d: any) => x(d.day_of_week))
    .attr("y", (d: any) => y(d.count))
    .attr("width", x.bandwidth())
    .attr("height", (d: any) => this.height - y(d.count))
    .attr("fill", "#d04a35");
}

ngOnInit(): void {
  this.createSvg();
  this.drawBars(this.data);


  this.sharedService.getData().subscribe(
    res => {
      console.log(res);
    },err =>{
      console.log(err);
    }
  )
  
}



}