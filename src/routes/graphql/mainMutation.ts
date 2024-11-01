/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  GraphQLString,
  GraphQLFloat,
  GraphQLBoolean,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLInputObjectType,
} from "graphql";
import { PrismaClient } from "@prisma/client";

import { UserTypeSchema } from "./types/userTypeSchema.js";
import { PostTypeSchema } from "./types/postTypeSchema.js";
import { UUIDTypeSchema } from "./types/uuidTypeSchema.js";
import { ProfileTypeSchema } from "./types/profileTypeSchema.js";
import { MembershipTypeEnum } from "./types/membershipTypeEnum.js";

export const mainMutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    createUser: {
      type: UserTypeSchema,
      args: {
        dto: {
          type: new GraphQLNonNull(
            new GraphQLInputObjectType({
              name: 'CreateUserInput',
              fields: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                balance: { type: new GraphQLNonNull(GraphQLFloat) },
              },
            })
          ),
        },
      },
      resolve: async (_, { dto: { name, balance } }, { user }: PrismaClient) => {
        return await user.create({ data: { name, balance } });
      },
    },

    changeUser: {
      type: UserTypeSchema,
      args: {
        id: { type: new GraphQLNonNull(UUIDTypeSchema) },
        dto: {
          type: new GraphQLInputObjectType({
            name: 'ChangeUserInput',
            fields: {
              name: { type: GraphQLString },
              balance: { type: GraphQLFloat },
            },
          }),
        },
      },
      resolve: async (_, { id, dto }, { user }: PrismaClient) => {
        return await user.update({
          where: { id },
          data: dto,
        });
      },
    },

    deleteUser: {
      type: new GraphQLNonNull(GraphQLString),
      args: {
        id: { type: new GraphQLNonNull(UUIDTypeSchema) },
      },
      resolve: async (_, { id }, { user }: PrismaClient) => {
        await user.delete({ where: { id } });
        return "User deleted";
      },
    },

    createPost: {
      type: PostTypeSchema,
      args: {
        dto: {
          type: new GraphQLNonNull(
            new GraphQLInputObjectType({
              name: 'CreatePostInput',
              fields: {
                title: { type: new GraphQLNonNull(GraphQLString) },
                content: { type: new GraphQLNonNull(GraphQLString) },
                authorId: { type: new GraphQLNonNull(UUIDTypeSchema) },
              },
            })
          ),
        },
      },
      resolve: async (_, { dto: { title, content, authorId } }, { post }: PrismaClient) => {
        return await post.create({ data: { title, content, authorId } });
      },
    },

    changePost: {
      type: PostTypeSchema,
      args: {
        id: { type: new GraphQLNonNull(UUIDTypeSchema) },
        dto: {
          type: new GraphQLInputObjectType({
            name: 'ChangePostInput',
            fields: {
              title: { type: GraphQLString },
              content: { type: GraphQLString },
            },
          }),
        },
      },
      resolve: async (_, { id, dto }, { post }: PrismaClient) => {
        return await post.update({
          where: { id },
          data: dto,
        });
      },
    },

    deletePost: {
      type: new GraphQLNonNull(GraphQLString),
      args: {
        id: { type: new GraphQLNonNull(UUIDTypeSchema) },
      },
      resolve: async (_, { id }, { post }: PrismaClient) => {
        await post.delete({ where: { id } });
        return "Post deleted";
      },
    },

    createProfile: {
      type: ProfileTypeSchema,
      args: {
        dto: {
          type: new GraphQLNonNull(
            new GraphQLInputObjectType({
              name: 'CreateProfileInput',
              fields: {
                isMale: { type: new GraphQLNonNull(GraphQLBoolean) },
                yearOfBirth: { type: new GraphQLNonNull(GraphQLInt) },
                memberTypeId: { type: new GraphQLNonNull(MembershipTypeEnum) },
                userId: { type: new GraphQLNonNull(UUIDTypeSchema) },
              },
            })
          ),
        },
      },
      resolve: async (_, { dto: { isMale, yearOfBirth, memberTypeId, userId } }, { profile }: PrismaClient) => {
        return await profile.create({ data: { isMale, yearOfBirth, memberTypeId, userId } });
      },
    },

    changeProfile: {
      type: ProfileTypeSchema,
      args: {
        id: { type: new GraphQLNonNull(UUIDTypeSchema) },
        dto: {
          type: new GraphQLInputObjectType({
            name: 'ChangeProfileInput',
            fields: {
              isMale: { type: GraphQLBoolean },
              yearOfBirth: { type: GraphQLInt },
              memberTypeId: { type: MembershipTypeEnum },
            },
          }),
        },
      },
      resolve: async (_, { id, dto }, { profile }: PrismaClient) => {
        return await profile.update({
          where: { id },
          data: dto,
        });
      },
    },

    deleteProfile: {
      type: new GraphQLNonNull(GraphQLString),
      args: {
        id: { type: new GraphQLNonNull(UUIDTypeSchema) },
      },
      resolve: async (_, { id }, { profile }: PrismaClient) => {
        await profile.delete({ where: { id } });
        return "Profile deleted";
      },
    },

    subscribeTo: {
      type: new GraphQLNonNull(GraphQLString),
      args: {
        userId: { type: new GraphQLNonNull(UUIDTypeSchema) },
        authorId: { type: new GraphQLNonNull(UUIDTypeSchema) },
      },
      resolve: async (_, { userId, authorId }, { user }: PrismaClient) => {
        await user.update({
          where: { id: userId },
          data: { userSubscribedTo: { create: { authorId } } },
        });
        return "Success";
      },
    },

    unsubscribeFrom: {
      type: new GraphQLNonNull(GraphQLString),
      args: {
        userId: { type: new GraphQLNonNull(UUIDTypeSchema) },
        authorId: { type: new GraphQLNonNull(UUIDTypeSchema) },
      },
      resolve: async (_, { userId, authorId }, { subscribersOnAuthors }: PrismaClient) => {
        await subscribersOnAuthors.delete({
          where: { subscriberId_authorId: { authorId, subscriberId: userId } },
        });
        return "Success";
      },
    },
  },
});
