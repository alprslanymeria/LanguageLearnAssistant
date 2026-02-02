// IMPORTS
import fs from 'fs'
import path from 'path'
import { inject, injectable } from 'inversify'
import { TYPES } from '@/src/di/type'
import type { ILogger } from "@/src/infrastructure/logging/ILogger"
import type { ILanguageRepository } from '@/src/infrastructure/persistence/contracts/ILanguageRepository'
import type { IPracticeRepository } from '@/src/infrastructure/persistence/contracts/IPracticeRepository'
import { NoLanguageFound, NoPracticeFound } from '@/src/exceptions/NotFound'
import type { IListeningRepository } from '@/src/infrastructure/persistence/contracts/IListeningRepository'
import type { IListeningCategoryRepository } from '@/src/infrastructure/persistence/contracts/IListeningCategoryRepository'
import type { IDeckVideoRepository } from '@/src/infrastructure/persistence/contracts/IDeckVideoRepository'

const LANGUAGES = ['english', 'turkish', 'german', 'russian']

@injectable()
export class InitialDataService {
    
    // FIELDS
    private readonly logger: ILogger
    private readonly languageRepository: ILanguageRepository
    private readonly practiceRepository: IPracticeRepository
    private readonly listeningRepository: IListeningRepository
    private readonly listeningCategoryRepository: IListeningCategoryRepository
    private readonly deckVideoRepository: IDeckVideoRepository

    // CTOR
    constructor(
        
        @inject(TYPES.Logger) logger: ILogger,
        @inject(TYPES.LanguageRepository) languageRepository: ILanguageRepository,
        @inject(TYPES.PracticeRepository) practiceRepository: IPracticeRepository,
        @inject(TYPES.ListeningRepository) listeningRepository: IListeningRepository,
        @inject(TYPES.ListeningCategoryRepository) listeningCategoryRepository: IListeningCategoryRepository,
        @inject(TYPES.DeckVideoRepository) deckVideoRepository: IDeckVideoRepository  
    ) {

        this.logger = logger
        this.languageRepository = languageRepository
        this.practiceRepository = practiceRepository
        this.listeningRepository = listeningRepository
        this.listeningCategoryRepository = listeningCategoryRepository
        this.deckVideoRepository = deckVideoRepository
    }


    // SEED INITIAL LISTENING DATA FOR EACH LANGUAGE
    async seedInitialListeningData(userId: string): Promise<void> {

        this.logger.info(`InitialDataService: Starting seeding for user ${userId}`)

        for (const langName of LANGUAGES) await this.seedLanguage(userId, langName)
    }

    private async seedLanguage(userId: string, langName: string): Promise<void> {

        const language = await this.languageRepository.getByNameAsync(langName)

        if (!language) throw new NoLanguageFound

        const listeningPractice = await this.practiceRepository.existsByNameAndLanguageIdAsync('listening', language.id)

        if (!listeningPractice) throw new NoPracticeFound


        let listening = await this.listeningRepository.getByPracticeIdUserIdLanguageIdAsync(listeningPractice.id, userId, language.id)

        if (!listening) {

            const newListeningId = await this.listeningRepository.createAsync({userId, languageId: language.id, practiceId: listeningPractice.id})

            listening = await this.listeningRepository.getByPracticeIdUserIdLanguageIdAsync(listeningPractice.id, userId, language.id)
        }

        // READ CATEGORIES FROM FILE
        const categoriesPath = path.join(process.cwd(), 'src', 'assets', 'seed', langName, 'categories.txt');
        
        if (!fs.existsSync(categoriesPath)) {

            this.logger.warn(`InitialDataService: Categories file not found for '${langName}' at ${categoriesPath}. Skipping.`)
            return
        }

        // GET CATEGORY NAMES
        const categoriesContent = fs.readFileSync(categoriesPath, 'utf-8')
        const categoryNames = categoriesContent.split('\n').map(l => l.trim()).filter(l => l !== '')

        // FOR EACH CATEGORY, CREATE RECORD AND SEED VIDEOS
        for (const categoryName of categoryNames) {

            const newCategoryId = await this.listeningCategoryRepository.createAsync({listeningId: listening!.id, name: categoryName})

            // SEED VIDEO
            await this.seedVideosForCategory(langName, categoryName, newCategoryId)
        }
    }

    private async seedVideosForCategory(langName: string, categoryName: string, categoryId: number): Promise<void> {

        // GET VIDEOS & TRANSCRIPTS FROM FILES
        const videosPath = path.join(process.cwd(), 'src', 'assets', 'seed', langName, categoryName, 'videos.txt')
        const transcriptsPath = path.join(process.cwd(), 'src', 'assets', 'seed', langName, categoryName, 'transcripts.txt')

        if (!fs.existsSync(videosPath)) {

            this.logger.warn(`InitialDataService: videos.txt not found for ${langName}/${categoryName}`)
            return
        }

        const videosContent = fs.readFileSync(videosPath, 'utf-8')
        const videoLines = videosContent.split('\n').map(l => l.trim()).filter(l => l !== '')

        let transcriptLines: string[] = []

        if (fs.existsSync(transcriptsPath)) {

             const transcriptsContent = fs.readFileSync(transcriptsPath, 'utf-8')
             transcriptLines = transcriptsContent.split('\n').map(l => l.trim()).filter(l => l !== '')
        }

        // COMBINE VIDEO AND TRANSCRIPT
        for (let i = 0; i < videoLines.length; i++) {

            const url = videoLines[i]
            const correct = transcriptLines[i] || ""

            await this.deckVideoRepository.createAsync({

                categoryId: categoryId,
                sourceUrl: url,
                correct: correct 
            })
        }

        this.logger.info(`InitialDataService: Seeded ${videoLines.length} videos for ${langName}/${categoryName}`)
    }
}