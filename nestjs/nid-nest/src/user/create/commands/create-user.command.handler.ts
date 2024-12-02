import { CommandHandler, ICommandHandler, EventBus } from "@nestjs/cqrs";
import { CreateUserCommand } from "./create-user.command";

@CommandHandler(CreateUserCommand)
export class CreateUserCommandHandler implements ICommandHandler<CreateUserCommand> {
    async execute(command: CreateUserCommand): Promise<any> {
        const { name, password } = command.params
        return `create user: ${name} / ${password} `   
    }
}