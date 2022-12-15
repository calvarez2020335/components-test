import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Person } from 'src/app/models/person.model';
import { PersonComponent } from '../person/person.component';

import { PeopleComponent } from './people.component';

fdescribe('PeopleComponent', () => {
  let component: PeopleComponent;
  let fixture: ComponentFixture<PeopleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PeopleComponent, PersonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PeopleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should have a list app-person component', () => {

    component.people = [
      new Person('Nicolas', 'John', 23, 1, 1),
      new Person('Valentina', 'Molina', 12, 2, 3),
      new Person('Santiago', 'Molina', 24, 3, 4)
    ];
    //Act
    fixture.detectChanges();
    const debugElement = fixture.debugElement.queryAll(By.css('app-person'))
    //Assert
    expect(debugElement.length).toEqual(3);

  })

  it('should raise select event when user clicks a person', () => {
    //Arrange
    const buttonDe = fixture.debugElement.query(By.css('app-person .btn-choose'))
    //Act
    buttonDe.triggerEventHandler('click', null);
    fixture.detectChanges();
    //Assert
    expect(component.selectedPerson).toEqual(component.people[0]);
  })

  it('should render the selected person', () => {
    //Arrange
    const buttonDe = fixture.debugElement.query(By.css('app-person .btn-choose'))
    buttonDe.triggerEventHandler('click', null);
    //Act
    fixture.detectChanges();
    const debugLi = fixture.debugElement.query(By.css('.selectedPerson ul > li'))
    //Assert
    expect(component.selectedPerson).toEqual(component.people[0]);
    expect(debugLi.nativeElement.textContent).toContain(component.selectedPerson?.name);
  })

});
