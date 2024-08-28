// Entry point for executors attached to agents
import { createHandler } from "@utils/src/custom-handler";
import { agentHandler } from "@agents/content-agent/adapters/primary/agent.primary.adapter"

export const agentExecutor = createHandler(agentHandler);

