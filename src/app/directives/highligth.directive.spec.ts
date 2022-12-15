import { Component } from '@angular/core';
import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { HighligthDirective } from './highligth.directive';

//////Componente host

@Component({

  template: `
  
  <h5 class="title" highligth>Hay un valor default</h5>
  <h5 highligth="yellow">Hay un valor</h5>
  <p highligth="blue">parrafo</p>
  <p>otro parrrafo</p>
  <input [(ngModel)]="color" type="text" [highligth]="color">
  `

})
class HostComponent {
  color: string = 'gray';
}

describe('HighligthDirective', () => {

  let component: HostComponent;
  let fixture: ComponentFixture<HostComponent>

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      declarations: [HostComponent, HighligthDirective],
      imports: [ FormsModule ]
    })
    .compileComponents()
  })

  beforeEach(() => {

    fixture = TestBed.createComponent(HostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

  })

  it('should create an instance', () => {
    expect(component).toBeTruthy();
  });

  it('should have 4 instance whit highligth elements', () => {

    /* const element = fixture.debugElement.queryAll(By.css('*[highligth]'))// Esto es valido, solo que hay una mejor forma de hacerlo */
    const elements = fixture.debugElement.queryAll(By.directive(HighligthDirective));
    const elementsWithout = fixture.debugElement.queryAll(By.css('*:not([highligth])'));

    expect(elements.length).toEqual(4);
    expect(elementsWithout.length).toEqual(2)

  });

  it('should the elements be match with bgColor', () => {

    const elements = fixture.debugElement.queryAll(By.directive(HighligthDirective));
    const bgColor = 'gray'
   
    expect(elements[0].nativeElement.style.backgroundColor).toEqual(bgColor);
    expect(elements[1].nativeElement.style.backgroundColor).toEqual('yellow');
    expect(elements[2].nativeElement.style.backgroundColor).toEqual('blue');

  });

  it('should the h5.class="title" be defaulColor', () => {
    const titleDe = fixture.debugElement.query(By.css('.title'))
    const dir = titleDe.injector.get(HighligthDirective);
    expect(titleDe.nativeElement.style.backgroundColor).toEqual(dir.defaultColor)
  });

  it('should bind <input> and change the bgColor', () => {

    const inputDE = fixture.debugElement.query(By.css('input'));
    const inputEl:HTMLInputElement = inputDE.nativeElement;
    const dir = inputDE.injector.get(HighligthDirective);

    expect(inputEl.style.backgroundColor).toEqual(dir.defaultColor)

    inputEl.value = 'red';
    inputEl.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(inputEl.style.backgroundColor).toEqual('red')
    expect(component.color).toEqual('red')

  })

});
