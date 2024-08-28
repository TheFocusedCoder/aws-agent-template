# AWS Agent Template

This project implements a content generation agent using AWS Bedrock and a lightweight hexagonal architecture pattern.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Development Environment](#development-environment)
- [Installation](#installation)
- [Deployment](#deployment)
- [Project Structure](#project-structure)
- [Agent Infrastructure Configuration](#agent-infrastructure-configuration)
- [Agent Runtime Configuration](#agent-runtime-configuration)
- [License](#license)

## Prerequisites

This template assumes you are familiar with the following:
- [SST](https://sst.dev/) - Building the AWS infrastructure as code
- [Amazon Bedrock](https://aws.amazon.com/bedrock/) - Building AI Agents
- [Docker](https://www.docker.com/) - For running a local development environment


## Development Environment

This project uses a development container for consistent development environments. You can open devcontainer.json with Cursor. You will need docker running on your machine to build the container.

See more on dev containers [here](https://containers.dev/).

The configuration is in the `.devcontainer/devcontainer.json` file.

To use the dev container:

Open the project in Cursor and click "Reopen in Container" when prompted.

or

You can use the shortcut `CMD + SHIFT + P` and select `Dev Containers: Reopen in Container`.

The dev container includes:

- Node.js and TypeScript
- AWS CLI
- Python
- AWS Toolkit for VS Code


## Installation

1. Clone the repository:
   ```
   git clone https://github.com/tfcbot/aws-agent-template.git
   cd aws-agent-template
   ```

2. Install dependencies:
   ```
   yarn install
   ```

3. Install SST dependencies

    ```
    yarn sst install
    ```

4. Set up your AWS profile

    ```
    export AWS_PROFILE=<your-profile-name>
    ```

## Deployment

Deploy your agent using the following command:

```
yarn sst deploy --stage <stage-name>
```

This will deploy your Lambda function, Bedrock agent, and other AWS resources defined in your infrastructure code.


## Project Structure

The project follows a lightweight hexagonal architecture. A basic content generation agent is included to get you started as an example and can be deployed with sst. Below is the basic structure of the project. The goal is to maximize for ease of refactoring and composability.

```
infra/
|-- index.ts
|-- agents/
    |-- content-agent/
        |-- content-agent-build.ts
        |-- content-agent-executor.ts
packages/
|-- core/
    |-- src/
        |-- agent-plane/
            |-- content-agent-runtime/
                |-- adapters/
                |   |-- primary/
                |   |   |-- agent.primary.adapter.ts
                |   |-- secondary/
                |       |-- agent.adapter.ts
                |       |-- database.adapter.ts
                |-- metadata/
                |   |-- agent.ts
                |-- usecases/
                    |-- generate.usecase.ts

```

## Agent Infrastructure Configuration

1. Update the `sst.config.ts` file with your project-specific settings.

2. Modify the `infra/agents/<agent-name>/<agent-name>-build.ts` file to configure your Bedrock agent at build time. Here you can set the permissions for the agent and configure the lambda functions it has access to. 

3. Update the `infra/agents/<agent-name>/<agent-name>-executor.ts` file to set up the Lambda function and necessary permissions. These executors are invoked by the agent at runtime to perform actions and execute use cases.

## Agent Runtime Configuration

To add a new agent:

1. Create a new directory in `infra/agents/`
2. Set up the agents build and executors. 
3. In `packages/core/src/agents` create a new agent runtime directory called `<new-agent>-runtime`.
4. Implement your types, enumns and schemas in `<new-agent>-runtime/adapters/metdata/agent.ts` 
4. Implement a handler for the agent in `<new-agent>-runtime/adapters/primary/agent.primary.adapter.ts`. This is the entry point for the agent and is used to invoke the agent.
6. Implement usecases for the agent in `<new-agent>-runtime/usecases/`. This is where you can implement business logic for the agent.
7. Implement secondary adapters as needed in `<new-agent>-runtime/adapters/secondary/`. This is where you can implement secondary logic for the agent that interacts with third party services or databases.
5. In `functions/src/agents.executors.ts` import the new executor and export it as a lambda handler to be used in the `infra/<new-agent>/executors.ts` file. 




## License

This project is licensed under the MIT License - see the LICENSE.md file for details.