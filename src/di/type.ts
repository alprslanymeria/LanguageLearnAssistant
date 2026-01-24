import { TranslateService } from "../services/translate/TranslateService";

export const TYPES = {

  // LOGGING
  LoggerConfig:     Symbol.for('LoggerConfig'),
  ElasticLogConfig: Symbol.for('ElasticLogConfig'),
  Logger: Symbol.for('Logger'),
  LogStreams: Symbol.for('LogStreams'),

  // CACHING
  CacheConfig: Symbol.for('CacheConfig'),
  CacheStrategy: Symbol.for('CacheStrategy'),
  CacheFactory: Symbol.for('CacheFactory'),
  CacheService: Symbol.for('CacheService'),
  RedisClient: Symbol.for('RedisClient'),

  CacheBehavior: Symbol.for('CacheBehavior'),

  // STORAGE
  StorageConfig: Symbol.for('StorageConfig'),
  StorageStrategy: Symbol.for('StorageStrategy'),
  StorageFactory: Symbol.for('StorageFactory'),
  StorageService: Symbol.for('StorageService'),
  GoogleCloudClient: Symbol.for('GoogleCloudClient'),

  BucketName: Symbol.for('BucketName'),
  LocalStorageBasePath: Symbol.for('LocalStorageBasePath'),

  // TRANSLATION
  TranslationProvider: Symbol.for('TranslationProvider'),
  TranslateFactory: Symbol.for('TranslateFactory'),
  TranslateService: Symbol.for('TranslateService'),
  GoogleTranslationProvider: Symbol.for('GoogleTranslationProvider'),

  // REPOSITORIES
  DeckWordRepository: Symbol.for('DeckWordRepository'),
  FlashcardCategoryRepository: Symbol.for('FlashcardCategoryRepository'),
  FlashcardOldSessionRepository: Symbol.for('FlashcardOldSessionRepository'),
  FlashcardRepository: Symbol.for('FlashcardRepository'),
  FlashcardSessionRowRepository: Symbol.for('FlashcardSessionRowRepository'),
  LanguageRepository: Symbol.for('LanguageRepository'),
  ListeningCategoryRepository: Symbol.for('ListeningCategoryRepository'),
  ListeningOldSessionRepository: Symbol.for('ListeningOldSessionRepository'),
  ListeningRepository: Symbol.for('ListeningRepository'),
  ListeningSessionRowRepository: Symbol.for('ListeningSessionRowRepository'),
  PracticeRepository: Symbol.for('PracticeRepository'),
  ReadingBookRepository: Symbol.for('ReadingBookRepository'),
  ReadingOldSessionRepository: Symbol.for('ReadingOldSessionRepository'),
  ReadingRepository: Symbol.for('ReadingRepository'),
  ReadingSessionRowRepository: Symbol.for('ReadingSessionRowRepository'),
  UserRepository: Symbol.for('UserRepository'),
  WritingBookRepository: Symbol.for('WritingBookRepository'),
  WritingOldSessionRepository: Symbol.for('WritingOldSessionRepository'),
  WritingRepository: Symbol.for('WritingRepository'),
  WritingSessionRowRepository: Symbol.for('WritingSessionRowRepository'),

  // BUS
  CommandBus: Symbol.for('CommandBus'),
  QueryBus: Symbol.for('QueryBus'),

  // SERVICES
  EntityVerificationService: Symbol.for('EntityVerificationService'),
  ImageProcessingService: Symbol.for('ImageProcessingService'),
  FileStorageHelper: Symbol.for('FileStorageHelper')
};