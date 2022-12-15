import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Person } from 'src/app/models/person.model';

import { PersonComponent } from './person.component';

describe('PersonComponent', () => {
  let component: PersonComponent;
  let fixture: ComponentFixture<PersonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PersonComponent]
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
    component.person = new Person('Carlos', 'Molina', 28, 89, 1.4);
    const expectMessage = `Mi altura es ${component.person.height}`
    const personDebug: DebugElement = fixture.debugElement;
    const pDebug: DebugElement = personDebug.query(By.css('p'));
    const pElement: HTMLElement = pDebug.nativeElement;

    fixture.detectChanges();

    expect(pElement?.textContent).toEqual(expectMessage);
  })

  it('should display a text with IMC when call click', () => {

    //Arrange
    const expectMessage = `overweight level 3`
    component.person = new Person('Juan', 'Molina', 30, 120, 1.65);
    const button = fixture.debugElement.query(By.css('button.btn-imc')).nativeElement;
    //Act
    component.calcIMC();
    fixture.detectChanges();
    //Assert
    expect(button.textContent).toContain(expectMessage)
  })

  it('should display a text with IMC when DO click', () => {

    //Arrange
    const expectMessage = `overweight level 3`
    component.person = new Person('Juan', 'Molina', 30, 120, 1.65);
    const buttonDe = fixture.debugElement.query(By.css('button.btn-imc'));
    const buttonEl = buttonDe.nativeElement;
    //Act
    buttonDe.triggerEventHandler('click', null);
    fixture.detectChanges();
    //Assert
    expect(buttonEl.textContent).toContain(expectMessage)
  })

  it('should raise selected event when do click', () => {
    //Arrange
    const expectPerson = new Person('Juan', 'Molina', 30, 120, 1.65);
    component.person = expectPerson;
    const buttonDe = fixture.debugElement.query(By.css('button.btn-choose'))

    let selectedPerson: Person | null;
    component.onSelected.subscribe(person => selectedPerson = person)
    //Act
    buttonDe.triggerEventHandler('click', null);
    fixture.detectChanges();
    //Assert
    expect(selectedPerson!).toEqual(expectPerson)


  })

});

@Component({
  template: `<app-person [person]="person" (onSelected)="onSelected($event)"></app-person>`
})

class HostComponent {

  person = new Person('Santi', 'Molina', 12, 40, 1.5);
  selectedPerson: Person | undefined;

  onSelected(person: Person) {
    this.selectedPerson = person;
  }

}


fdescribe('PersonComponent from HostComponent', () => {

  let component: HostComponent;
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HostComponent, PersonComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HostComponent);
    component = fixture.componentInstance;
    /* component.person = new Person('Nicolas', 'Molina', 28, 89, 1.4); */
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display person name', () => {

    //ARRANGE
    const expecteName = component.person.name;
    const h3De = fixture.debugElement.query(By.css('app-person h3'))
    const h3El = h3De.nativeElement;

    //Act
    fixture.detectChanges();

    //Assert
    expect(h3El.textContent).toContain(expecteName)
  })

  it('should raise select event when clicked', () => {

    //ARRANGE
    const expecteName = component.person.name;
    const btnDe = fixture.debugElement.query(By.css('app-person .btn-choose'))

    //Act
    btnDe.triggerEventHandler('click', null);
    fixture.detectChanges();

    //Assert
    expect(component.selectedPerson).toEqual(component.person)
  })

})