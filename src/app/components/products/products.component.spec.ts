import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { generateManyProducts } from 'src/app/models/product.mock';
import { ProductsService } from 'src/app/services/product.service';
import { ProductComponent } from '../product/product.component';

import { ProductsComponent } from './products.component';

fdescribe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;
  let productService: jasmine.SpyObj<ProductsService>

  beforeEach(async () => {

    const productServiceSpy = jasmine.createSpyObj('ProductsService', ['getAll'])

    await TestBed.configureTestingModule({
      declarations: [ProductsComponent, ProductComponent],
      providers: [
        { provide: ProductsService, useValue: productServiceSpy}
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;
    productService = TestBed.inject(ProductsService) as jasmine.SpyObj<ProductsService>
    const productsMock = generateManyProducts(3);
    productService.getAll.and.returnValue(of(productsMock))
    fixture.detectChanges(); //Aqui se ejecuta el ngOnint
  });

  it('should create', () => {
    
    expect(component).toBeTruthy();
    expect(productService.getAll).toHaveBeenCalled();
  });



});
