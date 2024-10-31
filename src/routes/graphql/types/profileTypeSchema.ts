import {
  GraphQLBoolean,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLObjectType
} from "graphql";
import { PrismaClient, Profile } from "@prisma/client";

import { UUIDTypeSchema } from "./uuidTypeSchema.js";
import { UserTypeSchema } from "./userTypeSchema.js";
import { MemberTypeSchema } from "./memberTypeSchema.js";
import { MembershipTypeEnum } from "./membershipTypeEnum.js";

export const ProfileTypeSchema = new GraphQLObjectType({

  name: 'profileType',
  fields: () => ({
    id: { type: new GraphQLNonNull(UUIDTypeSchema) },
    isMale: { type: new GraphQLNonNull(GraphQLBoolean) },
    yearOfBirth: { type: new GraphQLNonNull(GraphQLInt) },

    user: { 
      type: UserTypeSchema,
      resolve: async (parent: Profile, _args, { user }: PrismaClient) => 
        await user.findUnique({ where: { id: parent.userId } }),
    },

    userId: { type: new GraphQLNonNull(UUIDTypeSchema) },

    memberType: { 
      type: new GraphQLNonNull(MemberTypeSchema),
      resolve: async (parent: Profile, _args, { memberType }: PrismaClient) => 
        await memberType.findUnique({ where: { id: parent.memberTypeId } }),
    },

    memberTypeId: { type: MembershipTypeEnum },
  }),

});
