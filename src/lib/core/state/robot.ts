import type { RobotPosition } from "@lib/core/models/physics";
import type { Robot } from "@lib/core/models/robot";

/**
 * Base Robot Implementation
 * 
 * Implements a very basic robot game object,
 * with just enough to keep track of its position.
 */
export class BaseRobot implements Robot {
    private position: RobotPosition;

    constructor() {
        this.position = { x: 0, y: 0, theta: 0 };
    }

    getPosition() {
        return { ...this.position };
    }

    moveTo(newPos: Partial<RobotPosition>) {
        if (newPos.x !== undefined) this.position.x = newPos.x;
        if (newPos.y !== undefined) this.position.y = newPos.y;
        if (newPos.theta !== undefined) this.position.theta = newPos.theta;
        return { ...this.position };
    }
}