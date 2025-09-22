import type { Game } from "@lib/core/game";
import type { Robot } from "@lib/core/robot";
import type { TeamColor, Team } from "@lib/core/team";
import type { VizRobot } from "./robot";

/**
 * SVG Game Visualization
 * 
 * A simple SVG-based implementation of a GameVisual.
 * 
 * This class wraps a Game instance and provides methods to visualize the game state using SVG.
 */
export class SvgGameVisual<T extends Game> {
    private inner: T;
    private SvgElement: SVGElement;
    private teamGroups: { [color in TeamColor]: SVGGElement };

    /**
     * Create a new SvgGameVisual instance.
     * @param inner the inner Game instance to wrap.
     * @param SvgElement The root of an SVG element, or a group (<g>) element within an SVG, where the game visualization will be rendered.
     *      This element should already exist in the DOM, but otherwise it can be empty.
     */
    constructor(inner: T, SvgElement: SVGElement) {
        this.inner = inner;
        this.SvgElement = SvgElement;
        this.teamGroups = this.init();
    }

    getAllRobots(): readonly Robot[] {
        return this.inner.getAllRobots();
    }

    clear(): void {
        // - Unregister all robots from the inner game
        for (const robot of this.inner.getAllRobots()) {
            this.unregisterRobot(robot);
        }
        this.inner.clear();
    }

    registerRobot(teamColor: TeamColor): Robot {
        // TODO
    }

    unregisterRobot(robot: Robot): boolean {
        return this.inner.unregisterRobot(robot);
    }


    // New methods
    private init(): { [color in TeamColor]: SVGGElement } {
        // Initialize the SVG element for the game visualization
        // - Create the two teams' groups
        const blueTeamGroup = svgCreateTeamGroup("blue");
        const yellowTeamGroup = svgCreateTeamGroup("yellow");
        this.SvgElement.appendChild(blueTeamGroup);
        this.SvgElement.appendChild(yellowTeamGroup);
        return { blue: blueTeamGroup, yellow: yellowTeamGroup };
    }
}

function svgCreateTeamGroup(color: TeamColor): SVGGElement {
    const group = document.createElementNS("http://www.w3.org/2000/svg", "g");
    group.setAttribute("id", `${color}-team`);
    return group;
}