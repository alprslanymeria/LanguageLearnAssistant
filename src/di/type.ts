import { Translate } from "@google-cloud/translate/build/src/v2";
import { DeckVideoRepository } from "../infrastructure/persistence/repositories/DeckVideoRepository";

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
  PipelineBehavior: Symbol.for('PipelineBehavior'),

  // STORAGE
  StorageConfig: Symbol.for('StorageConfig'),
  StorageStrategy: Symbol.for('StorageStrategy'),
  StorageFactory: Symbol.for('StorageFactory'),
  StorageService: Symbol.for('StorageService'),
  GoogleCloudClient: Symbol.for('GoogleCloudClient'),

  BucketName: Symbol.for('BucketName'),
  LocalStorageBasePath: Symbol.for('LocalStorageBasePath'),

  // TRANSLATION
  TranslateConfig: Symbol.for('TranslateConfig'),
  TranslationProvider: Symbol.for('TranslationProvider'),
  TranslateFactory: Symbol.for('TranslateFactory'),
  TranslateService: Symbol.for('TranslateService'),
  GoogleTranslationProvider: Symbol.for('GoogleTranslationProvider'),

  // REPOSITORIES
  DeckWordRepository: Symbol.for('DeckWordRepository'),
  DeckVideoRepository: Symbol.for('DeckVideoRepository'),
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

  // PIPELINE
  ValidationRegistry: Symbol.for('ValidationRegistry'),

  // SERVICES
  EntityVerificationService: Symbol.for('EntityVerificationService'),
  ImageProcessingService: Symbol.for('ImageProcessingService'),
  FileStorageHelper: Symbol.for('FileStorageHelper'),
};