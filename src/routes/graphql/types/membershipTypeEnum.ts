import { GraphQLEnumType } from "graphql";

import { MemberTypeId } from "../../member-types/schemas.js";

export const MembershipTypeEnum = new GraphQLEnumType({

  name: 'MemberTypeId',
  values: {
    [MemberTypeId.BUSINESS]: {
      value: MemberTypeId.BUSINESS,
    },
    [MemberTypeId.BASIC]: {
      value: MemberTypeId.BASIC,
    },
  },

});
