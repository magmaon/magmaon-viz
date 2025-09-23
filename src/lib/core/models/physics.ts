/** "Alias type" for distances expressed in millimeters. */
export type DistanceMm = number;
/** "Alias type" for angles expressed in degrees. */
export type AngleDeg = number;

/**
 * Robot position, 3-component coordinates, with location in the X, Y axes and its rotation according to its Theta angle.
 */
export interface RobotPosition {
    /** X-Coordinate, unit is the millimeter. */
    x: DistanceMm;
    /** Y-Coordinate, unit is the millimeter. */
    y: DistanceMm;
    /** 
     * Theta, unit is the degree.
     * 
     * Preferably expressed as an angle between -180° and 180°.
     */
    theta: AngleDeg;
}