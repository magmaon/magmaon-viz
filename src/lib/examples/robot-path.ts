export function path1(tick: number) {
    // Tick is a number that increments every "frame" ~ 10Hz
    // - For the first 10s, it just goes forward from 0,0 to 1500,0.
    if (tick < 100) {
        return { x: tick * 15, y: 0, theta: -90 };
    }
    // - Then it rotates to face "down" (theta = 0 degrees)
    else if (tick < 200) {
        return { x: 1500, y: 0, theta: -90 + (tick - 100) * 0.9 };
    }
    // - Then it goes down to 1500,2500
    else if (tick < 300) {
        return { x: 1500, y: (tick - 200) * 25, theta: 0 };
    }
    // - Then it rotates to face "bottom" (theta = -90 degrees)
    else if (tick < 400) {
        return { x: 1500, y: 2500, theta: 0 - (tick - 300) * 0.9 };
    }
}  