import { GraphQLObjectType, GraphQLFloat, GraphQLInt, GraphQLEnumType, GraphQLNonNull } from 'graphql';
import {MemberTypeId as MTEnum} from '../../member-types/schemas.js'

export const MemberTypeId = new GraphQLEnumType({
  name: "MemberTypeId",
  values: {
    [MTEnum.BASIC]: { value: MTEnum.BASIC },
    [MTEnum.BUSINESS]: { value: MTEnum.BUSINESS },
  }
});

export const MemberType = new GraphQLObjectType({
  name: "MemberType",
  fields: () => ({
    id: { type: new GraphQLNonNull(MemberTypeId) },
    discount: { type: new GraphQLNonNull(GraphQLFloat) },
    postsLimitPerMonth: { type: new GraphQLNonNull(GraphQLInt) },
  }),
});