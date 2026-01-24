// IMPORTS
import "reflect-metadata"
import { Container } from "inversify"
import { IContainerModule } from "./IContainerModule"
import { LoggingModule } from "./modules/LoggingModule"
import { CachingModule } from "./modules/CachingModule"
import { CommandModule } from "./modules/CommandModule"
import { QueryModule } from "./modules/QueryModule"
import { RepositoryModule } from "./modules/RepositoryModule"
import { ServiceModule } from "./modules/ServiceModule"
import { StorageModule } from "./modules/StorageModule"
import { TranslationModule } from "./modules/TranslationModule"


const container = new Container()

// MODULES TO REGISTER
const modules: IContainerModule[] = [
    new LoggingModule(),
    new CachingModule(),
    new StorageModule(),
    new TranslationModule(),
    new RepositoryModule(),
    new ServiceModule(),
    new CommandModule(),
    new QueryModule()
]

// REGISTER ALL MODULES TO CONTAINER
modules.forEach(module => module.register(container))

export default container