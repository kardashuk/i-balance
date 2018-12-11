import {Module} from '@nestjs/common';
import {GraphQLModule} from '@nestjs/graphql';
import {CatsModule} from './cats/cats.module';

@Module({
    imports: [
        GraphQLModule.forRoot({
            typePaths: ['./**/*.graphql'],
        }),
        CatsModule

    ],
})
export class ApplicationModule {
}