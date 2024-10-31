import {
  GraphQLFloat,
  GraphQLList,
  GraphQLNonNull,
  GraphQLString,
  GraphQLObjectType
} from "graphql";
import { PrismaClient, User } from "@prisma/client";

import { UUIDTypeSchema } from "./uuidTypeSchema.js";
import { PostTypeSchema } from "./postTypeSchema.js";
import { ProfileTypeSchema } from "./profileTypeSchema.js";


export const UserTypeSchema = new GraphQLObjectType({

  name: 'userType',
  fields: () => ({
    id: { type: new GraphQLNonNull(UUIDTypeSchema) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    balance: { type: new GraphQLNonNull(GraphQLFloat) },

    profile: { 
      type: ProfileTypeSchema,
      resolve: async (parent: User, _args, { profile }: PrismaClient) => 
        await profile.findUnique({ where: { userId: parent.id } }),
    },

    posts: { 
      type: new GraphQLList(PostTypeSchema),
      resolve: async (parent: User, _args, { post }: PrismaClient) => 
        await post.findMany({ where: { authorId: parent.id } }),
    },

    userSubscribedTo: {
      type: new GraphQLList(UserTypeSchema),
      resolve: async (parent: User, _args, { user }: PrismaClient) => 
        await user.findMany({
          where: {
            subscribedToUser: {
              some: { subscriberId: parent.id },
            },
          },
        }),
    },

    subscribedToUser: {
      type: new GraphQLList(UserTypeSchema),
      resolve: async (parent: User, _args, { user }: PrismaClient) => 
        await user.findMany({
          where: {
            userSubscribedTo: {
              some: { authorId: parent.id },
            },
          },
        }),
    },
  }),

});
