export class InvalidPracticeType extends Error {

    constructor(message?: string) {
        
        super(message ?? "Invalid practice type!")
        this.name = "InvalidPracticeType"
    }
}

export class UncertainTargetLanguage extends Error {

    constructor(message?: string) {

        super(message ?? "Unable to determine target language!")
        this.name = "UncertainTargetLanguage"
    }
}