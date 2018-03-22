(function() {

  const generateBadge = function() {
    const COLORS        = ['green', 'pink', 'red', 'violet', 'yellow'];
    const BAD_COLORS    = {
      red: ['pink'],
      pink: ['red'],
    };
    const SCEWS         = ['none', 'plus', 'minus'];
    const POSITIONS     = ['0%', '25%', '50%', '75%'];
    const RECT_SIZES    = ['50%', '75%', '100%'];
    const PATTERN_SIZES = ['25%', '50%'];
    const PATTERNS      = ['bracket', 'plus', 'slash', 'tag'];
    const ZOOMS         = ['small', 'medium', 'large'];

    const getRandomValue = function (values) {
      const x = Math.ceil(Math.random() * 100);
      for (let i = 0; i < values.length; i++) {
        if (x <= (i + 1) * 100 / values.length) {
            return values[i];
        }
      }
      return null;
    };

    const generateSize = function (sizes) {
      let size = {
        top: getRandomValue(POSITIONS),
        left: getRandomValue(POSITIONS),
        width: getRandomValue(sizes),
        height: getRandomValue(sizes)
      };
      return size;
    };

    const badge = {
      block: {},
      geometric: {
        size: generateSize(RECT_SIZES),
        scew: getRandomValue(SCEWS)
      },
      pattern: {
        size: generateSize(PATTERN_SIZES),
        type: getRandomValue(PATTERNS),
        zoom: getRandomValue(ZOOMS)
      }
    };
    const colors = {};
    for (let key in badge) {
      let color;
      do {
        color = getRandomValue(COLORS);
      } while (colors[color]);
      colors[color] = true;
      if (BAD_COLORS[color]) {
        BAD_COLORS[color].forEach(function(iColor) {
          colors[iColor] = true;
        })
      }
      badge[key].color = color;
    }
    return badge;
  };

  const drawBadge = function (params) {
    const block = document.createElement('div');
    block.classList.add('random');
    block.classList.add('random__' + params.block.color);

    const geometric = document.createElement('div');
    geometric.classList.add('random__rect');
    geometric.classList.add('random__' + params.geometric.color);
    if (params.geometric.scew !== 'none') {
      geometric.classList.add('random__skew-' + params.geometric.scew);
    }
    for (var key in params.geometric.size) {
      geometric.style[key] = params.geometric.size[key];
    }
    block.appendChild(geometric);

    const pattern = document.createElement('div');
    pattern.classList.add('random__shape');
    pattern.classList.add('random__' + params.pattern.type + '-' + params.pattern.color);
    pattern.classList.add('random__pattern-' + params.pattern.zoom);
    for (var key in params.pattern.size) {
      pattern.style[key] = params.pattern.size[key];
    }
    block.appendChild(pattern);

    document.body.appendChild(block);
  };

  for (let i = 0; i < 30; i++) {
    drawBadge(generateBadge());
  }
})();
