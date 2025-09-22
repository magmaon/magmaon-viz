import type { RobotPosition } from "./physics";

/**
 * Robot Interface
 * 
 * Gathers all the actions performable on a Robot.
 */
export interface Robot {
    /** Get the current position of the robot. 
     * 
     * @returns the current RobotPosition.
    */
    getPosition(): RobotPosition;
    /** 
     * Move the robot to the specified position. 
     * 
     * @argument newPos the coordinates to get to (if some coordinates are left undefined, they are not modified.)
     * @returns the final position. 
     */
    moveTo(newPos: Partial<RobotPosition>): RobotPosition;
}