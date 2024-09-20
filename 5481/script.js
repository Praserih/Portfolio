let vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)

const width = vw/5;
const height = width;
const gridSize = 5;
const cellSize = width / gridSize;

const primaryStrokeWeight = width/(gridSize*1.1);
const secondaryStrokeWeight = primaryStrokeWeight;
const tertiaryStrokeWeight = secondaryStrokeWeight/2;

// Cached SVG logos
let cachedSvgs = [];

// Function to generate a new SVG logo
function generateLogo() {
    const svg = createSvgLogoElement();
    const pattern = generatePattern(gridSize);
    const primaryPaths = generatePaths(pattern, 1);
    const secondaryPaths = generatePaths(pattern, 0);

    primaryPaths.forEach(path => {
        const svgPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        svgPath.setAttribute('d', path);
        svgPath.setAttribute('class', 'primary-path'); // CSS class for styling
        svg.appendChild(svgPath);
    });

    secondaryPaths.forEach(path => {
        const svgPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        svgPath.setAttribute('d', path);
        svgPath.setAttribute('class', 'secondary-path'); // CSS class for styling
        svg.appendChild(svgPath);
    });

    // Generate tertiary paths
    appendTertiaryPaths(svg, pattern, primaryPaths);

    appendLogoToDocument(svg);
    cacheSvg(svg);
}

// Function to create an SVG element
function createSvgLogoElement() {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', width);
    svg.setAttribute('height', height);
    svg.setAttribute('class', 'logo-svg'); // CSS styling
    return svg;
}

// Function to append the generated logo to the document
function appendLogoToDocument(svg) {
    // Set stroke weights in JavaScript using variables
    svg.querySelectorAll('.primary-path').forEach(path => {
        path.setAttribute('stroke-width', primaryStrokeWeight); // Primary path stroke weight
    });
    svg.querySelectorAll('.secondary-path').forEach(path => {
        path.setAttribute('stroke-width', secondaryStrokeWeight); // Secondary path stroke weight
    });
    svg.querySelectorAll('.tertiary-path').forEach(path => {
        path.setAttribute('stroke-width', tertiaryStrokeWeight); // Tertiary path stroke weight
    });

    // Append the generated SVG as a separate element
    document.body.appendChild(svg);
}

// Function to cache generated SVG logos
function cacheSvg(svg) {
    const serializedSvg = new XMLSerializer().serializeToString(svg);
    cachedSvgs.push(serializedSvg);
    localStorage.setItem('cachedSvgs', JSON.stringify(cachedSvgs));
}

// Function to trace a path
function tracePath(pattern, startX, startY, type, visited) {
    const startXCoord = startX * cellSize + cellSize / 2;
    const startYCoord = startY * cellSize + cellSize / 2;
    const path = [`M${startXCoord},${startYCoord}`];
    let x = startX, y = startY;
    visited[y][x] = true;

    const directions = [[0, -1], [1, 0], [0, 1], [-1, 0]]; // Up, Right, Down, Left
    let moved = false;

    while (true) {
        let foundNext = false;
        for (const [dx, dy] of directions) {
            const newX = x + dx, newY = y + dy;
            if (isValidPosition(newX, newY, gridSize) && !visited[newY][newX] && pattern[newY][newX] === type) {
                const newXCoord = newX * cellSize + cellSize / 2;
                const newYCoord = newY * cellSize + cellSize / 2;
                path.push(`L${newXCoord},${newYCoord}`);
                x = newX;
                y = newY;
                visited[y][x] = true;
                moved = true;
                foundNext = true;
                break;
            }
        }
        if (!foundNext) break;
    }

    // If no movement occurred, add a 0-length L command
    if (!moved) {
        path.push(`L${startXCoord},${startYCoord}`);
    }

    return path.join(' ');
}

// Function to generate a pattern grid
function generatePattern(gridSize) {
    const pattern = Array.from({ length: gridSize }, () => Array(gridSize).fill(-1));
    let primaryX = Math.floor(Math.random() * gridSize);
    let primaryY = Math.floor(Math.random() * gridSize);
    pattern[primaryY][primaryX] = 1;

    let secondaryX, secondaryY;
    do {
        secondaryX = Math.floor(Math.random() * gridSize);
        secondaryY = Math.floor(Math.random() * gridSize);
    } while (secondaryX === primaryX && secondaryY === primaryY);
    pattern[secondaryY][secondaryX] = 0;

    for (let y = 0; y < gridSize; y++) {
        for (let x = 0; x < gridSize; x++) {
            if (pattern[y][x] === -1) {
                pattern[y][x] = Math.random() < 0.5 ? 1 : 0;
            }
        }
    }

    return pattern;
}

// Function to validate position within grid
function isValidPosition(x, y, gridSize) {
    return x >= 0 && x < gridSize && y >= 0 && y < gridSize;
}

// Function to generate and return paths
function generatePaths(pattern, type) {
    const paths = [];
    const visited = Array.from({ length: gridSize }, () => Array(gridSize).fill(false));

    for (let y = 0; y < gridSize; y++) {
        for (let x = 0; x < gridSize; x++) {
            if (pattern[y][x] === type && !visited[y][x]) {
                const path = tracePath(pattern, x, y, type, visited);
                paths.push(path);
            }
        }
    }

    return paths;
}

// Function to append tertiary paths to the SVG
function appendTertiaryPaths(svg, pattern, primaryPaths) {
    const endpoints = getEndpoints(primaryPaths);
    const numTertiaryPaths = Math.ceil(endpoints.length / 2); // At least half of the endpoints

    for (let i = 0; i < numTertiaryPaths; i++) {
        const randomEndpoint = endpoints.splice(Math.floor(Math.random() * endpoints.length), 1)[0];
        const svgPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        svgPath.setAttribute('d', `M${randomEndpoint.x},${randomEndpoint.y} L${randomEndpoint.x},${randomEndpoint.y}`);
        svgPath.setAttribute('class', 'tertiary-path');
        svg.appendChild(svgPath);
    }
}

// Function to get the endpoints of paths (for tertiary path generation)
function getEndpoints(paths) {
    return paths.map(path => {
        const coords = path.split('L').pop().trim().split(',');
        return { x: parseFloat(coords[0]), y: parseFloat(coords[1]) };
    });
}

// Generate an initial logo when the page loads
window.onload = () => {
    generateLogo();

    // Append a new logo on each click
    document.addEventListener('click', generateLogo);
};
