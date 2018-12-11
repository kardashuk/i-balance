import {Component, OnInit} from '@angular/core';
import gql from 'graphql-tag';
import {Apollo} from 'apollo-angular';
import {Observable} from "rxjs/index";
import {map} from "rxjs/internal/operators";

const GET_CATS = gql`
    {
        getCats {
            id,
            name,
            age
        }
    }
`;

@Component({
    selector: 'app-cats',
    templateUrl: './cats.component.html',
    styleUrls: ['./cats.component.scss']
})
export class CatsComponent implements OnInit {
    cats: Observable<any>;

    constructor(private apollo: Apollo) {
    }

    ngOnInit() {
        this.cats = this.apollo
            .watchQuery({
                query: GET_CATS,
            })
            .valueChanges.pipe(map((result: any) => result.data && result.data.getCats));
    }
}