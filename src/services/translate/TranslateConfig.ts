// IMPORTS
import { TranslateOptions } from "./Translate"

export class TranslateConfig {

  static load(): TranslateOptions {

    return {

        type: process.env.TRANSLATOR_TYPE as 'google',
    }
  }
}