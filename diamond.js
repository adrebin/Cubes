

class Diamond {
	constructor(startX, startZ, drawBox) {
		this.startX = startX;
		this.startZ = startZ;
		this.drawBox = drawBox;

		this.zBack = 1500;
	}
  
 // 	// Draws the entrance with a specified gap and spacing
	// drawEntrance() {
	//     let numBoxes = 30;
	//     let spacing = 55;
	//     let entranceHalfWidth = 100;  // This controls the gap of the entrance
	//     let firstBoxLeftX = this.startX - (numBoxes * spacing) - entranceHalfWidth + 50;
	//     this.drawStraightLine(firstBoxLeftX, spacing, numBoxes, this.startZ);

	//     let firstBoxRightX = this.startX + entranceHalfWidth;
	//     this.drawStraightLine(firstBoxRightX, spacing, numBoxes, this.startZ);
	// }

	// // Draws a straight line of boxes (already defined in your code)
	// drawStraightLine(startX, spacing, numBoxes, zSlide) {
	//     for (let i = 0; i < numBoxes; i++) {
	//         this.drawBox(1, startX, 0, -zSlide - this.zBack);
	//         startX += spacing;
	//     }
	// }

	// Draws a diagonal edge of the diamond (modified with dynamic xSpacing and zSpacing)
	drawDiagonalEdge(startX, startZ, numBoxes, xSpacing, zSpacing) {
	    for (let i = 0; i < numBoxes; i++) {
	        this.drawBox(1, startX + (i * xSpacing), 0, -startZ - (i * zSpacing) - this.zBack);
	    }
	}

	// Draws the full diamond shape with 4 diagonal edges
	drawOuterDiamond(numBoxes, xSpacing, zSpacing, entranceHalfWidth) {
	    // Left outwards edge
	    let leftOutX = this.startX - entranceHalfWidth 
	    let leftOutZ = this.startZ + 50;
	    this.drawDiagonalEdge(leftOutX, leftOutZ, numBoxes, -xSpacing, zSpacing);

	    // Right outwards edge
	    let rightOutX = this.startX + entranceHalfWidth
	    let rightOutZ = this.startZ + 50;
	    this.drawDiagonalEdge(rightOutX, rightOutZ, numBoxes, xSpacing, zSpacing);

	    // Left inwards edge
	   	let leftInX = this.startX - (entranceHalfWidth) - (numBoxes * xSpacing)
	    let leftInZ = this.startZ + (numBoxes * zSpacing);
	    this.drawDiagonalEdge(leftInX, leftInZ, numBoxes, xSpacing, zSpacing);

	    // Right inwards edge
	    let rightInX = this.startX + entranceHalfWidth + (numBoxes * xSpacing)
	    let rightInZ = this.startZ + (numBoxes * zSpacing);
	    this.drawDiagonalEdge(rightInX, rightInZ, numBoxes, -xSpacing, zSpacing); 
	}

	drawInnerDiamond(numBoxes, xSpacing, zSpacing, zBuffer){
		// Left outwards edge
	    let leftOutX = this.startX;
	    let leftOutZ = this.startZ + zBuffer;
	    this.drawDiagonalEdge(leftOutX, leftOutZ, numBoxes, -xSpacing, zSpacing);

	    // Right outwards edge
	    let rightOutX = this.startX;
	    let rightOutZ = this.startZ + zBuffer;
	    this.drawDiagonalEdge(rightOutX, rightOutZ, numBoxes, xSpacing, zSpacing);

	    // Left inwards edge
	   	let leftInX = this.startX  - (numBoxes * xSpacing)  + 50
	    let leftInZ = this.startZ + zBuffer + (numBoxes * zSpacing);
	    this.drawDiagonalEdge(leftInX, leftInZ, numBoxes, xSpacing, zSpacing);

	    // Right inwards edge
	    let rightInX = this.startX + (numBoxes * xSpacing) - 50
	    let rightInZ = this.startZ + zBuffer + (numBoxes * zSpacing);
	    this.drawDiagonalEdge(rightInX, rightInZ, numBoxes, -xSpacing, zSpacing); 
	}


	show() {
	    // Ensure the diamond has the same gap for entrance and exit
	    let entranceHalfWidth = 100;  // This is the gap you want

	    // Set the number of boxes for the diamond
	    let numBoxes = 15;  // Adjust based on how large the diamond should be
	    let xSpacing = 45;  // Horizontal spacing between boxes
	    let zSpacing = 80;  // Vertical spacing between boxes

	    // Draw the entrance first
	    drawEntrance(this.startX, this.startZ, this.drawBox);

	    // Draw the diamond
	    this.drawOuterDiamond(numBoxes, xSpacing, zSpacing, entranceHalfWidth);
	    
	    let scaleDownNumBoxes = 7
	    let innerNumBoxes = numBoxes - scaleDownNumBoxes
	    let zBuffer = scaleDownNumBoxes * (50 + xSpacing)
	    this.drawInnerDiamond(innerNumBoxes, xSpacing, zSpacing, zBuffer);
	}


}