import type { Robot } from "./robot";
import type { Team, TeamColor } from "./team";

/**
 * Game interface
 * 
 * Gathers all the actions that can be perform on a game.
 */
export interface Game {

    /**
     * Get all robots currently registered in the game.
     * 
     * @returns an array of all registered robots.
     */
    getAllRobots(): readonly Robot[];

    /** Get the specified team state.
     * @param color the team color.
     * @returns the team state.
     */
    getTeam(color: TeamColor): Team;

    /** Reset the current game state. */
    clear(): void;

    /**
     * Register a new robot in the game.
     * 
     * @param teamColor the color of the team the robot belongs to.
     * @param robot the robot to register.
     * @returns if the robot has been registered (if not, it is already known).
     */
    registerRobot(teamColor: TeamColor, robot: Robot): boolean;

    /**
     * Unregister a robot from the game.
     * 
     * @param robot the robot to unregister.
     * @returns true if the robot was unregistered, false if it was not found.
     */
    unregisterRobot(robot: Robot): boolean;
}