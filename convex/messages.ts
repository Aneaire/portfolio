import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const createMessage = mutation({
  args: {
    firstName: v.string(),
    lastName: v.string(),
    email: v.string(),
    phoneNumber: v.optional(v.string()),
    message: v.string(),
  },
  handler: async (ctx, args) => {
    const messageId = await ctx.db.insert("messages", {
      ...args,
      status: "unread",
      createdAt: Date.now(),
    });
    return messageId;
  },
});

export const getMessages = query({
  args: {},
  handler: async (ctx) => {
    const messages = await ctx.db.query("messages").order("desc").collect();
    return messages;
  },
});

export const getMessage = query({
  args: { id: v.id("messages") },
  handler: async (ctx, args) => {
    const message = await ctx.db.get(args.id);
    return message;
  },
});

export const updateMessageStatus = mutation({
  args: {
    id: v.id("messages"),
    status: v.union(
      v.literal("unread"),
      v.literal("read"),
      v.literal("responded"),
    ),
  },
  handler: async (ctx, args) => {
    const { id, status } = args;
    await ctx.db.patch(id, { status });
  },
});

export const getUnreadCount = query({
  args: {},
  handler: async (ctx) => {
    const unreadMessages = await ctx.db
      .query("messages")
      .withIndex("by_status", (q) => q.eq("status", "unread"))
      .collect();
    return unreadMessages.length;
  },
});
