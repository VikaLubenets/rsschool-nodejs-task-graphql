import { GraphQLObjectType, GraphQLString, GraphQLFloat, GraphQLInt, GraphQLEnumType } from 'graphql';
import {MemberTypeId} from '../../member-types/schemas.js'

export const MemberTypeIdEnum = new GraphQLEnumType({
  name: "MemberTypeId",
  values: {
    [MemberTypeId.BASIC]: { value: MemberTypeId.BASIC },
    [MemberTypeId.BUSINESS]: { value: MemberTypeId.BUSINESS },
  }
});

export const MemberType = new GraphQLObjectType({
  name: "MemberType",
  fields: () => ({
    id: { type: MemberTypeIdEnum },
    discount: { type: GraphQLFloat },
    postsLimitPerMonth: { type: GraphQLInt }
  }),
});