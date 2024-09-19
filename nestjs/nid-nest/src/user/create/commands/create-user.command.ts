export interface CreateUserCommandParams {
    name: string;
    password: string;
}

export class CreateUserCommand {
    constructor(public readonly params: CreateUserCommandParams) {
        
    }
}

