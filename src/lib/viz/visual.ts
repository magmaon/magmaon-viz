export interface Visual {
    /**
     * Hide the visual representation.
     */
    hide(): void;
    /**
     * Show the visual representation.
     */
    show(): void;
    /**
     * Remove the visual from the scene and cleanup.
     */
    remove(): void;
}