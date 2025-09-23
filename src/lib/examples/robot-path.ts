export function path1(tick: number) {
    // Tick is a number that increments every "frame" ~ 10Hz
    // - For the first 10s, it just goes forward from 300,1700 to 300,300.
    if (tick < 100) {
        return { x: 300, y: 1700 - tick * 14, theta: -90 };
    }
    // - Then it rotates to face "down" (theta = 0 degrees)
    else if (tick < 200) {
        return { x: 300, y: 300, theta: -90 + (tick - 100) * 0.9 };
    }
    // - Then it goes to 2700,300.
    else if (tick < 300) {
        return { x: 300 + (tick - 200) * 24, y: 300, theta: 0 };
    }
    // - Then it rotates to face "bottom" (theta = -90 degrees)
    else if (tick <= 400) {
        return { x: 2700, y: 300, theta: (tick - 300) * -0.9 };
    }
}  