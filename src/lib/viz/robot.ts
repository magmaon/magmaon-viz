import type { RobotPosition } from "@lib/core/physics";
import type { Robot } from "@lib/core/robot";
import type { Visual } from "./visual";

/**
 * Robot Visualization
 *
 * Wrapper around a Robot to provide visualization capabilities.
 */
export class VizRobot<T extends Robot> implements Robot {
    constructor(private visual: RobotVisual, private inner: T) {}

    getPosition() {
        return this.inner.getPosition();
    }

    moveTo(newPos: Partial<RobotPosition>) {
        const finPos = this.inner.moveTo(newPos);
        this.visual.moveTo(finPos);
        return finPos;
    }
}

/**
 * Robot Visual
 * 
 * An object reprensenting the visual representation of a robot.
 */
export interface RobotVisual extends Visual {
    /**
     * Move the visual representation to the specified coordinates.
     * @param position the position to move to.
     */
    moveTo(position: RobotPosition): void;
}

/**
 * SVG Robot Visual
 * 
 * A simple SVG-based implementation of a RobotVisual.
 */
export class SvgRobotVisual implements RobotVisual {
    private element: SVGElement;

    constructor(element: SVGElement) {
        this.element = element;
    }

    moveTo(position: RobotPosition) {
        this.element.setAttribute("transform", `translate(${position.x}, ${position.y}) rotate(${position.theta})`);
    }

    hide() {
        this.element.style.display = "none";
    }

    show() {
        this.element.style.display = "";
    }

    remove() {
        if (this.element.parentNode) {
            this.element.parentNode.removeChild(this.element);
        }
    }
}