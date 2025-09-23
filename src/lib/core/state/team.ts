import type { Robot } from "../models/robot";
import type { Team, TeamColor } from "../models/team";

export class TeamImpl implements Team {
    private robots: Set<Robot> = new Set();
    
    constructor(public readonly color: TeamColor) {}
    getRobots(): readonly Robot[] {
        return Array.from(this.robots);
    }
    addRobot(robot: Robot): boolean {
        if (this.robots.has(robot)) return false;
        this.robots.add(robot);
        return true;
    }
    removeRobot(robot: Robot): boolean {
        return this.robots.delete(robot);
    }
}