import type { Game } from "@lib/core/game";
import type { RobotPosition } from "@lib/core/physics";
import type { Robot } from "@lib/core/robot";
import type { Team, TeamColor } from "@lib/core/team";

/**
 * Game Implementation
 * 
 * Implements a very basic game state management,
 * with just enough to keep track of the game playing.
 */
export class GameImpl implements Game {
    private blueTeam: Team;
    private yellowTeam: Team;
    private robots: Set<Robot>;

    constructor(blueTeam: Team, yellowTeam: Team) {
        this.blueTeam = blueTeam;
        this.yellowTeam = yellowTeam;
        this.robots = new Set();
    }

    getAllRobots(): readonly Robot[] {
        return Array.from(this.robots);
    }

    getTeam(color: TeamColor): Team {
        return color === "blue" ? this.blueTeam : this.yellowTeam;
    }

    clear(): void {
        this.robots.forEach(robot => {
            this.unregisterRobot(robot);
        });
    }

    registerRobot(teamColor: TeamColor, robot: Robot): boolean {
        if (this.robots.has(robot)) {
            return false; // Robot already registered
        }
        this.robots.add(robot);
        const team = this.getTeam(teamColor);
        return team.addRobot(robot);
    }

    unregisterRobot(robot: Robot): boolean {
        if (this.robots.has(robot)) {
            this.robots.delete(robot);
            const team = this.blueTeam.getRobots().includes(robot) ? this.blueTeam : this.yellowTeam;
            return team.removeRobot(robot);
        }
        return false;
    }
}