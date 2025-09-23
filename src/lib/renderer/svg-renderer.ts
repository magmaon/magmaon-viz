import type { RobotPosition } from "@lib/core/models/physics";
import type { TeamColor } from "@lib/core/models/team";
import type { Position2D } from "@lib/core/renderer/2d";
import type { BaseRenderer, BaseRendererObject, RobotRendererObject, RotatableRendererObject } from "@lib/core/renderer/base";
import { TABLE_HEIGHT_MM } from "@lib/core/models/physics";
import robotVisual from "@assets/robots/minimalist.svg?raw";

/**
 * SVG Game renderer
 * 
 * 2D SVG renderer implementation of BaseRenderer.
 * It is made to be used in the web browser, using 
 * the 2D representation of the gameArea. 
 */
export class SvgGameRenderer implements BaseRenderer {
    private svgVizRoot: SVGElement;
    /**
     * @param svgVizRoot the root SVG element where to render the game. It must be able to be deleted entirely.
     */
    constructor(svgVizRoot: SVGElement) {
        this.svgVizRoot = svgVizRoot;
    }

    clear(): void {
        this.svgVizRoot.innerHTML = "";
    }

    destroyObject(obj: BaseRendererObject): void {
        if (obj instanceof SvgRobot) {
            const svgNode = obj.getSVGNode();
            if (svgNode.parentNode) {
                svgNode.parentNode.removeChild(svgNode);
            }
            console.debug("Destroyed object", obj);
        } else {
            console.warn("Trying to destroy an object that is not an SvgRobot:", obj);
        }
    }

    createRobotObject(team: TeamColor): RobotRendererObject {
        const robotSvg = new DOMParser().parseFromString(robotVisual, "image/svg+xml").documentElement;
        const robotGroup = robotSvg.querySelector("g");
        if (!robotGroup) {
            throw new Error("Invalid robot SVG: missing <g class='robot'> element");
        }
        // Calculate the offset to center the robot at (0,0)
        const svgWidth = parseFloat(robotSvg.getAttribute("width") || "200");
        const svgHeight = parseFloat(robotSvg.getAttribute("height") || "400");
        robotGroup.setAttribute("transform-origin", `${svgWidth / 2}px ${svgHeight / 2}px`);
        // Set the team color as a CSS variable
        robotGroup.style.setProperty("--team-color", team === "blue" ? "#4470b7" : "#e2be1fff");
        // Append to the root SVG
        this.svgVizRoot.appendChild(robotGroup);
        return new SvgRobot(robotGroup, team, { width: svgWidth, height: svgHeight });
    }
}

/**
 * SVG Robot Renderer Object
 * 
 * An implementation of a RendererObject for SVG rendering.
 */
export class SvgRobot implements RobotRendererObject {
    private svgNode: SVGElement;
    private visible: boolean = true;
    private position: RobotPosition = { x: 0, y: 0, theta: 0 };
    private size: { width: number; height: number };
    team: TeamColor;
    constructor(svgNode: SVGElement, team: TeamColor, size: { width: number; height: number }, show: boolean = true) {
        this.svgNode = svgNode;
        this.visible = show;
        this.team = team;
        this.size = size;
        if (!show) {
            this.hide();
        }
    }

    show(): void {
        this.svgNode.style.display = "block";
        this.visible = true;
    }

    hide(): void {
        this.svgNode.style.display = "none";
        this.visible = false;
    }

    isVisible(): boolean {
        return this.visible;
    }

    moveTo(position: Position2D): void {
        this.position.x = position.x;
        this.position.y = position.y;
        this.updateTransform();

    }

    rotateTo(theta: number): void {
        this.position.theta = theta;
        this.updateTransform();
    }

    /**
     * Get the underlying SVG node.
     * @returns the underlying SVG node.
     */
    getSVGNode(): SVGElement {
        return this.svgNode;
    }

    /**
     * Set the internal transform of the SVG node.
     */
    private updateTransform() {
        this.svgNode.setAttribute("transform", `translate(${this.position.x - this.size.width / 2}, ${TABLE_HEIGHT_MM - this.position.y - this.size.height / 2}), rotate(${-this.position.theta})`);
    }
}