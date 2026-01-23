import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  messages: defineTable({
    firstName: v.string(),
    lastName: v.string(),
    email: v.string(),
    phoneNumber: v.optional(v.string()),
    message: v.string(),
    status: v.union(
      v.literal("unread"),
      v.literal("read"),
      v.literal("responded"),
    ),
    createdAt: v.number(),
  })
    .index("by_status", ["status"])
    .index("by_created_at", ["createdAt"]),
});
