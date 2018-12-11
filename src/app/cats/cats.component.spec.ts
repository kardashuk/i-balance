import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CatsComponent} from './cats.component';
import {GraphQLModule} from "../graphql.module";

describe('CatsComponent', () => {
    let component: CatsComponent;
    let fixture: ComponentFixture<CatsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [GraphQLModule],
            declarations: [CatsComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CatsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
