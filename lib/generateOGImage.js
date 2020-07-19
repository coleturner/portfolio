import hexToRgba from 'hex-to-rgba';
import { changeColorBrightness } from '../styles/colors';

export default function generateOgImage(
  title,
  background,
  color,
  portrait = '/portrait.jpg'
) {
  const [width, height] = [1200, 630];
  const portraitSize = 80;
  const padding = 20;

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
    const borderClip = 6;
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

    const textSize = 38;
    context.font = textSize + 'px Roboto, sans-serif';

    const maxWidth = canvas.width - portraitSize - padding * 4;

    let shortTitle = title.split(/\s/);
    let popped = false;
    while (context.measureText(shortTitle.join(' ')).width > maxWidth) {
      shortTitle.pop();
      popped = true;
    }

    if (popped) {
      shortTitle = shortTitle.join(' ') + '...';
    } else {
      shortTitle = title;
    }

    context.fillStyle = color;
    context.fillText(
      shortTitle,
      padding * 2,
      canvas.height - padding - textSize,
      maxWidth
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
