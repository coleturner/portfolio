import hexToRgba from 'hex-to-rgba';
import { changeColorBrightness } from '../styles/colors';

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
  context.fillText(line, x, y);
}

export default function generateOgImage(
  title,
  background,
  color,
  portrait = '/portrait.jpg'
) {
  const [width, height] = [1200, 630];
  const portraitSize = 300;
  const padding = 50;

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
    const borderClip = 12;
    context.save();
    context.beginPath();
    context.rect(
      borderClip,
      borderClip,
      canvas.width - borderClip * 2,
      canvas.height - borderClip * 2
    );
    context.closePath();
    context.clip();

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

    try {
      textSize =
        parseInt(
          new URLSearchParams(window.location.search).get('textSize'),
          10
        ) || 110;
    } catch (e) {
      // do nothing
    }

    context.font = textSize + 'px bold Roboto, sans-serif';
    context.fillStyle = 'white';

    const maxWidth = canvas.width - portraitSize - padding * 2;
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
        const [x2, y2] = [
          canvas.width - padding - portraitSize / 2,
          canvas.height - padding - portraitSize / 2,
        ];

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
