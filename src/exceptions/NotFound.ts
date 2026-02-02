export class NoLanguageFound extends Error {

    constructor(message?: string) {
        
        super(message ?? "No languages found!")
        this.name = "NoLanguageFound"
    }
}

export class NoPracticeFound extends Error {

    constructor(message?: string) {

        super(message ?? "No practices found!")
        this.name = "NoPracticeFound"
    }
}

export class UserNotFound extends Error {

    constructor(message?: string) {

        super(message ?? "User not found!")
        this.name = "UserNotFound"
    }
}

export class DeckWordNotFound extends Error {

    constructor(message?: string) {

        super(message ?? "No deck word found!")
        this.name = "DeckWordNotFound"
    }
}

export class FlashcardNotFound extends Error {

    constructor(message?: string) {

        super(message ?? "Flashcard not found!")
        this.name = "FlashcardNotFound"
    }
}

export class FlashcardCategoryNotFound extends Error {

    constructor(message?: string) {

        super(message ?? "Flashcard category not found!")
        this.name = "FlashcardCategoryNotFound"
    }
}

export class FlashcardOldSessionNotFound extends Error {

    constructor(message?: string) {

        super(message ?? "Flashcard old session not found!")
        this.name = "FlashcardOldSessionNotFound"
    }
}

export class ListeningNotFound extends Error {

    constructor(message?: string) {

        super(message ?? "Listening not found!")
        this.name = "ListeningNotFound"
    }
}

export class ListeningCategoryNotFound extends Error {

    constructor(message?: string) {

        super(message ?? "Listening category not found!")
        this.name = "ListeningCategoryNotFound"
    }
}

export class ListeningOldSessionNotFound extends Error {

    constructor(message?: string) {

        super(message ?? "Listening old session not found!")
        this.name = "ListeningOldSessionNotFound"
    }
}

export class ReadingNotFound extends Error {

    constructor(message?: string) {

        super(message ?? "Reading not found!")
        this.name = "ReadingNotFound"
    }
}

export class ReadingBookNotFound extends Error {

    constructor(message?: string) {

        super(message ?? "Reading book not found!")
        this.name = "ReadingBookNotFound"
    }
}

export class ReadingOldSessionNotFound extends Error {

    constructor(message?: string) {

        super(message ?? "Reading old session not found!")
        this.name = "ReadingOldSessionNotFound"
    }
}

export class WritingNotFound extends Error {

    constructor(message?: string) {

        super(message ?? "Writing not found!")
        this.name = "WritingNotFound"
    }
}

export class WritingBookNotFound extends Error {

    constructor(message?: string) {

        super(message ?? "Writing book not found!")
        this.name = "WritingBookNotFound"
    }
}

export class WritingOldSessionNotFound extends Error {

    constructor(message?: string) {

        super(message ?? "Writing old session not found!")
        this.name = "WritingOldSessionNotFound"
    }
}