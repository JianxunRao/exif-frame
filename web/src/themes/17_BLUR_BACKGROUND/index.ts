import Photo from '../../core/photo';
import {Store} from '../../store';
import sandbox from '../../core/drawing/sandbox';
import {ThemeFunc} from '../../core/drawing/theme';
import {ThemeOption, ThemeOptionInput} from '../../pages/theme/types/theme-option';
import Font from '../../fonts';

const BLUR_BACKGROUND_OPTIONS: ThemeOption[] = [

    { id: 'TEXT_COLOR', type: 'color', default: '#ffffff', description: '#ffffff is white, #000000 is black'},
    { id: 'TEXT_ALIGN', type: 'select', options: ['center', 'right', 'left'], default: 'center', description: 'left or center or right'},
    { id: 'FONT_STYLE', type: 'select', options: ['normal', 'italic'], default: 'normal', description: 'normal or italic'},
    { id: 'FONT_WEIGHT', type: 'range-slider', min: 100, max: 900, step: 100, default: 300, description: '100 - 900'},
    { id: 'FONT_SIZE', type: 'number', default: 80, description: 'px'},
    { id: 'FONT_FAMILY', type: 'select', options: ['Barlow', ...Object.values(Font)], default: 'Barlow', description: 'ex. din-alternate-bold, digital-7, Barlow, Arial, sans-serif'},
    { id: 'TOP_LABEL', type: 'string', default: '', description: 'ex. @username'},
    { id: 'DIVIDER', type: 'string', default: '|', description: 'ex. ∙'},
];

const BLUR_BACKGROUND_FUNC: ThemeFunc = (photo: Photo, input: ThemeOptionInput, store: Store) => {

    const TEXT_COLOR = input.get('TEXT_COLOR') as string;
    const TEXT_ALIGN = (input.get('TEXT_ALIGN') as string).trim() as CanvasTextAlign;
    const FONT_STYLE = (input.get('FONT_STYLE') as string).trim();
    const FONT_WEIGHT = input.get('FONT_WEIGHT') as number;
    const FONT_SIZE = input.get('FONT_SIZE') as number;
    const FONT_FAMILY = (input.get('FONT_FAMILY') as string).trim();
    const TOP_LABEL = (input.get('TOP_LABEL') as string).trim();
    const DIVIDER = (input.get('DIVIDER') as string).trim();

    const canvas = sandbox(photo, {
        targetRatio: store.ratio,
        notCroppedMode: store.notCroppedMode,
        backgroundColor: "#ffffff",
        padding: {top: 0, right: 0, bottom: 0, left: 0},
    });
    const context = canvas.getContext('2d')!;

    // 创建一个用于模糊背景的 Canvas
    const blurredCanvas = document.createElement('canvas');
    blurredCanvas.width = canvas.width;
    blurredCanvas.height = canvas.height;
    const blurredContext = blurredCanvas.getContext('2d')!;

    // 绘制模糊背景
    blurredContext.filter = 'blur(100px)';
    // 设置一定的偏移量，让模糊背景适当放大，避免图片边缘没有完全虚化的部分显示出来
    let dx = -0.05 * blurredCanvas.width
    let dy = -0.05 * blurredCanvas.height
    blurredContext.drawImage(photo.image, dx, dy, blurredCanvas.width - 2 * dx, blurredCanvas.height - 2 * dy);

    // 在主 Canvas 上绘制模糊背景
    context.drawImage(blurredCanvas, 0, 0);

    // 设置文本样式
    context.fillStyle = TEXT_COLOR;
    context.textBaseline = 'middle';
    context.font = `${FONT_STYLE} ${FONT_WEIGHT} ${FONT_SIZE}px ${FONT_FAMILY}`;
    context.textAlign = 'center';

    // 绘制顶部标签
    context.fillText(TOP_LABEL, canvas.width / 2, FONT_SIZE * 1.5);

    // 绘制底部相机和镜头信息
    context.textAlign = TEXT_ALIGN as CanvasTextAlign;
    context.fillText(
        [photo.make, photo.model, photo.lensModel]
            .filter(Boolean)
            .map((value) => value!.trim())
            .join(` ${DIVIDER} `),
        TEXT_ALIGN === 'left' ? 0 : TEXT_ALIGN === 'center' ? canvas.width / 2 : canvas.width - FONT_SIZE,
        canvas.height - FONT_SIZE * 2.5
    );

    // 绘制底部曝光信息
    if (!store.disableExposureMeter) {
        context.fillText(
            [`${photo.iso}`, `${photo.focalLength}`, `${photo.fNumber}`, `${photo.exposureTime}`].filter(Boolean).join(` ${DIVIDER} `),
            TEXT_ALIGN === 'left' ? 0 : TEXT_ALIGN === 'center' ? canvas.width / 2 : canvas.width - FONT_SIZE,
            canvas.height - FONT_SIZE * 1.5
        );
    }

    // 设置主体照片的属性
    const photoScale = 0.8; // 原照片缩小比例
    const photoWidth = canvas.width * photoScale;
    const photoHeight = canvas.height * photoScale;
    const photoX = (canvas.width - photoWidth) / 2;
    const photoY = (canvas.height - photoHeight) / 2 - photoHeight * 0.025; // 居中偏靠上
    const cornerRadius = 80; // 圆角半径

    // 绘制阴影效果
    context.save();
    context.shadowColor = "rgba(0, 0, 0, 0.5)";
    context.shadowBlur = 30;
    context.shadowOffsetX = 50;
    context.shadowOffsetY = 50;

    // 绘制一个圆角矩形路径来生成阴影
    context.beginPath();
    context.moveTo(photoX + cornerRadius, photoY);
    context.lineTo(photoX + photoWidth - cornerRadius, photoY);
    context.quadraticCurveTo(photoX + photoWidth, photoY, photoX + photoWidth, photoY + cornerRadius);
    context.lineTo(photoX + photoWidth, photoY + photoHeight - cornerRadius);
    context.quadraticCurveTo(photoX + photoWidth, photoY + photoHeight, photoX + photoWidth - cornerRadius, photoY + photoHeight);
    context.lineTo(photoX + cornerRadius, photoY + photoHeight);
    context.quadraticCurveTo(photoX, photoY + photoHeight, photoX, photoY + photoHeight - cornerRadius);
    context.lineTo(photoX, photoY + cornerRadius);
    context.quadraticCurveTo(photoX, photoY, photoX + cornerRadius, photoY);
    context.closePath();

// 填充圆角矩形路径，仅用于生成阴影
    context.fill();
    context.restore();

// 重新设置裁剪区域并绘制图片
    context.save();
    context.beginPath();
    context.moveTo(photoX + cornerRadius, photoY);
    context.lineTo(photoX + photoWidth - cornerRadius, photoY);
    context.quadraticCurveTo(photoX + photoWidth, photoY, photoX + photoWidth, photoY + cornerRadius);
    context.lineTo(photoX + photoWidth, photoY + photoHeight - cornerRadius);
    context.quadraticCurveTo(photoX + photoWidth, photoY + photoHeight, photoX + photoWidth - cornerRadius, photoY + photoHeight);
    context.lineTo(photoX + cornerRadius, photoY + photoHeight);
    context.quadraticCurveTo(photoX, photoY + photoHeight, photoX, photoY + photoHeight - cornerRadius);
    context.lineTo(photoX, photoY + cornerRadius);
    context.quadraticCurveTo(photoX, photoY, photoX + cornerRadius, photoY);
    context.closePath();
    context.clip();

// 绘制照片
    context.drawImage(photo.image, photoX, photoY, photoWidth, photoHeight);
    context.restore();

    // 重置阴影设置（避免对后续文本产生影响）
    context.shadowColor = "transparent";
    context.shadowBlur = 0;
    context.shadowOffsetX = 0;
    context.shadowOffsetY = 0;

    return canvas;
};

export {BLUR_BACKGROUND_FUNC, BLUR_BACKGROUND_OPTIONS};
