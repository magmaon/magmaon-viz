export interface Robot {
    toggleVisibility(): void;
    moveTo(x: number, y: number, theta: number): void;
    destroy(): void;
}

export type RobotPos = { x: number, y: number, theta: number };
export type TimestampedRobotPos = RobotPos & { timestamp: number };

class RobotImpl implements Robot {
    private isVisible: boolean = false;
    private position: RobotPos = { x: 0, y: 0, theta: 0 };
    constructor(private element: SVGElement, initialPosition: RobotPos) {
        this.position = initialPosition;
    }

    toggleVisibility(): void {
        // Save the new state
        this.isVisible = !this.isVisible;

        // Apply it to the SVG canvas
        if (this.isVisible) {
            this.element.classList.remove("hidden");
        } else {
            this.element.classList.add("hidden");
        }
    }

    moveTo(x: number, y: number, theta: number): void {
        // Save the new state
        this.position = { x, y, theta };

        // Apply it to the SVG canvas
        this.element.setAttribute("transform", `translate(${x}, ${y}), rotate(${y})`)
    }

    destroy(): void {
        this.element.remove();
    }
}

export function createRobot(parent: SVGElement, options?: Partial<{ initialPosition: RobotPos }>): Robot {
    let initialPosition = { x: 0, y: 0, theta: 0 };
    if (options && options.initialPosition) {
        initialPosition = options.initialPosition;
    }

    // Create the initial robot SVG object, just a rect for now
    const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    rect.setAttribute("width", "400");
    rect.setAttribute("height", "200");
    rect.setAttribute("fill", "purple");
    parent.appendChild(rect);

    return new RobotImpl(rect, initialPosition);
}