export async function register() {

    if (process.env.NEXT_RUNTIME === 'nodejs' && process.env.USE_OPEN_TELEMETRY === 'true') {
        
        await import('./instrumentation.node')
    }
}