import { GraphQLList, GraphQLNonNull, GraphQLObjectType } from "graphql";
import { MemberType, PrismaClient } from "@prisma/client";

import { MembershipTypeEnum } from "./types/membershipTypeEnum.js";
import { MemberTypeSchema } from "./types/memberTypeSchema.js";

export const mainQuery = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    memberType: {
      type: MemberTypeSchema,
      args: {
        id: { type: new GraphQLNonNull(MembershipTypeEnum) },
      },
      resolve: async (_, args: MemberType, context: PrismaClient) => {
        return await context.memberType.findUnique({
          where: {
            id: args.id,
          },
        });
      },
    },
    memberTypes: {
      type: new GraphQLList(MemberTypeSchema),
      resolve: async (_, _args, context: PrismaClient) => {
        return await context.memberType.findMany();
      },
    },
  }),
});
