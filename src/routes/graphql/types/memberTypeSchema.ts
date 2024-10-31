import { GraphQLFloat, GraphQLInt, GraphQLNonNull, GraphQLObjectType } from "graphql";

import { MembershipTypeEnum } from "./membershipTypeEnum.js";

export const MemberTypeSchema = new GraphQLObjectType({
  name: 'memberType',
  fields: () => ({
    id: { type: MembershipTypeEnum },
    discount: { type: new GraphQLNonNull(GraphQLFloat) },
    postsLimitPerMonth: { type: new GraphQLNonNull(GraphQLInt) },
  }),
});
