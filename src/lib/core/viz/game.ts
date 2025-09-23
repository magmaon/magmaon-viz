import { GameController } from "@lib/core/state/game";
import type { BaseRenderer, RobotRendererObject } from "@lib/core/renderer/base";
import type { Team, TeamColor } from "@lib/core/models/team";
import type { Robot } from "../models/robot";
import type { RobotPosition } from "../models/physics";

/**
 * VizGameController, is a GameController which supports rendering it 
 * via a renderer.
 */
export class VizGameController extends GameController {   
    constructor(blueTeam: Team, yellowTeam: Team, private renderer: BaseRenderer) {
        super(blueTeam, yellowTeam);
    }

    // -- Overriden Game Controller methods --
    override clear(): void {
        super.clear();
        this.renderer.clear();
    }

    override registerRobot(teamColor: TeamColor): Robot {
        const newRobot = super.registerRobot(teamColor);
        const robotObj = this.renderer.createRobotObject(teamColor);
        return new VizAwareRobot(newRobot, robotObj);
    }

    override unregisterRobot(robot: Robot): boolean {
        if (!(robot instanceof VizAwareRobot)) {
            console.warn("Trying to unregister a robot that is not a VizAwareRobot:", robot);
            return false;
        }

        const success = super.unregisterRobot(robot);
        if (success) {
            this.renderer.destroyObject(robot.getRendererObject());
        }
        return success;
    }
}

export class VizAwareRobot implements Robot {
    constructor(private baseRobot: Robot, private rendererObject: RobotRendererObject) {}
    
    getInnerRobot(): Robot {
        return this.baseRobot;
    }

    getRendererObject(): RobotRendererObject {
        return this.rendererObject;
    }

    // Methods inherited from Robot

    getPosition() {
        return this.baseRobot.getPosition();
    }

    moveTo(newPos: Partial<RobotPosition>) {
        const updatedPos = this.baseRobot.moveTo(newPos);
        this.rendererObject.moveTo({ x: updatedPos.x, y: updatedPos.y });
        this.rendererObject.rotateTo(updatedPos.theta);
        return updatedPos;
    }
}
