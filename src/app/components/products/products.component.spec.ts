import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { defer, of } from 'rxjs';
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
        { provide: ProductsService, useValue: productServiceSpy }
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

  describe('Tests for getAllProducts', () => {

    it('should return list of products from services', () => {

      //Arrange
      const productsMock = generateManyProducts(10);
      productService.getAll.and.returnValue(of(productsMock))
      const countPrev = component.products.length;
      //ACT

      component.getAllProducts();
      fixture.detectChanges();

      //aSSERT
      expect(component.products.length).toEqual(productsMock.length + countPrev);

    })

    it('should change the estatus "Loading" => "Succes"', fakeAsync(() => {
      //Arrange
      const productsMock = generateManyProducts(10);
      productService.getAll.and.returnValue(defer(() => Promise.resolve(productsMock)))
      //Act

      component.getAllProducts();
      fixture.detectChanges();
      expect(component.status).toEqual('loading');
      tick(); //Ejecuta todo lo que esta pendiente en resolverse, como la linea 62
      fixture.detectChanges();
      //Assert
      expect(component.status).toEqual('success');
    }))

    it('should change the estatus "Loading" => "Error"', fakeAsync(() => {
      //Arrange
      productService.getAll.and.returnValue(defer(() => Promise.reject('error')))
      //Act

      component.getAllProducts();
      fixture.detectChanges();
      expect(component.status).toEqual('loading');
      tick(3000); //Ejecuta todo lo que esta pendiente en resolverse, como tenemos timeout tenemos que explicarle que tiene espera
      fixture.detectChanges();
      //Assert
      expect(component.status).toEqual('error');
    }))

  })


});
