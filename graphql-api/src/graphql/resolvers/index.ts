import { GraphQLDateTime } from 'graphql-iso-date';
import GraphQLJSON from 'graphql-type-json';
import Types from './Types';
import Query from './Query';
import Mutation from './Mutation';

export default {
  Date: GraphQLDateTime,
  Json: GraphQLJSON,
  ...Types,
  Query,
  Mutation,
};
