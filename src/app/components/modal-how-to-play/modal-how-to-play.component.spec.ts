import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalHowToPlayComponent } from './modal-how-to-play.component';

describe('ModalHowToPlayComponent', () => {
  let component: ModalHowToPlayComponent;
  let fixture: ComponentFixture<ModalHowToPlayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalHowToPlayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalHowToPlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
