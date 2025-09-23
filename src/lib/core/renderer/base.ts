import type { TeamColor } from "../models/team";
import type { Position2D } from "./2d";

/**
 * Base renderer interface
 * 
 * Gathers all needed functions a Renderer must provide
 * such that GameControllerViz can make use of it.
 */
export interface BaseRenderer {
    /**
     * Reset the renderer, clearing all objects, as it was before 
     * any calls to the renderer were made.
     */
    clear(): void;

    /**
     * Create a new renderer object for a robot.
     * 
     * @argument team the team color the robot belongs to.
     * @returns the newly created renderer object.
     */
    createRobotObject(team: TeamColor): RobotRendererObject;
    
    /**
     * Destroy a renderer object, removing it from the scene.
     * 
     * @param obj the object to destroy.
     */
    destroyObject(obj: BaseRendererObject): void;
}

/**
 * Base Renderer Object interface
 * 
 * An Renderer object is an object that is displayable on screen using a renderer.
 * It assumes to have a position in 2D space, and have the capability to move, but 
 * also to be hidden or shown.
 */
export interface BaseRendererObject {
    show(): void;
    hide(): void;
    moveTo(position: Position2D): void;
    isVisible(): boolean;
}

/**
 * Rotatable Renderer Object interface
 * 
 * An extension of BaseRendererObject, that adds the capability to rotate.
 */
export interface RotatableRendererObject extends BaseRendererObject {
    rotateTo(theta: number): void;
}

/**
 * Team-related Renderer Object interface
 * 
 * An extension of BaseRendererObject, that adds the capability to
 * specify to which team it belongs to.
 */
export interface TeamRendererObject extends BaseRendererObject {
    team: TeamColor;
}

/** Alias type for a minimum Robot Renderer Object */
export type RobotRendererObject = BaseRendererObject & RotatableRendererObject & TeamRendererObject;