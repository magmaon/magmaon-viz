import { createRobot, type Robot } from "./robot";
import { PATH1 } from "./example";

export interface Viz {
    play(): void;
    pause(): void;
    clear(): void;
    step(): void;
    isPlaying(): boolean;
}

class VizImpl implements Viz {
    private tickerHandler: any;
    private _isPlaying: boolean = false;
    private isInitialized: boolean = false;
    private vizGroup: SVGElement | undefined = undefined;
    private state: {
        robots: Robot[],
        ticks: number
    } | undefined;
    constructor(private vizArea: HTMLElement) { };

    play(): void {
        if (this._isPlaying) return;
        if (!this.isInitialized) this.init();
        this._isPlaying = true;
        this.step();
        this.tickerHandler = setInterval(() => { this.step() }, 100);
    }

    pause(): void {
        if (!this._isPlaying) return;
        this._isPlaying = false;
        clearInterval(this.tickerHandler);
    }

    clear(): void {
        this.pause();
        if (this.vizGroup) {
            this.vizGroup.remove();
            this.vizGroup = undefined;
        }
        this.state = undefined;
        this.isInitialized = false;
        // TODO: Clear the visualization area
    }

    isPlaying(): boolean {
        return this._isPlaying;
    }

    init(): void {
        // Create a new overlay in the table SVG
        this.vizGroup = createVizGroup(this.vizArea);
        const robots = createRobots(this.vizGroup);
        this.state = { robots, ticks: 0 };
        this.isInitialized = true;
    }

    step(): void {
        if (!this.state) return;
        // Move the yellow bot to the position describe by PATH_EXAMPLE_1;
        const yellowBot = this.state.robots[0];
        const ticks = this.state.ticks++;
        if (ticks > 1000) return;
        const posTo = PATH1(ticks);
        yellowBot.moveTo(posTo.x, posTo.y, posTo.theta);
    }
}

function createVizGroup(vizArea: HTMLElement): SVGElement {
    const vizGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
    vizGroup.setAttribute("id", "viz");
    vizArea.appendChild(vizGroup);
    return vizGroup;
}

function createRobots(vizGroup: SVGElement): Robot[] {
    function createTeamGroup(color: "blue" | "yellow") {
        const team = document.createElementNS("http://www.w3.org/2000/svg", "g");
        team.setAttribute("id", `team-${color}`);
        vizGroup.appendChild(team);
        return team;
    }

    const blueTeam = createTeamGroup("blue");
    const yellowTeam = createTeamGroup("yellow");

    const yellowMain = createRobot(yellowTeam);
    return [yellowMain];
}

export function newViz(vizArea: HTMLElement): Viz {
    return new VizImpl(vizArea);
}