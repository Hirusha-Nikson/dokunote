/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";
import type * as citations from "../citations.js";
import type * as documents from "../documents.js";
import type * as langchain_db from "../langchain/db.js";
import type * as myActions from "../myActions.js";
import type * as notes from "../notes.js";
import type * as pdfstore from "../pdfstore.js";
import type * as useMaterials from "../useMaterials.js";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  citations: typeof citations;
  documents: typeof documents;
  "langchain/db": typeof langchain_db;
  myActions: typeof myActions;
  notes: typeof notes;
  pdfstore: typeof pdfstore;
  useMaterials: typeof useMaterials;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;
