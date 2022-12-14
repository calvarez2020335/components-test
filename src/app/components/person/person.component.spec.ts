import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Person } from 'src/app/models/person.model';

import { PersonComponent } from './person.component';

fdescribe('PersonComponent', () => {
  let component: PersonComponent;
  let fixture: ComponentFixture<PersonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonComponent);
    component = fixture.componentInstance;
    /* component.person = new Person('Nicolas', 'Molina', 28, 89, 1.4); */
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should the name be "Nicolas"', () => {
    component.person = new Person('Nicolas', 'Molina', 28, 89, 1.4);
    expect(component.person.name).toEqual('Nicolas');
  })
  
  it('should have <h3> with "Hola, ${person.name}"', () => {

    //ARRANGE
    component.person = new Person('Valentina', 'Molina', 28, 89, 1.4);
    const expectMessage = `Hola, ${component.person.name}`;
    const personDebug: DebugElement = fixture.debugElement;
    const h3Debug: DebugElement = personDebug.query(By.css('h3'));
    const h3Element: HTMLElement = h3Debug.nativeElement;

    //ACT
    fixture.detectChanges();
    //Assert
    expect(h3Element?.textContent).toEqual(expectMessage);
  })

  it('should have <p> with "Mi altura es ${person.height}"', () => {
    component.person = new Person('Carlos' , 'Molina', 28, 89, 1.4);
    const expectMessage = `Mi altura es ${component.person.height}`
    const personDebug: DebugElement = fixture.debugElement; 
    const pDebug: DebugElement = personDebug.query(By.css('p'));
    const pElement: HTMLElement = pDebug.nativeElement;

    fixture.detectChanges();

    expect(pElement?.textContent).toEqual(expectMessage);
  })


});
