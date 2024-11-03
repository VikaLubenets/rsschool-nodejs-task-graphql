import  { GraphQLObjectType } from "graphql";
import { userResolver } from "./resolvers/userResolver.js";
import { profileResolver } from "./resolvers/profileResolver.js";
import { postResolver } from "./resolvers/postResolver.js";
import { memberTypeResolver } from "./resolvers/memberTypesResolver.js";

export const RootQueryType = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    ...userResolver,
    ...profileResolver,
    ...postResolver,
    ...memberTypeResolver
  },
});