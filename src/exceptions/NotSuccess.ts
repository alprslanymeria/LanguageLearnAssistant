export class FlashcardResultNotSuccess extends Error {

    constructor(message?: string) {

        super(message ?? "Flashcard result indicates failure!")
        this.name = "FlashcardResultNotSuccess"
    }
}

export class ReadingResultNotSuccess extends Error {

    constructor(message?: string) {

        super(message ?? "Reading result indicates failure!")
        this.name = "ReadingResultNotSuccess"
    }
}

export class WritingResultNotSuccess extends Error {

    constructor(message?: string) {
        
        super(message ?? "Writing result indicates failure!")
        this.name = "WritingResultNotSuccess"
    }
}