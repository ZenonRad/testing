import * as fs from 'fs';
import * as path from 'path';
import { gql } from 'apollo-server';
import { buildFederatedSchema } from '@apollo/federation';

import resolvers from '../graphql/resolvers';
import { IContext, IUser } from '../types';
import { createModels } from '../database';

const typeDefs = gql(
  fs.readFileSync(path.join(__dirname, '../graphql/schema.graphql'), 'utf8'),
);

export const schema = buildFederatedSchema([
  {
    typeDefs,
    //@ts-ignore
    resolvers,
  },
]);

export const service = {
  typeDefs,
  resolvers,
};

export const { userModel, openMongooseConnection } = createModels();

// export const getContext = (values: Partial<IContext> = {}): IContext => ({
//   authorization: '',
//   userId: '',
//   userModel,
//   ...values,
// });
