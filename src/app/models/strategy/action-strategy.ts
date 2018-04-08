export abstract class ActionStrategy {
    abstract getStartSignal(language: string): string;
    abstract getEndSignal(language: string): string;
    abstract getInitialResponse(language: string): string;
    abstract getFinishResponse(language: string): string;
}
