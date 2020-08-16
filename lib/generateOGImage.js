import hexToRgba from 'hex-to-rgba';
import { changeColorBrightness } from '../styles/colors';

function getWrapTextHeight(context, text, x, y, maxWidth, lineHeight) {
  const initialY = y;
  let words = text.split(' ').reverse();
  let line = '';

  for (let n = 0; n < words.length; n++) {
    let testLine = words[n] + ' ' + line;
    let metrics = context.measureText(testLine);
    let testWidth = metrics.width;
    if (testWidth > maxWidth && n > 0) {
      line = words[n] + ' ';
      y -= lineHeight;
    } else {
      line = testLine;
    }
  }

  y -= lineHeight;
  return initialY - y;
}

function wrapText(context, text, x, y, maxWidth, lineHeight) {
  let words = text.split(' ').reverse();
  let line = '';

  for (let n = 0; n < words.length; n++) {
    let testLine = words[n] + ' ' + line;
    let metrics = context.measureText(testLine);
    let testWidth = metrics.width;
    if (testWidth > maxWidth && n > 0) {
      context.fillText(line, x, y);
      line = words[n] + ' ';
      y -= lineHeight;
    } else {
      line = testLine;
    }
  }
  context.fillText(line.trim(), x, y);
}

export default function generateOgImage(
  title,
  background,
  color,
  portrait = '/portrait.jpg'
) {
  const [width, height] = [1200, 630];
  const portraitSize = 300;
  const portraitBorderSize = 320;
  const padding = 50;
  const borderSize = 24;
  const borderRadius = 20;

  const img = new Image();
  img.setAttribute('crossorigin', 'anonymous');

  img.onload = () => {
    const a = document.createElement('a');

    a.download =
      title.replace(/\s+/, '-').replace(/[^A-Za-z0-9-]+/g, '') + '.jpg';
    a.style.display = 'block';
    a.style.position = 'fixed';
    a.style.width = width + 'px';
    a.style.height = height + 'px';
    a.style.left = '50%';
    a.style.right = 0;
    a.style.top = '50%';
    a.style.bottom = 0;
    a.style.zIndex = 10000;
    a.style.transform = 'translate(-50%, -50%)';

    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;

    a.appendChild(canvas);
    document.body.appendChild(a);

    const context = canvas.getContext('2d');

    const scale = Math.max(
      canvas.width / img.width,
      canvas.height / img.height
    );

    // Draw the border gradient
    const borderGradient = context.createLinearGradient(
      0,
      0,
      canvas.width,
      canvas.height
    );
    borderGradient.addColorStop(0, changeColorBrightness(color, -30));
    borderGradient.addColorStop(0.5, color);
    borderGradient.addColorStop(1, changeColorBrightness(color, 15));
    context.fillStyle = borderGradient;
    context.fillRect(0, 0, canvas.width, canvas.height);

    // Clip inside the gradient
    context.save();

    const [tlX, tlY, trX, trY, blX, blY, brX, brY] = [
      // top left
      borderSize,
      borderSize,
      // top right
      canvas.width - borderSize,
      borderSize,
      // bottom left
      borderSize,
      canvas.height - borderSize,
      // bottom right
      canvas.width - borderSize,
      canvas.height - borderSize,
    ];

    context.beginPath();
    context.moveTo(tlX + borderRadius, tlY);
    context.lineTo(trX - borderRadius, trY);
    context.quadraticCurveTo(trX, trY, trX, trY + borderRadius);
    context.lineTo(brX, brY - borderRadius);
    context.quadraticCurveTo(brX, brY, brX - borderRadius, brY);
    context.lineTo(blX + borderRadius, blY);
    context.quadraticCurveTo(blX, blY, blX, blY - borderRadius);
    context.lineTo(tlX, tlY + borderRadius);
    context.quadraticCurveTo(tlX, tlY, tlX + borderRadius, tlY);
    context.closePath();
    context.clip();

    // Draw the background image
    const x = canvas.width / 2 - (img.width / 2) * scale;
    const y = canvas.height / 2 - (img.height / 2) * scale;
    context.drawImage(img, x, y, img.width * scale, img.height * scale);

    const colorGradient = context.createLinearGradient(
      canvas.width / 2,
      0,
      canvas.width / 2,
      canvas.height
    );
    colorGradient.addColorStop(0, hexToRgba(color, 0.15));
    colorGradient.addColorStop(1, hexToRgba(color, 0.45));

    context.fillStyle = colorGradient;
    context.fillRect(0, 0, canvas.width, canvas.height);

    const overlayGradient = context.createLinearGradient(
      canvas.width / 2,
      0,
      canvas.width / 2,
      canvas.height
    );
    overlayGradient.addColorStop(0, 'transparent');
    overlayGradient.addColorStop(1, '#000');

    context.fillStyle = overlayGradient;
    context.fillRect(0, 0, canvas.width, canvas.height);

    let textSize = 90;
    const textPadding = borderSize + padding;
    const maxWidth = canvas.width - portraitSize - textPadding * 2;

    context.font = textSize + 'px bold Roboto, sans-serif';
    context.fillStyle = 'white';

    while (
      textSize > 30 &&
      getWrapTextHeight(
        context,
        title,
        textPadding,
        canvas.height - borderSize - textSize,
        maxWidth,
        textSize
      ) >
        canvas.height - textPadding * 2 - textSize
    ) {
      textSize -= 1;
      context.font = textSize + 'px bold Roboto, sans-serif';
    }

    try {
      textSize =
        parseInt(
          new URLSearchParams(window.location.search).get('textSize'),
          10
        ) || textSize;

      context.font = textSize + 'px bold Roboto, sans-serif';
    } catch (e) {
      // do nothing
    }

    wrapText(
      context,
      title,
      padding,
      canvas.height - textSize,
      maxWidth,
      textSize
    );

    if (portrait) {
      const portraitImg = new Image();
      portraitImg.setAttribute('crossorigin', 'anonymous');
      portraitImg.onload = () => {
        let [x2, y2] = [
          canvas.width - padding - portraitBorderSize / 2,
          canvas.height - padding - portraitBorderSize / 2,
        ];

        // Portrait Border
        context.save();
        context.beginPath();
        context.arc(x2, y2, portraitBorderSize / 2, 0, Math.PI * 2, true);
        context.closePath();
        context.clip();

        context.fillStyle = borderGradient;
        context.fillRect(
          x2 - portraitBorderSize / 2,
          y2 - portraitBorderSize / 2,
          portraitBorderSize,
          portraitBorderSize
        );

        context.beginPath();
        context.arc(
          x2 - portraitBorderSize,
          y2 - portraitBorderSize,
          portraitBorderSize,
          0,
          Math.PI * 2,
          true
        );
        context.clip();
        context.closePath();
        context.restore();

        // Portrait Image
        context.save();
        context.beginPath();
        context.arc(x2, y2, portraitSize / 2, 0, Math.PI * 2, true);
        context.closePath();
        context.clip();

        context.drawImage(
          portraitImg,
          x2 - portraitSize / 2,
          y2 - portraitSize / 2,
          portraitSize,
          portraitSize
        );

        context.beginPath();
        context.arc(
          x2 - portraitSize,
          y2 - portraitSize,
          portraitSize,
          0,
          Math.PI * 2,
          true
        );
        context.clip();
        context.closePath();
        context.restore();

        a.href = canvas.toDataURL('image/jpeg');
      };

      portraitImg.src = portrait;
    } else {
      a.href = canvas.toDataURL('image/jpeg');
    }
  };

  img.src = background;
}
