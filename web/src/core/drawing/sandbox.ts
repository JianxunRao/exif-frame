import Photo from '../photo';

const MAX_SIZE = 4096; // Mobile Safari has a maximum canvas size of 4096x4096

interface SandboxOptions {
  backgroundColor: string;
  padding: { top: number; bottom: number; left: number; right: number };
  targetRatio: string;
}

const sandbox = (photo: Photo, options: SandboxOptions): HTMLCanvasElement => {
  const { image } = photo;
  const { backgroundColor, padding, targetRatio } = options;
  const { top, bottom, left, right } = padding;

  const canvas = document.createElement('canvas');

  if (targetRatio === 'free' || !targetRatio) {
    let imageWidth = null;
    let imageHeight = null;

    if (image.width > image.height) {
      imageWidth = MAX_SIZE - left - right;
      imageHeight = (image.height / image.width) * imageWidth;
    } else {
      imageHeight = MAX_SIZE - top - bottom;
      imageWidth = (image.width / image.height) * imageHeight;
    }

    canvas.width = imageWidth + left + right;
    canvas.height = imageHeight + top + bottom;

    const context = canvas.getContext('2d')!;
    context.fillStyle = backgroundColor;
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.drawImage(image, left, top, imageWidth, imageHeight);
  } else {
    const ratio = targetRatio.split(':').map((value) => Number(value));

    if (ratio.length !== 2) {
      throw new Error('Invalid target ratio');
    }

    if (ratio[0] <= 0 || ratio[1] <= 0) {
      throw new Error('Invalid target ratio');
    }

    if (ratio[0] > ratio[1]) {
      canvas.width = MAX_SIZE;
      canvas.height = (ratio[1] / ratio[0]) * MAX_SIZE;
    } else {
      canvas.width = (ratio[0] / ratio[1]) * MAX_SIZE;
      canvas.height = MAX_SIZE;
    }

    const context = canvas.getContext('2d')!;
    context.fillStyle = backgroundColor;
    context.fillRect(0, 0, canvas.width, canvas.height);

    if (image.width > image.height) {
      const imageHeight = canvas.height - top - bottom;
      const imageWidth = (image.width / image.height) * imageHeight;
      context.drawImage(image, 0, 0, image.width, image.height, (MAX_SIZE - imageWidth) / 2, top, imageWidth, imageHeight);
      context.fillRect(0, 0, left, canvas.height);
      context.fillRect(canvas.width - right, 0, right, canvas.height);
    }

    if (image.width < image.height) {
      const imageWidth = canvas.width - left - right;
      const imageHeight = (image.height / image.width) * imageWidth;
      context.drawImage(image, 0, 0, image.width, image.height, left, (MAX_SIZE - imageHeight) / 2, imageWidth, imageHeight);
      context.fillRect(0, 0, canvas.width, top);
      context.fillRect(0, canvas.height - bottom, canvas.width, bottom);
    }
  }

  return canvas;
};

export default sandbox;
