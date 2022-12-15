import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  @Input() product: Product = {
    id: '',
    title: '',
    price: 1000,
    images: [''],
    description: 'Description example',
    category: {
      id: 1,
      name: 'category example'
    },
  };

  constructor() { }

  ngOnInit(): void {
  }

}
