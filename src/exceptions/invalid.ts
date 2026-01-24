export class InvalidPracticeType extends Error {

    constructor() {

        super("Invalid practice type!")
        this.name = "InvalidPracticeType"
    }
}

export class UncertainTargetLanguage extends Error {

    constructor() {
        
        super("Unable to determine target language!")
        this.name = "UncertainTargetLanguage"
    }
}