// Get the viewport width and set it as a CSS custom property
function setViewportWidth() {
    const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
    document.documentElement.style.setProperty('--vw', `${vw}px`);
}

// Call setViewportWidth initially and on window resize
setViewportWidth();
window.addEventListener('resize', setViewportWidth);

// Constants for SVG generation
const gridSize = 5;

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
        svgPath.setAttribute('class', 'primary-path');
        svg.appendChild(svgPath);
    });

    secondaryPaths.forEach(path => {
        const svgPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        svgPath.setAttribute('d', path);
        svgPath.setAttribute('class', 'secondary-path');
        svg.appendChild(svgPath);
    });

    // Create tertiary paths directly in the SVG
    appendTertiaryPaths(svg, pattern, primaryPaths);

    appendLogoToDocument(svg);
    cacheSvg(svg);

    // Animate the paths
    animatePaths(svg).then(() => {
        // Animate tertiary paths from scale 0 to 100% once the primary animation is finished
        const tertiaryPaths = svg.querySelectorAll('.tertiary-path');
        tertiaryPaths.forEach(path => {
            const bbox = path.getBBox();
            const centerX = bbox.x + bbox.width / 2;
            const centerY = bbox.y + bbox.height / 2;
            path.style.transformOrigin = `${centerX}px ${centerY}px`;
            path.style.transform = 'scale(0)';
            path.animate([
                { transform: 'scale(0)' },
                { transform: 'scale(1)' }
            ], {
                duration: 200,
                fill: 'forwards',
                easing: 'ease-out'
            });
        });
    });
}

// Function to create an SVG element
function createSvgLogoElement() {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 100 100');
    svg.setAttribute('class', 'logo-svg');
    return svg;
}

// Function to append the generated logo to the document
function appendLogoToDocument(svg) {
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
    const cellSize = 100 / gridSize;
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
        svgPath.setAttribute('transform', 'scale(0)');
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

// Function to animate SVG paths
function animatePaths(svg) {
    return new Promise((resolve) => {
        const primaryPaths = svg.querySelectorAll('.primary-path');
        const secondaryPaths = svg.querySelectorAll('.secondary-path');

        // Animate primary and secondary paths
        const animations = [...primaryPaths, ...secondaryPaths].map(path => {
            const length = path.getTotalLength();
            path.style.strokeDasharray = length;
            path.style.strokeDashoffset = length;
            return path.animate([
                { strokeDashoffset: length },
                { strokeDashoffset: 0 }
            ], {
                duration: 1000,
                fill: 'forwards',
                easing: 'ease-out'
            });
        });

        // Resolve the promise when all animations are complete
        Promise.all(animations.map(animation => animation.finished)).then(() => {
            resolve();
        });
    });
}

// Modify the generateLogo function to include animation
