import { ContentGenerationCommand, ContentRequest, Content } from "@agents/content-agent/metadata/agent"
import { saveContent } from "@agents/content-agent/adapters/secondary/database.adapter"
import { generateContent } from "@agents/content-agent/adapters/secondary/agent.adapter"
import { randomUUID } from "crypto";

export const agentGenerateUseCase = async (input: ContentRequest ): Promise<Content> => {
    const command: ContentGenerationCommand = {
        prompt: input.prompt,
        userId: input.userId
    }
    const output = await generateContent(command)
    const content: Content = {
        userId: input.userId,
        contentId: randomUUID(),
        text: output
    }
    await saveContent(content)
    return content
};