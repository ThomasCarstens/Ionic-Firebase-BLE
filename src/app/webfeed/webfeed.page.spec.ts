import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { WebfeedPage } from './webfeed.page';

describe('WebfeedPage', () => {
  let component: WebfeedPage;
  let fixture: ComponentFixture<WebfeedPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebfeedPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(WebfeedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
