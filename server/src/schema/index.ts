import { mergeTypeDefs } from "@graphql-tools/merge";

import { userGQLSchema } from "./user";
export const mergedGQLSchema = mergeTypeDefs([userGQLSchema]);
