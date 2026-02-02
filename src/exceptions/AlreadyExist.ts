export class UserAlreadyExist extends Error {

    constructor(message?: string) {
        
        super(message ?? "User already exists!")
        this.name = "UserAlreadyExist"
    }
}