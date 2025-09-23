import type { GameController } from "./core/state/game";

export class Choregraph<T extends GameController> {
    private tickerHandle : any = undefined;
    private tickActions: ((gc: T, tick: number) => void)[] = [];
    private tickCount: number = 0;
    private speedMultiplier: number = 1.0;
    constructor(private gameController: T, private tickRate: number = 10) {}

    getGameController(): T {
        return this.gameController;
    }

    start(): void {
        if (this.tickerHandle !== undefined) return; // Already started
        this.tickerHandle = setInterval(() => {
            this.tick();
        }, 1000 / this.tickRate);
    }

    stop(): void {
        if (this.tickerHandle === undefined) return; // Not started
        clearInterval(this.tickerHandle);
        this.tickerHandle = undefined;
    }

    reset(): void {
        this.stop();
        this.tickCount = 0;
        this.tick();
    }

    private tick(): void {
        // Call all registered tick actions
        this.tickActions.forEach(action => action(this.gameController, this.tickCount));
        this.tickCount++;
    }

    registerTickAction(action: (gc: T, tick: number) => void): void {
        this.tickActions.push(action);
    }

    unregisterTickAction(action: (gc: T, tick: number) => void): void {
        const index = this.tickActions.indexOf(action);
        if (index !== -1) {
            this.tickActions.splice(index, 1);
        }
    }

    clearTickActions(): void {
        this.tickActions = [];
    }

    setSpeedMultiplier(multiplier: number): void {
        if (multiplier > 0 && multiplier <= 10) {
            this.speedMultiplier = multiplier;
        }
    }

    getSpeedMultiplier(): number {
        return this.speedMultiplier;
    }
}