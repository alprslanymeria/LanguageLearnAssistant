export enum LanguageId {
    english = 1,
    turkish = 2,
    german = 3,
    russian = 4
}

export class LanguageMapper {

    static fromName(name: string): LanguageId | null {

        switch (name.toLowerCase()) {
            case "english":
                return LanguageId.english

            case "turkish":
                return LanguageId.turkish

            case "german":
                return LanguageId.german

            case "russian":
                return LanguageId.russian

            default:
                return null
        }
    }
}