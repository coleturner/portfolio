import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import { useRef } from 'react';

function drawWaves(canvas, $width, $height, colors, nodeCount = 4) {
  const ctx = canvas.getContext('2d');
  let waves = [];
  let isCancelled = false;

  const cancel = () => {
    isCancelled = true;
  };

  let lastFrame = null;

  function update() {
    if (isCancelled) {
      return;
    }

    const nowFrame = performance.now();
    if (!lastFrame || nowFrame - lastFrame > 15) {
      ctx.fillStyle = 'transparent';
      ctx.globalCompositeOperation = 'source-over';
      canvas.width = $width;
      canvas.height = $height;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < waves.length; i++) {
        for (let j = 0; j < waves[i].nodes.length; j++) {
          bounce(waves[i].nodes[j], waves[i].waveHeight);
        }
        drawWave(waves[i]);
      }

      lastFrame = nowFrame;
    }

    requestAnimationFrame(update);
  }

  function Wave(colour, nodes, waveHeight) {
    this.colour = colour;
    this.nodes = [];
    this.waveHeight = waveHeight;

    for (let i = 0; i <= nodes + 2; i++) {
      let temp = [
        ((i - 1) * canvas.width) / nodes,
        Math.random() * waveHeight,
        Math.random() * waveHeight,
        0.3,
      ];
      this.nodes.push(temp);
    }
  }

  function bounce(nodeArr, waveHeight) {
    nodeArr[1] =
      canvas.height * 0.85 + (waveHeight / 2) * Math.sin(nodeArr[2] / 40);

    nodeArr[2] = nodeArr[2] + nodeArr[3];
  }

  function drawWave(obj) {
    function diff(a, b) {
      return (b - a) / 2 + a;
    }

    ctx.fillStyle = obj.colour;
    ctx.beginPath();
    ctx.moveTo(0, canvas.height);
    ctx.lineTo(obj.nodes[0][0], obj.nodes[0][1]);

    for (let i = 0; i < obj.nodes.length; i++) {
      if (obj.nodes[i + 1]) {
        ctx.quadraticCurveTo(
          obj.nodes[i][0],
          obj.nodes[i][1],
          diff(obj.nodes[i][0], obj.nodes[i + 1][0]),
          diff(obj.nodes[i][1], obj.nodes[i + 1][1])
        );
      } else {
        ctx.lineTo(obj.nodes[i][0], obj.nodes[i][1]);
        ctx.lineTo(canvas.width, canvas.height);
      }
    }
    ctx.closePath();
    ctx.fill();
  }

  const totalPossibleHeight = canvas.height * 0.75;

  for (let i = 0; i < colors.length; i++) {
    const percent = Math.min(
      0.9,
      Math.max(2, colors.length - i) / colors.length
    );

    const waveHeight = Math.round(
      Math.min(totalPossibleHeight, totalPossibleHeight * percent)
    );

    waves.push(new Wave(colors[i], nodeCount, waveHeight));
  }

  update();

  return cancel;
}

const WavesContainer = styled.div`
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: -1;
  pointer-events: none;

  canvas {
    width: 100%;
    height: 15vw;
    display: block;
  }
`;

export default function WavesComponent({ nodeCount, colors }) {
  const ref = useRef();

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      const cancel = drawWaves(
        ref.current,
        rect.width,
        rect.height,
        colors,
        nodeCount
      );

      return () => cancel();
    }

    return () => {
      if (ref.current) {
        ref.current
          .getContext('2d')
          .clearRect(0, 0, ref.current.width, ref.current.height);
      }
    };
  }, [ref.current, colors.join(',')]);

  return (
    <WavesContainer>
      <canvas ref={ref} />
    </WavesContainer>
  );
}
