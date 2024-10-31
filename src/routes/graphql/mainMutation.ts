import { GraphQLObjectType } from "graphql";

import { UserTypeSchema } from "./types/userTypeSchema.js";

export const mainMutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    createUser: {
      type: UserTypeSchema,
      resolve: async () => {
        return {
          id: "placeholder-id",
          name: "Placeholder Name",
          email: "placeholder@example.com",
      };
      },
    },
  },
});