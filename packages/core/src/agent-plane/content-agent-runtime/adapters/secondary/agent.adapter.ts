import { 
    BedrockRuntimeClient,
    InvokeModelCommandInput, 
    InvokeModelCommand, 

} from "@aws-sdk/client-bedrock-runtime";
import { ContentGenerationCommand } from "@agent-plane/content-agent-runtime/metadata/agent";

//@ts-ignore
import { Resource } from "sst";

const bedrockRuntime = new BedrockRuntimeClient();



export const generateContent = async (command: ContentGenerationCommand): Promise<string> => {
    const input: InvokeModelCommandInput = {
        modelId: "anthropic.claude-3-5-sonnet-20240620-v1:0",
        contentType: "application/json",
        accept: "application/json",
        body: JSON.stringify({
            anthropic_version: "bedrock-2023-05-31",
            max_tokens: 1000,
            messages: [
                {
                    role: "user",
                    content: [
                        {
                            type: "text",
                            text: command.prompt
                        }
                    ]
                }
            ]
        }),
    };

    try {
        const invokeCommand = new InvokeModelCommand(input);
        const response = await bedrockRuntime.send(invokeCommand);
        
        if (response.body) {
            const responseBody = JSON.parse(new TextDecoder().decode(response.body));
            return responseBody.content[0].text;
        } else {
            throw new Error('No valid response from the model');
        }
    } catch (error) {
        console.error('Error generating content:', error);
        throw new Error(`Failed to generate content: ${error}`);
    }
};


