import type { RobotPos, TimestampedRobotPos } from "./robot";

function curvedPath(): (tick: number) => RobotPos {
    const startpoint = { x: 0, y: 0, theta: -90 };
    const endpoint = { x: 2500, y: 500, theta: -90 };
    const controlOne = { x: 500, y: 500, theta: 45 };
    const controlTwo = { x: 2500, y: 1000, theta: 45 };

    function lerpAngle(a: number, b: number, t: number): number {
        let diff = b - a;
        while (diff > 180) diff -= 360;
        while (diff < -180) diff += 360;
        return a + diff * t;
    }

    return (tick: number) => {
        const t = Math.max(0, Math.min(tick / 100, 1)); // clamp t between 0 and 1

        const x =
            Math.pow(1 - t, 3) * startpoint.x +
            3 * Math.pow(1 - t, 2) * t * controlOne.x +
            3 * (1 - t) * Math.pow(t, 2) * controlTwo.x +
            Math.pow(t, 3) * endpoint.x;

        const y =
            Math.pow(1 - t, 3) * startpoint.y +
            3 * Math.pow(1 - t, 2) * t * controlOne.y +
            3 * (1 - t) * Math.pow(t, 2) * controlTwo.y +
            Math.pow(t, 3) * endpoint.y;

        const theta = lerpAngle(startpoint.theta, endpoint.theta, t);

        return { x, y, theta };
    };
}

export const PATH1 = curvedPath();