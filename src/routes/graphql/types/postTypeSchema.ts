import {
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString
} from "graphql";
import { Post, PrismaClient } from "@prisma/client";

import { UUIDTypeSchema } from "./uuidTypeSchema.js";
import { UserTypeSchema } from "./userTypeSchema.js";

export const PostTypeSchema = new GraphQLObjectType({

  name: 'postType',
  fields: () => ({
    id: { type: new GraphQLNonNull(UUIDTypeSchema) },
    title: { type: new GraphQLNonNull(GraphQLString) },
    content: { type: new GraphQLNonNull(GraphQLString) },

    author: { 
      type: new GraphQLNonNull(UserTypeSchema),
      resolve: async (parent: Post, _args, { user }: PrismaClient) => 
        await user.findUnique({ where: { id: parent.authorId } }),
    },

    authorId: { type: new GraphQLNonNull(UUIDTypeSchema) },
  }),

});
