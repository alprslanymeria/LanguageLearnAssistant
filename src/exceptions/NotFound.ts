export class NoLanguageFound extends Error {

    constructor() {

        super("No languages found!")
        this.name = "NoLanguageFound"
    }
}

export class NoPracticeFound extends Error {

    constructor() {

        super("No practices found!")
        this.name = "NoPracticeFound"
    }
}

export class DeckWordNotFound extends Error {

    constructor() {

        super("No deck word found!")
        this.name = "DeckWordNotFound"
    }
}

export class FlashcardNotFound extends Error {

    constructor() {

        super("Flashcard not found!")
        this.name = "FlashcardNotFound"
    }
}

export class FlashcardCategoryNotFound extends Error {

    constructor() {
        
        super("Flashcard category not found!")
        this.name = "FlashcardCategoryNotFound"
    }
}

export class FlashcardOldSessionNotFound extends Error {

    constructor() {
        
        super("Flashcard old session not found!")
        this.name = "FlashcardOldSessionNotFound"
    }
}

export class ListeningNotFound extends Error {

    constructor() {

        super("Listening not found!")
        this.name = "ListeningNotFound"
    }
}

export class ListeningCategoryNotFound extends Error {

    constructor() {

        super("Listening category not found!")
        this.name = "ListeningCategoryNotFound"
    }
}

export class ListeningOldSessionNotFound extends Error {

    constructor() {
        
        super("Listening old session not found!")
        this.name = "ListeningOldSessionNotFound"
    }
}

export class ReadingNotFound extends Error {

    constructor() {

        super("Reading not found!")
        this.name = "ReadingNotFound"
    }
}

export class ReadingBookNotFound extends Error {

    constructor() {

        super("Reading book not found!")
        this.name = "ReadingBookNotFound"
    }
}

export class ReadingOldSessionNotFound extends Error {

    constructor() {
        
        super("Reading old session not found!")
        this.name = "ReadingOldSessionNotFound"
    }
}

export class WritingNotFound extends Error {

    constructor() {

        super("Writing not found!")
        this.name = "WritingNotFound"
    }
}

export class WritingBookNotFound extends Error {

    constructor() {

        super("Writing book not found!")
        this.name = "WritingBookNotFound"
    }
}

export class WritingOldSessionNotFound extends Error {

    constructor() {
        
        super("Writing old session not found!")
        this.name = "WritingOldSessionNotFound"
    }
}