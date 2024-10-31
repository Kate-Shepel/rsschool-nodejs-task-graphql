import {
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType
} from "graphql";
import {
  MemberType,
  PrismaClient,
  Profile,
  Post,
  User
} from "@prisma/client";

import { MembershipTypeEnum } from "./types/membershipTypeEnum.js";
import { MemberTypeSchema } from "./types/memberTypeSchema.js";
import { ProfileTypeSchema } from "./types/profileTypeSchema.js";
import { UUIDTypeSchema } from "./types/uuidTypeSchema.js";
import { PostTypeSchema } from "./types/postTypeSchema.js";
import { UserTypeSchema } from "./types/userTypeSchema.js";

export const mainQuery = new GraphQLObjectType({

  name: 'Query',
  fields: () => ({
    memberType: {
      type: MemberTypeSchema,
      args: {
        id: { type: new GraphQLNonNull(MembershipTypeEnum) },
      },
      resolve: async (_, args: MemberType, { memberType }: PrismaClient) => {
        return await memberType.findUnique({
          where: {
            id: args.id,
          },
        });
      },
    },

    memberTypes: {
      type: new GraphQLList(MemberTypeSchema),
      resolve: async (_, _args, { memberType }: PrismaClient) => {
        return await memberType.findMany();
      },
    },

    user: {
      type: UserTypeSchema,
      args: {
        id: { type: new GraphQLNonNull(UUIDTypeSchema) },
      },
      resolve: async (_, args: User, { user }: PrismaClient) => {
        return await user.findUnique({
          where: {
            id: args.id,
          },
        });
      },
    },

    users: {
      type: new GraphQLList(UserTypeSchema),
      resolve: async (_, _args, { user }: PrismaClient) => {
        return await user.findMany();
      },
    },

    profile: {
      type: ProfileTypeSchema,
      args: {
        id: { type: new GraphQLNonNull(UUIDTypeSchema) },
      },
      resolve: async (_, args: Profile, { profile }: PrismaClient) => {
        return await profile.findUnique({
          where: {
            id: args.id,
          },
        });
      },
    },

    profiles: {
      type: new GraphQLList(ProfileTypeSchema),
      resolve: async (_, _args, { profile }: PrismaClient) => {
        return await profile.findMany();
      },
    },

    post: {
      type: PostTypeSchema,
      args: {
        id: { type: new GraphQLNonNull(UUIDTypeSchema) },
      },
      resolve: async (_, args: Post, { post }: PrismaClient) => {
        return await post.findUnique({
          where: {
            id: args.id,
          },
        });
      },
    },

    posts: {
      type: new GraphQLList(PostTypeSchema),
      resolve: async (_, _args, { post }: PrismaClient) => {
        return await post.findMany();
      },
    },

  }),
});
