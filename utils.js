

const NUM_ENTRANCE_BOXES = 30
const ENTRANCE_X_SPACING = 55
const ENTRANCE_HALF_WIDTH = 150
const Z_BUFFER = 1500
const BOX_WIDTH = 50

const INTRO_Z_SPACING = 60
const INTRO_NUM_VERTICAL_BOXES = 20

function drawStraightHorizontalLine(startX, xSpacing, numBoxes, zSlide, drawBox) {
    for (let i = 0; i < numBoxes; i++) {
        drawBox(1, startX, 0, -zSlide - Z_BUFFER);
        startX += xSpacing;
    }
}

function drawStraightVerticalLine(startX, startZ){
	let firstZ = startZ + Z_BUFFER
	for(let i = 0; i < INTRO_NUM_VERTICAL_BOXES; i++){
		drawNBoxes(1, startX, 0, -startZ - firstZ)
		startZ += INTRO_Z_SPACING
	}
}

// Draws the entrance with a specified gap and spacing
function drawEntrance(startX, startZ,  drawBox) {
    let firstBoxLeftX = startX - (NUM_ENTRANCE_BOXES * ENTRANCE_X_SPACING) - ENTRANCE_HALF_WIDTH + BOX_WIDTH;
    drawStraightHorizontalLine(firstBoxLeftX, ENTRANCE_X_SPACING, NUM_ENTRANCE_BOXES, startZ, drawBox);

    let firstBoxRightX = startX + ENTRANCE_HALF_WIDTH;
    drawStraightHorizontalLine(firstBoxRightX, ENTRANCE_X_SPACING, NUM_ENTRANCE_BOXES, startZ, drawBox);
}

function drawIntroBoxes(startX, startZ, drawBox) {
	drawEntrance(startX, startZ, drawBox)

	let firstBoxLeftX = startX - ENTRANCE_HALF_WIDTH
	drawStraightVerticalLine(firstBoxLeftX, startZ)

	let firstBoxRightX = startX + ENTRANCE_HALF_WIDTH
	drawStraightVerticalLine(firstBoxRightX, startZ)
}
