import type { Robot } from "./robot";

export type TeamColor = "blue" | "yellow";

/**
 * Team Interface
 * 
 * Gathers all the informations and states about a Team.
 */
export interface Team {
    /**
     * The team color
     */
    readonly color: TeamColor;

    /**
     * Get all the robots associated with this team.
     * 
     * @returns an array of robots.
     */
    getRobots(): readonly Robot[];

    /**
     * Add a robot to this team.
     * 
     * @param robot the robot to add.
     * @returns true if the robot was added, false if it was already present.
     */
    addRobot(robot: Robot): boolean;

    /**
     * Remove a robot from this team.
     * 
     * @param robot the robot to remove.
     * @returns true if the robot was removed, false if it was not present.
     */
    removeRobot(robot: Robot): boolean;
}