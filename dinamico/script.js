const svgArray = [
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14.74 14.74"><path d="M0,7.37C0,3.3,3.3,0,7.37,0h7.37v14.74H7.37C3.3,14.74,0,11.44,0,7.37Z"/></svg>',
  
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14.74 14.74"><rect width="14.74" height="14.74"/></svg>',
  
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14.74 14.74"><rect width="14.74" height="14.74" rx="7.37" ry="7.37"/></svg>',
  
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14.74 14.74"><path d="M0,14.74V0h14.74c0,8.14-6.6,14.74-14.74,14.74Z"/></svg>',
  
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14.74 14.74"><path d="M0,7.37V0h7.37c4.07,0,7.37,3.3,7.37,7.37c0,4.07-3.3,7.37-7.37,7.37C3.3,14.74,0,11.44,0,7.37Z"/></svg>'
];



function createRandomSVG() {
  const gridSize = 3;
  const elementSize = 14.74;
  const gap = 2.83;
  const totalSize = gridSize * elementSize + (gridSize - 1) * gap;
  
  const svgStart = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${totalSize} ${totalSize}">`;
  const svgEnd = '</svg>';
  let content = '';

  // Create a copy of svgArray to manipulate
  let availableSVGs = [...svgArray];
  
  // Ensure one of each type is included
  const mandatorySVGs = [0, 1, 2, 3, 4];
  
  // Shuffle the mandatory SVGs
  for (let i = mandatorySVGs.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [mandatorySVGs[i], mandatorySVGs[j]] = [mandatorySVGs[j], mandatorySVGs[i]];
  }

  // Calculate how many additional SVGs we need to fill the grid
  const additionalSVGs = gridSize * gridSize - mandatorySVGs.length;

  // Add additional SVGs to mandatorySVGs, excluding circle (index 2) and square (index 1)
  for (let i = 0; i < additionalSVGs; i++) {
    const validIndices = [0, 3, 4];
    const randomIndex = validIndices[Math.floor(Math.random() * validIndices.length)];
    mandatorySVGs.push(randomIndex);
  }

  // Shuffle again to randomize the order of all SVGs
  for (let i = mandatorySVGs.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [mandatorySVGs[i], mandatorySVGs[j]] = [mandatorySVGs[j], mandatorySVGs[i]];
  }

  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      const svgIndex = mandatorySVGs.pop();
      const selectedSVG = availableSVGs[svgIndex];
      const parsedSVG = new DOMParser().parseFromString(selectedSVG, 'image/svg+xml');
      const element = parsedSVG.querySelector('path, rect');
      
      if (element) {
        const randomRotation = Math.floor(Math.random() * 4) * 90; // 0, 90, 180, or 270 degrees
        const centerX = j * (elementSize + gap) + elementSize / 2;
        const centerY = i * (elementSize + gap) + elementSize / 2;
        const transform = `transform="translate(${centerX} ${centerY}) rotate(${randomRotation}) translate(${-elementSize / 2} ${-elementSize / 2})"`;
        content += `<g ${transform}>${element.outerHTML}</g>`;
      }
    }
  }

  return svgStart + content + svgEnd;
}

// Update the createSVGContainer function
function createSVGContainer() {
  const svgContainer = document.createElement('div');
  svgContainer.className = 'svg-container';
  svgContainer.innerHTML = createRandomSVG();
  return svgContainer;
}

// Function to reload all SVG containers
function reloadAllSVGs() {
  const containers = document.querySelectorAll('.svg-container');
 
  containers.forEach((container, index) => {
    setTimeout(() => {
      container.innerHTML = createRandomSVG();
    }, index * 100); // 0.3 seconds delay for each container
  });
}

// Create 16 non-repeating containers and set up event listeners
document.addEventListener('DOMContentLoaded', () => {
  const modulesContainer = document.getElementById('moduli');
  for (let i = 0; i < 16; i++) {
    const container = createSVGContainer();
    modulesContainer.appendChild(container);
  }

  // Add click event listener to reload SVGs
  document.addEventListener('click', reloadAllSVGs);

  // Add drag event listeners to reload SVGs
  let isDragging = false;
  document.addEventListener('mousedown', () => {
    isDragging = false;
  });
  document.addEventListener('mousemove', () => {
    isDragging = true;
  });
  document.addEventListener('mouseup', () => {
    if (isDragging) {
      reloadAllSVGs();
    }
    isDragging = false;
  });

  // Touch events for mobile devices
  document.addEventListener('touchstart', () => {
    isDragging = false;
  });
  document.addEventListener('touchmove', () => {
    isDragging = true;
  });
  document.addEventListener('touchend', () => {
    if (isDragging) {
      reloadAllSVGs();
    }
    isDragging = false;
  });
});

// Algoritmi //
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
const maxLogos = 45; // Maximum number of logos on screen

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
  appendTertiaryPaths(svg, pattern, primaryPaths, secondaryPaths);

  // Check the number of logos and manage them
  const algoritmiContainer = document.getElementById("algoritmi");

  if (algoritmiContainer.children.length >= maxLogos) {

      algoritmiContainer.removeChild(algoritmiContainer.firstChild); // Remove the oldest logo
      
   }

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
  document.getElementById("algoritmi").appendChild(svg);
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
function appendTertiaryPaths(svg, pattern, primaryPaths, secondaryPaths) {
  const primaryEndpoints = getEndpoints(primaryPaths);
  const secondaryEndpoints = getEndpoints(secondaryPaths);
  const allEndpoints = [...primaryEndpoints, ...secondaryEndpoints];
  const numTertiaryPaths = Math.ceil(allEndpoints.length / 3); // At least half of the endpoints

  for (let i = 0; i < numTertiaryPaths; i++) {
      const randomEndpoint = allEndpoints.splice(Math.floor(Math.random() * allEndpoints.length), 1)[0];
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

//Matrice//
const matrix_svg = [
  [
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 102.82 150.84" class="svg-icon" data-icon-type="circle">
    <path d="M27.4,35.54c9.8,0,17.77-7.97,17.77-17.77S37.2,0,27.4,0,9.63,7.97,9.63,17.77s7.97,17.77,17.77,17.77ZM27.4,6.78c6.06,0,10.99,4.93,10.99,10.99s-4.93,10.99-11,10.99-10.99-4.93-10.99-10.99,4.93-10.99,11-10.99ZM20.22,17.77c0-3.96,3.22-7.18,7.18-7.18s7.18,3.22,7.18,7.18-3.22,7.18-7.18,7.18-7.18-3.22-7.18-7.18Z"/>
    </svg>`,
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 102.82 150.84" class="svg-icon" data-icon-type="spiral">
      <path d="M15.52,28.83c3.41,2.34,7.19,3.5,10.93,3.5,4.46,0,8.87-1.64,12.56-4.89,7.37-6.47,9.47-16.97,5.11-25.53-.85-1.67-2.89-2.33-4.56-1.48-1.67.85-2.33,2.89-1.48,4.56,3.45,6.76.58,13.74-3.54,17.36-4.53,3.98-10.2,4.31-15.17.9-2.16-1.5-3.69-4.05-4.1-6.83-.37-2.54.22-4.93,1.66-6.73l.14-.19c1.74-2.51,5.13-3.14,7.58-2.46,1.32.37,3.56,1.43,3.75,4.47.06.82-.32,1.78-.93,2.38-.42.42-.88.61-1.42.56-.04,0-.09-.02-.13-.04-.05-1.69-1.35-3.11-3.07-3.27-1.86-.19-3.52,1.19-3.69,3.06-.15,1.63.37,3.24,1.47,4.53,1.22,1.43,3.08,2.36,4.9,2.48,2.46.21,4.84-.67,6.69-2.49,2.04-2.01,3.14-4.89,2.94-7.68-.33-5.1-3.66-9.14-8.7-10.54-5.59-1.55-11.69.52-14.89,5.04-2.58,3.27-3.64,7.47-3.01,11.85.68,4.67,3.21,8.83,6.96,11.43Z"/>
    </svg>`,
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 102.82 150.84" class="svg-icon" data-icon-type="lines">
    <path d="M9.63,14.5c0-1.87,1.52-3.39,3.39-3.39h28.77c1.87,0,3.39,1.52,3.39,3.39s-1.52,3.39-3.39,3.39H13.02c-1.87,0-3.39-1.52-3.39-3.39ZM13.02,6.78h28.77c1.87,0,3.39-1.52,3.39-3.39s-1.52-3.39-3.39-3.39H13.02c-1.87,0-3.39,1.52-3.39,3.39s1.52,3.39,3.39,3.39ZM13.02,29.02h28.77c1.87,0,3.39-1.52,3.39-3.39s-1.52-3.39-3.39-3.39H13.02c-1.87,0-3.39,1.52-3.39,3.39s1.52,3.39,3.39,3.39Z"/>
    </svg>`
  ],
  [
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 102.82 150.84" class="svg-icon" data-icon-type="circle-2">
      <path d="M75.42,150.84c9.8,0,17.77-7.97,17.77-17.77s-7.97-17.77-17.77-17.77-17.77,7.97-17.77,17.77,7.97,17.77,17.77,17.77ZM75.42,122.08c6.06,0,10.99,4.93,10.99,10.99s-4.93,10.99-11,10.99-10.99-4.93-10.99-10.99,4.93-10.99,11-10.99ZM68.24,133.07c0-3.96,3.22-7.18,7.18-7.18s7.18,3.22,7.18,7.18-3.22,7.18-7.18,7.18-7.18-3.22-7.18-7.18Z"/>
    </svg>`,
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 102.82 150.84" class="svg-icon" data-icon-type="spiral-2">
      <path d="M63.25,150.42c1.67-.85,2.33-2.89,1.48-4.56-3.45-6.76-.58-13.74,3.54-17.36,4.52-3.97,10.2-4.31,15.17-.9,2.16,1.5,3.69,4.05,4.1,6.83.37,2.54-.22,4.92-1.66,6.73l-.14.19c-1.74,2.51-5.13,3.14-7.57,2.46-1.32-.37-3.56-1.43-3.76-4.47-.06-.82.32-1.78.93-2.38.42-.42.87-.61,1.42-.56.04,0,.09.02.13.04.05,1.69,1.35,3.11,3.07,3.27,1.84.18,3.51-1.19,3.69-3.06.15-1.63-.37-3.24-1.47-4.53-1.22-1.43-3.08-2.36-4.9-2.48-2.46-.21-4.84.67-6.7,2.49-2.04,2.01-3.14,4.89-2.94,7.68.33,5.1,3.66,9.14,8.71,10.54,1.24.34,2.51.51,3.76.51,4.39,0,8.64-2.03,11.12-5.55,2.58-3.27,3.64-7.47,3.01-11.85-.68-4.67-3.21-8.83-6.96-11.43-7.48-5.12-16.7-4.58-23.49,1.39-7.37,6.47-9.47,16.97-5.11,25.53.85,1.67,2.89,2.33,4.56,1.48Z"/>
    </svg>`,
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 102.82 150.84" class="svg-icon" data-icon-type="lines-2">
      <path d="M57.65,136.34c0-1.87,1.52-3.39,3.39-3.39h28.77c1.87,0,3.39,1.52,3.39,3.39s-1.52,3.39-3.39,3.39H61.04c-1.87,0-3.39-1.52-3.39-3.39ZM61.04,150.84h28.77c1.87,0,3.39-1.52,3.39-3.39s-1.52-3.39-3.39-3.39H61.04c-1.87,0-3.39,1.52-3.39,3.39s1.52,3.39,3.39,3.39ZM61.04,128.6h28.77c1.87,0,3.39-1.52,3.39-3.39s-1.52-3.39-3.39-3.39H61.04c-1.87,0-3.39,1.52-3.39,3.39s1.52,3.39,3.39,3.39Z"/>
    </svg>`
  ],
  [
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 102.82 150.84" class="svg-icon" data-icon-type="hook">
      <path d="M25.66,103.92c-.77-.55-1.47-1.06-2.09-1.53-7.97-6.04-16.48-13.29-16.48-22.92,0-5,1.22-21.51,17.07-24.24,11.52-2.29,19.71,5.02,22.45,12.78,2.4,6.78,1.36,15.92-8.65,21.16-6.81,3.35-13.75.39-17.31-3.78-3.91-4.58-4.17-10.26-.69-15.19,1.53-2.14,4.1-3.64,6.88-4,2.54-.33,4.92.29,6.7,1.76l.19.14c2.49,1.78,3.07,5.17,2.36,7.61-.38,1.31-1.48,3.54-4.52,3.69-.82.05-1.77-.34-2.37-.97-.41-.43-.6-.89-.54-1.43,0-.04.02-.09.04-.13,1.69-.02,3.13-1.3,3.32-3.03.2-1.86-1.15-3.53-3.01-3.73-1.62-.17-3.24.33-4.55,1.41-1.45,1.2-2.41,3.05-2.55,4.87-.25,2.46.6,4.85,2.39,6.73,1.98,2.07,4.84,3.22,7.63,3.05,5.1-.26,9.19-3.54,10.65-8.56,1.63-5.57-.36-11.7-4.83-14.96-3.24-2.62-7.42-3.75-11.81-3.17-4.68.62-8.87,3.09-11.52,6.8-5.23,7.41-4.81,16.64,1.07,23.51,6.37,7.46,16.84,9.71,25.53,5.42,11.47-6.01,16.17-17.57,11.97-29.46-3.8-10.76-15.38-20.11-30.08-17.19-13.95,2.41-22.61,14.25-22.61,30.91,0,12.13,9.21,20.78,19.16,28.32.65.5,1.4,1.03,2.21,1.62,6.47,4.68,16.25,11.76,16.25,22.62v.33c-.2,2.24-1.66,11.71-11.67,11.71-5.14,0-10.6-2.96-10.6-8.45,0-8.54,6.81-8.79,7.58-8.79,5.53,0,5.73,5.04,5.73,5.08,0,1.93-1.16,2.98-3.46,3.13.8-.53,1.37-1.41,1.49-2.44.21-1.86-1.13-3.54-2.99-3.75-1.45-.16-2.89.28-4.05,1.23-1.27,1.05-2.1,2.66-2.22,4.22-.21,1.95.38,3.8,1.65,5.21,1.35,1.5,3.32,2.32,5.56,2.32,6.47,0,10.81-3.99,10.81-9.92,0-3.87-3.06-11.86-12.51-11.86-5.77,0-14.36,4.14-14.36,15.56,0,9.89,8.95,15.23,17.38,15.23,13.41,0,17.9-11.36,18.44-18.08v-.74c.01-14.32-12.38-23.29-19.04-28.11Z"/>
    </svg>`,
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 102.82 150.84" class="svg-icon" data-icon-type="double-hook">
      <path d="M9.6,85.03v-33.62c0-1.87,1.52-3.39,3.39-3.39s3.39,1.52,3.39,3.39v33.62c0,.78.63,1.41,1.41,1.41s1.41-.63,1.41-1.41v-19.21c0-9.81,7.98-17.8,17.79-17.8s17.8,7.98,17.8,17.8v81.64c0,1.87-1.52,3.39-3.39,3.39s-3.39-1.52-3.39-3.39v-81.64c0-6.08-4.94-11.02-11.02-11.02s-11.02,4.94-11.02,11.02v19.21c0,4.52-3.67,8.19-8.19,8.19s-8.19-3.67-8.19-8.19ZM37,57.63c-4.52,0-8.19,3.67-8.19,8.19v19.21c0,6.08-4.94,11.02-11.02,11.02s-11.02-4.94-11.02-11.02v-33.62c0-1.87-1.52-3.39-3.39-3.39s-3.39,1.52-3.39,3.39v33.62c0,9.81,7.98,17.79,17.79,17.79s17.8-7.98,17.8-17.79v-19.21c0-.78.63-1.41,1.41-1.41s1.41.63,1.41,1.41v81.64c0,1.87,1.52,3.39,3.39,3.39s3.39-1.52,3.39-3.39v-81.64c0-4.52-3.67-8.19-8.19-8.19Z"/>
    </svg>`,
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 102.82 150.84" class="svg-icon" data-icon-type="hook-spiral">
      <path d="M53.35,65.74c-3.8-10.76-15.38-20.11-30.07-17.18C8.6,51.09-.1,61.62,0,76.72v70.74c0,1.87,1.52,3.39,3.39,3.39s3.39-1.52,3.39-3.39v-70.76c-.08-11.86,6.19-19.48,17.74-21.47,11.51-2.29,19.71,5.02,22.45,12.78,2.4,6.79,1.36,15.92-8.65,21.17-2.93,1.44-6.16,1.79-9.29,1.08v-4.48c1.06.32,2.17.46,3.27.39,5.1-.25,9.18-3.53,10.65-8.55,1.63-5.57-.35-11.7-4.82-14.96-3.23-2.62-7.42-3.75-11.8-3.17-4.68.61-8.88,3.08-11.54,6.79-2.29,3.25-3.52,6.73-3.65,10.33v70.86c0,1.87,1.51,3.39,3.39,3.39s3.39-1.52,3.39-3.39v-70.67c.09-2.25.91-4.48,2.4-6.6,1.53-2.14,4.11-3.63,6.89-4,2.54-.33,4.92.29,6.7,1.76l.19.14c2.49,1.77,3.07,5.17,2.35,7.61-.38,1.31-1.48,3.53-4.52,3.69-.76.05-1.6-.26-2.2-.8-.25-.22-.67-.68-.7-1.27l-.02-.17.02-.16s.02-.08.04-.13c1.69-.02,3.14-1.31,3.32-3.04.19-1.86-1.16-3.53-3.02-3.72-1.62-.17-3.24.34-4.55,1.42-1.43,1.19-2.37,3-2.54,4.85-.05.4-.05.8-.02,1.19v69.9c0,1.87,1.52,3.39,3.39,3.39s3.39-1.52,3.39-3.39v-50.31c4.17.64,8.43,0,12.36-1.95,11.47-6.01,16.17-17.57,11.97-29.46Z"/>
    </svg>`
  ],
  [
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 102.82 150.84" class="svg-icon" data-icon-type="hook-2">
      <path d="M83.47,43.06c-.65-.49-1.4-1.03-2.21-1.62-6.47-4.68-16.25-11.76-16.25-22.62v-.33c.2-2.24,1.66-11.72,11.67-11.72,5.14,0,10.6,2.96,10.6,8.45,0,8.54-6.81,8.79-7.58,8.79-5.53,0-5.73-5.04-5.73-5.08,0-1.93,1.16-2.98,3.46-3.13-.8.53-1.37,1.41-1.49,2.44-.21,1.86,1.13,3.54,2.99,3.75,1.45.17,2.89-.27,4.05-1.23,1.27-1.05,2.1-2.66,2.22-4.22.21-1.95-.38-3.8-1.65-5.21-1.35-1.5-3.32-2.32-5.55-2.32-6.47,0-10.81,3.99-10.81,9.92,0,3.87,3.06,11.86,12.51,11.86,5.77,0,14.36-4.14,14.36-15.56,0-9.89-8.95-15.23-17.38-15.23-13.41,0-17.9,11.36-18.44,18.08v.74c-.01,14.32,12.38,23.29,19.04,28.11.77.55,1.47,1.06,2.09,1.53,7.97,6.04,16.48,13.29,16.48,22.92,0,5-1.22,21.51-17.07,24.24-11.53,2.29-19.71-5.02-22.45-12.78-2.4-6.78-1.36-15.92,8.65-21.16,6.81-3.36,13.75-.39,17.31,3.78,3.91,4.58,4.17,10.26.69,15.19-1.53,2.14-4.1,3.64-6.88,4-2.54.33-4.92-.29-6.7-1.76l-.19-.14c-2.49-1.78-3.07-5.17-2.36-7.61.38-1.31,1.48-3.54,4.52-3.69.82-.05,1.77.34,2.37.97.41.43.6.88.54,1.43,0,.04-.02.08-.04.13-1.69.02-3.13,1.3-3.32,3.03-.2,1.86,1.15,3.53,3.01,3.73,1.62.17,3.24-.33,4.55-1.41,1.45-1.2,2.4-3.05,2.55-4.87.25-2.46-.6-4.85-2.39-6.73-1.98-2.07-4.86-3.23-7.64-3.05-5.1.26-9.19,3.54-10.65,8.56-1.63,5.57.36,11.7,4.83,14.96,3.24,2.62,7.42,3.75,11.8,3.17,4.68-.62,8.87-3.09,11.53-6.8,5.23-7.41,4.81-16.64-1.07-23.51-6.37-7.46-16.84-9.71-25.53-5.42-11.47,6.01-16.17,17.57-11.97,29.46,3.32,9.4,12.58,17.73,24.67,17.73,1.75,0,3.55-.17,5.41-.54,13.95-2.41,22.61-14.25,22.61-30.91,0-12.13-9.21-20.78-19.16-28.32Z"/>
    </svg>`,
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 102.82 150.84" class="svg-icon" data-icon-type="hook-spiral-2">
      <path d="M99.43,0c-1.87,0-3.39,1.52-3.39,3.39v70.76c.08,11.87-6.18,19.48-17.74,21.47-11.51,2.29-19.71-5.02-22.45-12.78-2.4-6.79-1.36-15.92,8.65-21.17,2.93-1.44,6.16-1.79,9.29-1.08v4.48c-1.06-.32-2.17-.46-3.27-.39-5.1.25-9.18,3.53-10.65,8.55-1.63,5.57.35,11.7,4.82,14.96,2.68,2.17,6.02,3.32,9.58,3.32.73,0,1.47-.05,2.22-.15,4.68-.61,8.88-3.08,11.54-6.79,2.29-3.25,3.52-6.73,3.65-10.33V3.39c0-1.87-1.51-3.39-3.39-3.39s-3.39,1.52-3.39,3.39v70.67c-.09,2.25-.91,4.48-2.4,6.6-1.53,2.14-4.11,3.63-6.89,4-2.54.33-4.92-.29-6.7-1.76l-.19-.14c-2.49-1.77-3.07-5.17-2.35-7.61.38-1.31,1.48-3.53,4.52-3.69.76-.04,1.6.26,2.2.8.25.22.67.68.7,1.27l.02.17-.02.16s-.02.08-.04.13c-1.69.02-3.14,1.31-3.32,3.04-.19,1.86,1.16,3.53,3.02,3.72,1.62.17,3.24-.34,4.55-1.42,1.43-1.19,2.37-2.99,2.54-4.85.05-.4.05-.8.02-1.19V3.39c0-1.87-1.52-3.39-3.39-3.39s-3.39,1.52-3.39,3.39v50.31c-4.17-.64-8.43,0-12.36,1.95-11.47,6.01-16.17,17.57-11.97,29.46,3.32,9.4,12.58,17.73,24.67,17.72,1.75,0,3.55-.17,5.41-.54,14.68-2.52,23.38-13.06,23.28-28.16V3.39c0-1.87-1.52-3.39-3.39-3.39Z"/>
    </svg>`,
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 102.82 150.84" class="svg-icon" data-icon-type="double-hook-2">
      <path d="M102.82,65.82v33.62c0,1.87-1.52,3.39-3.39,3.39s-3.39-1.52-3.39-3.39v-33.62c0-6.08-4.94-11.02-11.02-11.02s-11.02,4.94-11.02,11.02v19.21c0,4.52-3.67,8.19-8.19,8.19s-8.19-3.67-8.19-8.19V3.39c0-1.87,1.52-3.39,3.39-3.39s3.39,1.52,3.39,3.39v81.64c0,.78.63,1.41,1.41,1.41s1.41-.63,1.41-1.41v-19.21c0-9.81,7.98-17.79,17.8-17.79s17.79,7.98,17.79,17.79ZM85.03,57.63c-4.52,0-8.19,3.67-8.19,8.19v19.21c0,6.08-4.94,11.02-11.02,11.02s-11.02-4.94-11.02-11.02V3.39c0-1.87-1.52-3.39-3.39-3.39s-3.39,1.52-3.39,3.39v81.64c0,9.81,7.98,17.8,17.8,17.8s17.79-7.98,17.79-17.8v-19.21c0-.78.63-1.41,1.41-1.41s1.41.63,1.41,1.41v33.62c0,1.87,1.52,3.39,3.39,3.39s3.39-1.52,3.39-3.39v-33.62c0-4.52-3.67-8.19-8.19-8.19Z"/>
    </svg>`
  ]
];


// Function to get a random SVG from a row
function getRandomSvg(row, usedIndices) {
    let availableIndices = Array.from(Array(matrix_svg[row].length).keys()).filter(i => !usedIndices.includes(i));
    if (availableIndices.length === 0) {
        usedIndices.length = 0; // Reset if all have been used
        availableIndices = Array.from(Array(matrix_svg[row].length).keys());
    }
    const randomIndex = availableIndices[Math.floor(Math.random() * availableIndices.length)];
    usedIndices.push(randomIndex);
    return matrix_svg[row][randomIndex];
}

// Function to create a container with 4 unique random SVGs
function createContainer(usedIndices) {
    const container = document.createElement('div');
    container.className = 'matrix-container';
    
    const innerWrapper = document.createElement('div');
    innerWrapper.className = 'matrix-inner-wrapper';
    
    for (let i = 0; i < 4; i++) {
        if (!usedIndices[i]) usedIndices[i] = [];
        const svg = getRandomSvg(i, usedIndices[i]);
        innerWrapper.innerHTML += svg;
    }
    
    container.appendChild(innerWrapper);
    return container;
}

// Function to place 9 containers on page load
function placeSvgContainers() {
    const mainContainer = document.getElementById('matrice') || document.body;
    mainContainer.innerHTML = ''; // Clear existing content
    
    const usedIndices = [[], [], [], []];
    
    for (let i = 0; i < 9; i++) {
        const container = createContainer(usedIndices);
        mainContainer.appendChild(container);
    }

    // Apply rough filter after containers are created
    applyRoughFilter();
}

// Call the function on page load
window.addEventListener('load', placeSvgContainers);

// Reload on page click
document.addEventListener('click', placeSvgContainers);

// Function to apply a rough filter to SVGs
function applyRoughFilter() {
    const svgs = document.querySelectorAll('#matrice svg');
    svgs.forEach(svg => {
        // Create a filter element
        const filter = document.createElementNS('http://www.w3.org/2000/svg', 'filter');
        filter.setAttribute('id', 'rough-filter');

        // Add turbulence
        const turbulence = document.createElementNS('http://www.w3.org/2000/svg', 'feTurbulence');
        turbulence.setAttribute('type', 'turbulence');
        turbulence.setAttribute('baseFrequency', '0.03');
        turbulence.setAttribute('numOctaves', '2');
        turbulence.setAttribute('result', 'turbulence');

        // Add displacement map
        const displacementMap = document.createElementNS('http://www.w3.org/2000/svg', 'feDisplacementMap');
        displacementMap.setAttribute('in', 'SourceGraphic');
        displacementMap.setAttribute('in2', 'turbulence');
        displacementMap.setAttribute('scale', '1');
        displacementMap.setAttribute('xChannelSelector', 'R');
        displacementMap.setAttribute('yChannelSelector', 'G');

        // Append filter elements
        filter.appendChild(turbulence);
        filter.appendChild(displacementMap);

        // Add the filter to the SVG
        svg.appendChild(filter);

        // Apply the filter to all paths in the SVG
        const paths = svg.querySelectorAll('path');
        paths.forEach(path => {
            path.setAttribute('filter', 'url(#rough-filter)');
        });
    });
}



// Parametri //

var xRadius = 5; // Horizontal radius of the ellipse
var yRadius = 0;  // Vertical radius of the ellipse


function setAnim() {
  var anim = bodymovin.loadAnimation({
      container: document.getElementById("parametri"),
      renderer: 'svg',
      loop: true,
      path: '/assets/parametri.json',
      autoplay: true,
  });
  anim.addEventListener('DOMLoaded', function() {
    let pupil = document.getElementById("Eye");

    window.addEventListener("mousemove", (e) => {
    
        // get x and y postion of cursor
        var rect = pupil.getBoundingClientRect();
        var maxX = 50; // Maximum positive and negative change for x
        var maxY = 70; // Maximum positive and negative change for y

        var x = Math.min(960 + Math.max(-maxX, Math.min(maxX, e.clientX - rect.left)), 1010); // Limit x to a maximum of 1010
        var y = Math.min(540 + Math.max(-maxY, Math.min(maxY, e.clientY - rect.top)), 790);   // Limit y to a maximum of 590

        pupil.setAttribute("transform", "matrix(6.622580051422119,0,0,6.622580051422119," + x + "," + y + ")");
    });

  });


  return anim;

}
var slide = window.location.hash?window.location.hash.replace(/^\D+/g, ''):1
console.log(slide)

function jump(id){

if(id == "nxt") {

      if(slide == 29){
        slide = 1
      } else {
        slide++
      }
      location.hash = "#slide" + slide
  } else{
    if(slide == 1){
      slide = 29
    } else {
      slide--
    }
    location.hash = "#slide" + slide  
  }

}

window.addEventListener('wheel', (event) => {
    event.preventDefault(); // Prevent the default scroll behavior
}, { passive: false }); // Set passive to false to allow preventDefault

window.addEventListener('wheel', (event) => {
    if (event.deltaY < 0) {
        // Scroll up, trigger the previous button
        jump('prev');
    } else {
        // Scroll down, trigger the next button
        jump('nxt');
    }
});




function jumpf(h){
  location.hash = "#slide"+h;                 //Go to the target element.
  slide++
  console.log("AAAAAAAA")
}

//Load//
window.onload = () => {
  setAnim();
  generateLogo();
 var  slide=1

  // Append a new logo on each click
  document.getElementById("slide23").addEventListener('click', generateLogo);



};

