
import { z } from "zod";

export const AuthenticationSchema = z.object({
  webToken: z.string()
})

export const ChannelTokenSchema = z.object({
  channelToken: z.string()
})
