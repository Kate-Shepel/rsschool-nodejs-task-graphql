import {
  GraphQLFloat,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLList
} from "graphql";
import { MemberType, PrismaClient } from "@prisma/client";

import { MembershipTypeEnum } from "./membershipTypeEnum.js";
import { ProfileTypeSchema } from "./profileTypeSchema.js";

export const MemberTypeSchema = new GraphQLObjectType({

  name: 'memberType',
  fields: () => ({
    id: { type: MembershipTypeEnum },
    discount: { type: new GraphQLNonNull(GraphQLFloat) },
    postsLimitPerMonth: { type: new GraphQLNonNull(GraphQLInt) },

    profiles: { 
      type: new GraphQLList(ProfileTypeSchema),
      resolve: async (parent: MemberType, _args, { profile }: PrismaClient) => 
        await profile.findMany({
          where: { id: parent.id },
        }),
    },

  }),
});
