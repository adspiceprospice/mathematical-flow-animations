# Mathematical Flow Animations

An interactive visualization of mathematical particle systems featuring dynamic patterns, mouse interaction, and responsive design. This project showcases three distinct animation patterns that create mesmerizing visual effects through mathematical equations and particle systems.

## Features

### Patterns
- **Flow Wave**: A flowing wave pattern with dynamic particle movement based on trigonometric functions
- **Vortex Field**: Complex vortex interactions creating emergent patterns through field equations
- **Quantum Field**: Wave interference patterns inspired by quantum mechanics, creating fluid-like movements

### Interactive Controls
- Pattern selection between three different mathematical systems
- Color gradient toggle with adjustable transition speed
- Animation speed control (1% to 200% of base speed)
- Mouse attraction that influences particle movement
- Zoom functionality using mouse wheel (10% to 1000%)

### Technical Features
- Fully responsive canvas that fills the available window space
- Dynamic particle density that scales with screen size
- Optimized rendering with proper scaling and transformations
- Smooth transitions and interactions
- Mobile-friendly interface with adaptable controls

## Usage

1. Open `index.html` in a modern web browser
2. Use the bottom control panel to:
   - Switch between different patterns
   - Toggle color gradients on/off
   - Adjust color transition speed
   - Control animation speed
3. Interact with the animation:
   - Move your mouse over the canvas to attract particles
   - Use mouse wheel to zoom in/out
   - Resize window to see responsive behavior

## Technical Details

The animations are built using vanilla JavaScript and HTML5 Canvas. Each pattern uses different mathematical principles:

- Flow Wave: Combines multiple trigonometric functions with distance-based modulation
- Vortex Field: Uses polar coordinates and vortex equations with non-linear interactions
- Quantum Field: Implements wave interference patterns with phase shifts

The particle system features:
- Dynamic particle count based on screen size
- Grid-based particle distribution
- Efficient rendering with proper scaling
- Mouse interaction through force fields

## Potential Future Developments

1. New Patterns
   - Cellular Automata patterns
   - Fluid dynamics simulation
   - Strange attractor systems
   - Particle life simulations

2. Enhanced Interactivity
   - Touch gesture support for mobile
   - Multiple attraction points
   - Customizable force fields
   - Pattern parameter adjustment sliders

3. Visual Improvements
   - Particle trails with adjustable length
   - Multiple color schemes
   - Particle size variation
   - Blur and glow effects

4. Technical Enhancements
   - WebGL rendering for better performance
   - Pattern blending/morphing
   - Save/share configuration
   - Record/export animations

5. Audio Integration
   - Sound reactive patterns
   - Audio visualization modes
   - Interactive sound generation

## Performance Notes

The animation automatically adjusts particle density based on screen size to maintain smooth performance. On larger screens or high-DPI displays, you may see increased particle counts for better visual quality.

## Browser Compatibility

Tested and working on:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Installation

No installation required. Simply clone the repository and open `index.html` in a web browser:

```bash
git clone https://github.com/yourusername/mathematical-flow-animations.git
cd mathematical-flow-animations
