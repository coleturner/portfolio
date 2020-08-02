import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import { useRef } from 'react';

function drawWaves(canvas, $width, $height, colors, nodeCount = 6) {
  const ctx = canvas.getContext('2d');
  let waves = [];
  let waveHeight = canvas.height / 2;
  let isCancelled = false;

  const cancel = () => {
    isCancelled = true;
  };

  function update() {
    if (isCancelled) {
      return;
    }

    ctx.fillStyle = 'transparent';
    ctx.globalCompositeOperation = 'source-over';
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < waves.length; i++) {
      for (let j = 0; j < waves[i].nodes.length; j++) {
        bounce(waves[i].nodes[j]);
      }
      drawWave(waves[i]);
    }

    requestAnimationFrame(update);
  }

  function Wave(colour, lambda, nodes) {
    this.colour = colour;
    this.lambda = lambda;
    this.nodes = [];

    for (let i = 0; i <= nodes + 2; i++) {
      let temp = [
        ((i - 1) * canvas.width) / nodes,
        0,
        Math.random() * 200,
        0.3,
      ];
      this.nodes.push(temp);
    }
  }

  function bounce(nodeArr) {
    nodeArr[1] = Math.max(
      0,
      (waveHeight / 2) * Math.sin(nodeArr[2] / 20) +
        canvas.height / 2 -
        waveHeight / 2
    );
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

  function drawNodes(array) {
    for (let i = 0; i < array.length; i++) {
      ctx.beginPath();
      ctx.arc(array[i][0], array[i][1], 4, 0, 2 * Math.PI);
      ctx.closePath();
      ctx.stroke();
    }
  }

  function drawLine(array) {
    for (let i = 0; i < array.length; i++) {
      if (array[i + 1]) {
        ctx.lineTo(array[i + 1][0], array[i + 1][1]);
      }
    }

    ctx.stroke();
  }

  for (let i = 0; i < 3; i++) {
    waves.push(new Wave(colors[i], 1, nodeCount));
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
    height: 10vw;
    display: block;
  }
`;

export default function WavesComponent({ colors }) {
  const ref = useRef();

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      const cancel = drawWaves(ref.current, rect.width, rect.height, colors);

      return () => cancel();
    }

    return () => {
      if (ref.current) {
        ref.current
          .getContext('2d')
          .clearRect(0, 0, ref.current.width, ref.current.height);
      }
    };
  }, [ref.current, ...colors]);

  return (
    <WavesContainer>
      <canvas ref={ref} />
    </WavesContainer>
  );
}
