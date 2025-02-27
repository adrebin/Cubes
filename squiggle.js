class Squiggle {
    constructor(startX, startZ, drawBox) {
        this.startX = startX;
        this.startZ = startZ;
        this.drawBox = drawBox;

        this.zBack = 1500;
        this.amplitude = 300;  // Amplitude of the sine wave
        this.frequency = 0.1; // Frequency of the sine wave
        this.numBoxes = 60;    // Number of boxes for the squiggle path
        this.xSpacing = 45;
        this.zSpacing = 55;     // Spacing between boxes
    }

    // Draws the snake-like sine wave path with two boxes per zPosition
    drawSineWavePath() {
        print("drawing sine wave");
        for (let i = 0; i < this.numBoxes; i++) {
            let zOffset = (i * this.zSpacing) + BOX_WIDTH;
            let sineValue = Math.sin(i * this.frequency) * this.amplitude; // Apply sine wave

            // First box (at current z position)
            let xPosition1 = this.startX - ENTRANCE_HALF_WIDTH + sineValue;
            let zPosition1 = this.startZ + zOffset;
            this.drawBox(1, xPosition1, 0, -zPosition1 - this.zBack);

            let xPosition2 = this.startX + ENTRANCE_HALF_WIDTH + sineValue
            this.drawBox(1, xPosition2, 0, -zPosition1 - this.zBack)
        }
    }

    show() {
        // Draw the entrance first
        drawEntrance(this.startX, this.startZ, this.drawBox);

        // Draw the squiggle path (snake-like sine wave)
        this.drawSineWavePath();
    }
}
