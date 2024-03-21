// Admin settings
const primaryColor = '#6D6E71';
const accentColor = '#004C82';
const font = 'Geom Graphic, sans-serif';

// Event listeners
window.addEventListener('load', hidePreviewUntilFontLoaded);
generateButton.addEventListener('click', generateNameTape);
saveButton.addEventListener('click', savePNG);

// Hide the preview area until the font is loaded
function hidePreviewUntilFontLoaded() {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  ctx.font = '36px "Geom Graphic"';

  const checkFontLoaded = () => {
    if (ctx.measureText('A').width > 0) {
      previewArea.style.visibility = 'visible';
    } else {
      setTimeout(checkFontLoaded, 100);
    }
  };

  previewArea.style.visibility = 'hidden';
  checkFontLoaded();
}

// Generate the name tape
function generateNameTape() {
  const text = userInput.value;
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = 400;
  canvas.height = 100;
  ctx.font = `36px "Geom Graphic"`;
  ctx.textBaseline = 'middle';
  ctx.textAlign = 'center';

  const accentIndices = getAccentIndices(text);

  for (let i = 0; i < text.length; i++) {
    const characterWidth = ctx.measureText(text[i]).width;
    const xPosition = (canvas.width - ctx.measureText(text).width) / 2 + characterWidth / 2;

    ctx.fillStyle = accentIndices.includes(i) ? accentColor : primaryColor;
    ctx.fillText(text[i], xPosition, canvas.height / 2);
    ctx.translate(characterWidth, 0);
  }

  previewArea.innerHTML = '';
  previewArea.appendChild(canvas);
}

// Get accent color indices based on the color application rules
function getAccentIndices(text) {
  const indices = [0];
  const numbers = text.match(/\d/g);

  if (numbers) {
    indices.push(text.indexOf(numbers[0]));
  } else {
    let secondIndex;
    do {
      secondIndex = Math.floor(Math.random() * text.length);
    } while (secondIndex === 0 || secondIndex === indices[0]);
    indices.push(secondIndex);
  }

  return indices;
}

// Save the generated PNG image
function savePNG() {
  const canvas = previewArea.querySelector('canvas');
  const dataURL = canvas.toDataURL('image/png');
  const link = document.createElement('a');
  link.href = dataURL;
  link.download = 'generated-image.png';
  link.click();
}