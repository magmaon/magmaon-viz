import type { Game } from "@lib/core/models/game";
import type { RobotPosition } from "@lib/core/models/physics";
import type { Robot } from "@lib/core/models/robot";
import type { Team, TeamColor } from "@lib/core/models/team";
import { BaseRobot } from "./robot";

/**
 * GameController
 * 
 * Implements a very basic game controller,
 * with just enough to keep track of the game playing.
 */
export class GameController implements Game {
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

    registerRobot(teamColor: TeamColor): Robot {
        const team = this.getTeam(teamColor);
        const newRobot = new BaseRobot();
        this.robots.add(newRobot);
        team.addRobot(newRobot);
        return newRobot;
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