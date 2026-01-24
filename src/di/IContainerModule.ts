// IMPORTS
import { Container } from "inversify"

export interface IContainerModule {

    register(container: Container) : void
}