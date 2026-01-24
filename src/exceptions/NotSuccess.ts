export class FlashcardResultNotSuccess extends Error {

    constructor() {

        super("Flashcard result indicates failure!")
        this.name = "FlashcardResultNotSuccess"
    }
}

export class ReadingResultNotSuccess extends Error {

    constructor() {

        super("Reading result indicates failure!")
        this.name = "ReadingResultNotSuccess"
    }
}

export class WritingResultNotSuccess extends Error {

    constructor() {

        super("Writing result indicates failure!")
        this.name = "WritingResultNotSuccess"
    }
}