// IMPORTS
import { ZodType } from "zod"

/// <summary>
/// VALIDATION REGISTRY
/// MAPS REQUEST TYPE TO ZOD VALIDATOR
/// </summary>
export class ValidationRegistry {

    // MAP TO STORE VALIDATORS
    private validators = new Map<string, ZodType<any>>()

    // REGISTER VALIDATOR FOR TYPE
    register(type: string, validator: ZodType<any>): void {

        this.validators.set(type, validator)
    }

    // GET VALIDATOR FOR TYPE (RETURNS UNDEFINED IF NOT REGISTERED)
    get(type: string): ZodType<any> | undefined {

        return this.validators.get(type)
    }
}
