import { mergeTypeDefs } from "@graphql-tools/merge";

import { userGQLSchema } from "./user.js";
export const mergedGQLSchema = mergeTypeDefs([userGQLSchema]);
