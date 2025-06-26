import Photo from '../../core/photo';
import { Store } from '../../store';
import sandbox from '../../core/drawing/sandbox';
import { ThemeFunc } from '../../core/drawing/theme';
import { ThemeOption, ThemeOptionInput } from '../../pages/theme/types/theme-option';

const supportLogo = new Map<string, HTMLImageElement>();

const loadLogo = (pathname: string): HTMLImageElement => {
  const image = new Image();
  image.src = pathname;
  return image;
};

supportLogo.set('APPLE_LIGHT', loadLogo('/maker/light/apple.png'));
supportLogo.set('APPLE_DARK', loadLogo('/maker/dark/apple.png'));
supportLogo.set('CANON_LIGHT', loadLogo('/maker/light/canon.png'));
supportLogo.set('CANON_DARK', loadLogo('/maker/dark/canon.png'));
supportLogo.set('DJI_LIGHT', loadLogo('/maker/light/dji.png'));
supportLogo.set('DJI_DARK', loadLogo('/maker/dark/dji.png'));
supportLogo.set('FUJI_LIGHT', loadLogo('/maker/light/fujifilm.png'));
supportLogo.set('FUJI_DARK', loadLogo('/maker/dark/fujifilm.png'));
supportLogo.set('HASSELBLAD_LIGHT', loadLogo('/maker/light/hasselblad.png'));
supportLogo.set('HASSELBLAD_DARK', loadLogo('/maker/dark/hasselblad.png'));
supportLogo.set('LEICA_LIGHT', loadLogo('/maker/light/leica.png'));
supportLogo.set('LEICA_DARK', loadLogo('/maker/dark/leica.png'));
supportLogo.set('LG_LIGHT', loadLogo('/maker/light/lg.png'));
supportLogo.set('LG_DARK', loadLogo('/maker/dark/lg.png'));
supportLogo.set('MAMIYA_LIGHT', loadLogo('/maker/light/mamiya.png'));
supportLogo.set('MAMIYA_DARK', loadLogo('/maker/dark/mamiya.png'));
supportLogo.set('NIKON_LIGHT', loadLogo('/maker/light/nikon.png'));
supportLogo.set('NIKON_DARK', loadLogo('/maker/dark/nikon.png'));
supportLogo.set('OLYMPUS_LIGHT', loadLogo('/maker/light/olympus.png'));
supportLogo.set('OLYMPUS_DARK', loadLogo('/maker/dark/olympus.png'));
supportLogo.set('PANASONIC_LIGHT', loadLogo('/maker/light/lumix.png'));
supportLogo.set('PANASONIC_DARK', loadLogo('/maker/dark/lumix.png'));
supportLogo.set('PENTAX_LIGHT', loadLogo('/maker/light/pentax.png'));
supportLogo.set('PENTAX_DARK', loadLogo('/maker/dark/pentax.png'));
supportLogo.set('PHASEONE_LIGHT', loadLogo('/maker/light/phaseone.png'));
supportLogo.set('PHASEONE_DARK', loadLogo('/maker/dark/phaseone.png'));
supportLogo.set('RICOH_LIGHT', loadLogo('/maker/light/ricoh.png'));
supportLogo.set('RICOH_DARK', loadLogo('/maker/dark/ricoh.png'));
supportLogo.set('SAMSUNG_LIGHT', loadLogo('/maker/light/samsung.png'));
supportLogo.set('SAMSUNG_DARK', loadLogo('/maker/dark/samsung.png'));
supportLogo.set('SIGMA_LIGHT', loadLogo('/maker/light/sigma.png'));
supportLogo.set('SIGMA_DARK', loadLogo('/maker/dark/sigma.png'));
supportLogo.set('SONY_LIGHT', loadLogo('/maker/light/sony.png'));
supportLogo.set('SONY_DARK', loadLogo('/maker/dark/sony.png'));
supportLogo.set('BLACKMAGIC_LIGHT', loadLogo('/maker/light/blackmagic.png'));
supportLogo.set('BLACKMAGIC_DARK', loadLogo('/maker/dark/blackmagic.png'));
supportLogo.set('GOPRO_LIGHT', loadLogo('/maker/light/gopro.png'));
supportLogo.set('GOPRO_DARK', loadLogo('/maker/dark/gopro.png'));
supportLogo.set('HUAWEI_LIGHT', loadLogo('/maker/light/huawei.png'));
supportLogo.set('HUAWEI_DARK', loadLogo('/maker/dark/huawei.png'));
supportLogo.set('INSTA360_LIGHT', loadLogo('/maker/light/insta360.png'));
supportLogo.set('INSTA360_DARK', loadLogo('/maker/dark/insta360.png'));
supportLogo.set('KODAK_LIGHT', loadLogo('/maker/light/kodak.png'));
supportLogo.set('KODAK_DARK', loadLogo('/maker/dark/kodak.png'));
supportLogo.set('ONEPLUS_LIGHT', loadLogo('/maker/light/oneplus.png'));
supportLogo.set('ONEPLUS_DARK', loadLogo('/maker/dark/oneplus.png'));
supportLogo.set('POLAROID_LIGHT', loadLogo('/maker/light/polaroid.png'));
supportLogo.set('POLAROID_DARK', loadLogo('/maker/dark/polaroid.png'));
supportLogo.set('RED_LIGHT', loadLogo('/maker/light/red.png'));
supportLogo.set('RED_DARK', loadLogo('/maker/dark/red.png'));
supportLogo.set('ZEISS_LIGHT', loadLogo('/maker/light/zeiss.png'));
supportLogo.set('ZEISS_DARK', loadLogo('/maker/dark/zeiss.png'));
supportLogo.set('XIAOMI_LIGHT', loadLogo('/maker/light/xiaomi.png'));
supportLogo.set('XIAOMI_DARK', loadLogo('/maker/dark/xiaomi.png'));
supportLogo.set('VIVO_LIGHT', loadLogo('/maker/light/vivo.png'));
supportLogo.set('VIVO_DARK', loadLogo('/maker/dark/vivo.png'));
supportLogo.set('OPPO_LIGHT', loadLogo('/maker/light/oppo.png'));
supportLogo.set('OPPO_DARK', loadLogo('/maker/dark/oppo.png'));
supportLogo.set('HONOR_LIGHT', loadLogo('/maker/light/honor.png'));
supportLogo.set('HONOR_DARK', loadLogo('/maker/dark/honor.png'));
supportLogo.set('MOTOROLA_LIGHT', loadLogo('/maker/light/motorola.png'));
supportLogo.set('MOTOROLA_DARK', loadLogo('/maker/dark/motorola.png'));
supportLogo.set('NOKIA_LIGHT', loadLogo('/maker/light/nokia.png'));
supportLogo.set('NOKIA_DARK', loadLogo('/maker/dark/nokia.png'));
supportLogo.set('NUBIA_LIGHT', loadLogo('/maker/light/nubia.png'));
supportLogo.set('NUBIA_DARK', loadLogo('/maker/dark/nubia.png'));
supportLogo.set('OM_LIGHT', loadLogo('/maker/light/om.png'));
supportLogo.set('OM_DARK', loadLogo('/maker/dark/om.png'));
supportLogo.set('REALME_LIGHT', loadLogo('/maker/light/realme.png'));
supportLogo.set('REALME_DARK', loadLogo('/maker/dark/realme.png'));
supportLogo.set('GOOGLE_LIGHT', loadLogo('/maker/light/google.png'));
supportLogo.set('GOOGLE_DARK', loadLogo('/maker/dark/google.png'));
supportLogo.set('GOLDSTAR_LIGHT', loadLogo('/maker/light/goldstar.png'));
supportLogo.set('GOLDSTAR_DARK', loadLogo('/maker/dark/goldstar.png'));

const STRAP_OPTIONS: ThemeOption[] = [
  { id: 'ARTIST', type: 'string', default: '', description: 'your name' },
  { id: 'DARK_MODE', type: 'boolean', default: false, description: 'enable to use dark mode' },
  { id: 'SECONDARY_TEXT_FONT_WEIGHT', type: 'range-slider', min: 100, max: 900, step: 100, default: 300, description: '100 - 900' },
  { id: 'PADDING_TOP', type: 'number', default: 0, description: 'px' },
  { id: 'PADDING_BOTTOM', type: 'number', default: 0, description: 'px' },
  { id: 'PADDING_LEFT', type: 'number', default: 0, description: 'px' },
  { id: 'PADDING_RIGHT', type: 'number', default: 0, description: 'px' },
];

const STRAP_FUNC: ThemeFunc = (photo: Photo, input: ThemeOptionInput, store: Store) => {
  const ARTIST = (input.get('ARTIST') as string).trim();
  const DARK_MODE = input.get('DARK_MODE') as boolean;
  const SECONDARY_TEXT_FONT_WEIGHT = input.get('SECONDARY_TEXT_FONT_WEIGHT') as number;
  const PADDING_TOP = input.get('PADDING_TOP') as number;
  const PADDING_BOTTOM = (input.get('PADDING_BOTTOM') as number) + 300;
  const PADDING_LEFT = input.get('PADDING_LEFT') as number;
  const PADDING_RIGHT = input.get('PADDING_RIGHT') as number;
  const FONT_SIZE = 70;
  const BACKGROUND_COLOR = DARK_MODE ? '#000000' : '#ffffff';
  const PRIMARY_TEXT_COLOR = DARK_MODE ? '#ffffff' : '#000000';
  const SECONDARY_TEXT_COLOR = DARK_MODE ? '#888888' : '#333333';

  const canvas = sandbox(photo, {
    targetRatio: store.ratio,
    notCroppedMode: store.notCroppedMode,
    backgroundColor: BACKGROUND_COLOR,
    padding: { top: PADDING_TOP, right: PADDING_RIGHT, bottom: PADDING_BOTTOM, left: PADDING_LEFT },
  });
  const context = canvas.getContext('2d')!;
  context.textBaseline = 'middle';

  // LEFT FIRST
  context.textAlign = 'left';

  // ISO, Focal Length, F-Number, Exposure Time
  context.font = `normal 500 ${FONT_SIZE}px Barlow`;
  context.fillStyle = PRIMARY_TEXT_COLOR;

  if (!store.disableExposureMeter) {
    context.fillText(
      [`${photo.iso}`, `${photo.focalLength}`, `${photo.fNumber}`, `${photo.exposureTime}`]
        .filter(Boolean)
        .map((value) => value.trim())
        .join('  '),
      FONT_SIZE,
      canvas.height - PADDING_BOTTOM / 2 - FONT_SIZE / 2
    );
  }

  // Shot by
  if (ARTIST) {
    context.font = `normal ${SECONDARY_TEXT_FONT_WEIGHT} ${FONT_SIZE}px Barlow`;
    context.fillStyle = SECONDARY_TEXT_COLOR;
    context.fillText(`Shot by © ${ARTIST}`, FONT_SIZE, canvas.height - PADDING_BOTTOM / 2 + FONT_SIZE / 2);
  } else {
    context.font = `normal ${SECONDARY_TEXT_FONT_WEIGHT} ${FONT_SIZE}px Barlow`;
    context.fillStyle = SECONDARY_TEXT_COLOR;
    context.fillText(photo.takenAt, FONT_SIZE, canvas.height - PADDING_BOTTOM / 2 + FONT_SIZE / 2);
  }

  // RIGHT SECOND
  context.textAlign = 'right';

  // Maker, Model
  context.fillStyle = PRIMARY_TEXT_COLOR;
  context.font = `normal 500 ${FONT_SIZE}px Barlow`;
  const makerModelText = [photo.make, photo.model]
    .filter(Boolean)
    .map((value) => value!.trim())
    .join(' ');
  const topWidth = context.measureText(makerModelText).width;
  context.fillText(makerModelText, canvas.width - FONT_SIZE, canvas.height - PADDING_BOTTOM / 2 - FONT_SIZE / 2);

  // Lens Model
  context.fillStyle = SECONDARY_TEXT_COLOR;
  context.font = `normal ${SECONDARY_TEXT_FONT_WEIGHT} ${FONT_SIZE}px Barlow`;
  const lensModelText = [photo.lensModel]
    .filter(Boolean)
    .map((value) => value!.trim())
    .join(' ');
  const bottomWidth = context.measureText(lensModelText).width;
  context.fillText(lensModelText, canvas.width - FONT_SIZE, canvas.height - PADDING_BOTTOM / 2 + FONT_SIZE / 2);

  // DRAW LINE
  context.beginPath();
  context.moveTo(canvas.width - Math.max(topWidth, bottomWidth) - FONT_SIZE * 2, canvas.height - PADDING_BOTTOM / 2 - FONT_SIZE);
  context.lineTo(canvas.width - Math.max(topWidth, bottomWidth) - FONT_SIZE * 2, canvas.height - PADDING_BOTTOM / 2 + FONT_SIZE);
  context.strokeStyle = SECONDARY_TEXT_COLOR;
  context.lineWidth = 2;
  context.stroke();

  // DRAW ICON
  let TARGET_LOGO_HEIGHT = FONT_SIZE * 2;
  const TARGET_LOGO_WIDTH = 400;

  let logo: HTMLImageElement | undefined;

  if (photo.metadata.make?.toUpperCase().includes('APPLE') || photo.metadata.model?.toUpperCase().includes('APPLE')) {
    logo = DARK_MODE ? supportLogo.get('APPLE_DARK') : supportLogo.get('APPLE_LIGHT');
  }

  if (photo.metadata.make?.toUpperCase().includes('CANON') || photo.metadata.model?.toUpperCase().includes('CANON')) {
    logo = DARK_MODE ? supportLogo.get('CANON_DARK') : supportLogo.get('CANON_LIGHT');
  }

  if (photo.metadata.make?.toUpperCase().includes('DJI') || photo.metadata.model?.toUpperCase().includes('DJI')) {
    logo = DARK_MODE ? supportLogo.get('DJI_DARK') : supportLogo.get('DJI_LIGHT');
  }

  if (photo.metadata.make?.toUpperCase().includes('FUJI') || photo.metadata.model?.toUpperCase().includes('FUJI')) {
    logo = DARK_MODE ? supportLogo.get('FUJI_DARK') : supportLogo.get('FUJI_LIGHT');
  }

  if (photo.metadata.make?.toUpperCase().includes('HASSELBLAD') || photo.metadata.model?.toUpperCase().includes('HASSELBLAD')) {
    logo = DARK_MODE ? supportLogo.get('HASSELBLAD_DARK') : supportLogo.get('HASSELBLAD_LIGHT');
  }

  if (photo.metadata.make?.toUpperCase().includes('LEICA') || photo.metadata.model?.toUpperCase().includes('LEICA')) {
    logo = DARK_MODE ? supportLogo.get('LEICA_DARK') : supportLogo.get('LEICA_LIGHT');
  }

  if (photo.metadata.make?.toUpperCase().includes('LG') || photo.metadata.model?.toUpperCase().includes('LG')) {
    logo = DARK_MODE ? supportLogo.get('LG_DARK') : supportLogo.get('LG_LIGHT');
  }

  if (photo.metadata.make?.toUpperCase().includes('MAMIYA') || photo.metadata.model?.toUpperCase().includes('MAMIYA')) {
    logo = DARK_MODE ? supportLogo.get('MAMIYA_DARK') : supportLogo.get('MAMIYA_LIGHT');
  }

  if (photo.metadata.make?.toUpperCase().includes('NIKON') || photo.metadata.model?.toUpperCase().includes('NIKON')) {
    logo = DARK_MODE ? supportLogo.get('NIKON_DARK') : supportLogo.get('NIKON_LIGHT');
  }

  if (photo.metadata.make?.toUpperCase().includes('OLYMPUS') || photo.metadata.model?.toUpperCase().includes('OLYMPUS')) {
    logo = DARK_MODE ? supportLogo.get('OLYMPUS_DARK') : supportLogo.get('OLYMPUS_LIGHT');
  }

  if (photo.metadata.make?.toUpperCase().includes('PANASONIC') || photo.metadata.model?.toUpperCase().includes('PANASONIC')) {
    logo = DARK_MODE ? supportLogo.get('PANASONIC_DARK') : supportLogo.get('PANASONIC_LIGHT');
  }

  if (photo.metadata.make?.toUpperCase().includes('PHASE') || photo.metadata.model?.toUpperCase().includes('PHASE')) {
    logo = DARK_MODE ? supportLogo.get('PHASEONE_DARK') : supportLogo.get('PHASEONE_LIGHT');
  }

  if (photo.metadata.make?.toUpperCase().includes('RICO') || photo.metadata.model?.toUpperCase().includes('RICO')) {
    logo = DARK_MODE ? supportLogo.get('RICOH_DARK') : supportLogo.get('RICOH_LIGHT');
  }

  // 팬탁스는 리코의 자회사 같음..? RICO ~~~ PENTAX 이런 식으로 결과물이 나오는데, 이 경우 RICO 보다 PENTAX가 우선적으로 쓰여야 함
  if (photo.metadata.make?.toUpperCase().includes('PENTAX') || photo.metadata.model?.toUpperCase().includes('PENTAX')) {
    logo = DARK_MODE ? supportLogo.get('PENTAX_DARK') : supportLogo.get('PENTAX_LIGHT');
  }

  if (photo.metadata.make?.toUpperCase().includes('SIGMA') || photo.metadata.model?.toUpperCase().includes('SIGMA')) {
    logo = DARK_MODE ? supportLogo.get('SIGMA_DARK') : supportLogo.get('SIGMA_LIGHT');
  }

  if (photo.metadata.make?.toUpperCase().includes('SONY') || photo.metadata.model?.toUpperCase().includes('SONY')) {
    logo = DARK_MODE ? supportLogo.get('SONY_DARK') : supportLogo.get('SONY_LIGHT');
  }

  if (photo.metadata.make?.toUpperCase().includes('SAMSUNG') || photo.metadata.model?.toUpperCase().includes('SAMSUNG')) {
    logo = DARK_MODE ? supportLogo.get('SAMSUNG_DARK') : supportLogo.get('SAMSUNG_LIGHT');
  }

	if (photo.metadata.make?.toUpperCase().includes('OM') || photo.metadata.model?.toUpperCase().includes('OM')) {
		logo = DARK_MODE ? supportLogo.get('OM_DARK') : supportLogo.get('OM_LIGHT');
	}

	if (photo.metadata.make?.toUpperCase().includes('BLACKMAGIC') || photo.metadata.model?.toUpperCase().includes('BLACKMAGIC')) {
		logo = DARK_MODE ? supportLogo.get('BLACKMAGIC_DARK') : supportLogo.get('BLACKMAGIC_LIGHT');
	}

	if (photo.metadata.make?.toUpperCase().includes('GOPRO') || photo.metadata.model?.toUpperCase().includes('GOPRO')) {
		logo = DARK_MODE ? supportLogo.get('GOPRO_DARK') : supportLogo.get('GOPRO_LIGHT');
	}

	if (photo.metadata.make?.toUpperCase().includes('HUAWEI') || photo.metadata.model?.toUpperCase().includes('HUAWEI')) {
		logo = DARK_MODE ? supportLogo.get('HUAWEI_DARK') : supportLogo.get('HUAWEI_LIGHT');
	}

	if (photo.metadata.make?.toUpperCase().includes('INSTA360') || photo.metadata.model?.toUpperCase().includes('INSTA360')) {
		logo = DARK_MODE ? supportLogo.get('INSTA360_DARK') : supportLogo.get('INSTA360_LIGHT');
	}

	if (photo.metadata.make?.toUpperCase().includes('KODAK') || photo.metadata.model?.toUpperCase().includes('KODAK')) {
		logo = DARK_MODE ? supportLogo.get('KODAK_DARK') : supportLogo.get('KODAK_LIGHT');
	}

	if (photo.metadata.make?.toUpperCase().includes('ONEPLUS') || photo.metadata.model?.toUpperCase().includes('ONEPLUS')) {
		logo = DARK_MODE ? supportLogo.get('ONEPLUS_DARK') : supportLogo.get('ONEPLUS_LIGHT');
	}

	if (photo.metadata.make?.toUpperCase().includes('POLAROID') || photo.metadata.model?.toUpperCase().includes('POLAROID')) {
		logo = DARK_MODE ? supportLogo.get('POLAROID_DARK') : supportLogo.get('POLAROID_LIGHT');
	}

	if (photo.metadata.make?.toUpperCase().includes('RED') || photo.metadata.model?.toUpperCase().includes('RED')) {
		logo = DARK_MODE ? supportLogo.get('RED_DARK') : supportLogo.get('RED_LIGHT');
	}

	if (photo.metadata.make?.toUpperCase().includes('ZEISS') || photo.metadata.model?.toUpperCase().includes('ZEISS')) {
		logo = DARK_MODE ? supportLogo.get('ZEISS_DARK') : supportLogo.get('ZEISS_LIGHT');
	}

	if (photo.metadata.make?.toUpperCase().includes('XIAOMI') || photo.metadata.model?.toUpperCase().includes('XIAOMI')) {
		logo = DARK_MODE ? supportLogo.get('XIAOMI_DARK') : supportLogo.get('XIAOMI_LIGHT');
	}

	if (photo.metadata.make?.toUpperCase().includes('VIVO') || photo.metadata.model?.toUpperCase().includes('VIVO')) {
		logo = DARK_MODE ? supportLogo.get('VIVO_DARK') : supportLogo.get('VIVO_LIGHT');
	}

	if (photo.metadata.make?.toUpperCase().includes('OPPO') || photo.metadata.model?.toUpperCase().includes('OPPO')) {
		logo = DARK_MODE ? supportLogo.get('OPPO_DARK') : supportLogo.get('OPPO_LIGHT');
	}

	if (photo.metadata.make?.toUpperCase().includes('HONOR') || photo.metadata.model?.toUpperCase().includes('HONOR')) {
		logo = DARK_MODE ? supportLogo.get('HONOR_DARK') : supportLogo.get('HONOR_LIGHT');
	}

	if (photo.metadata.make?.toUpperCase().includes('MOTOROLA') || photo.metadata.model?.toUpperCase().includes('MOTOROLA')) {
		logo = DARK_MODE ? supportLogo.get('MOTOROLA_DARK') : supportLogo.get('MOTOROLA_LIGHT');
	}

	if (photo.metadata.make?.toUpperCase().includes('NOKIA') || photo.metadata.model?.toUpperCase().includes('NOKIA')) {
		logo = DARK_MODE ? supportLogo.get('NOKIA_DARK') : supportLogo.get('NOKIA_LIGHT');
	}

	if (photo.metadata.make?.toUpperCase().includes('NUBIA') || photo.metadata.model?.toUpperCase().includes('NUBIA')) {
		logo = DARK_MODE ? supportLogo.get('NUBIA_DARK') : supportLogo.get('NUBIA_LIGHT');
	}

	if (photo.metadata.make?.toUpperCase().includes('REALME') || photo.metadata.model?.toUpperCase().includes('REALME')) {
		logo = DARK_MODE ? supportLogo.get('REALME_DARK') : supportLogo.get('REALME_LIGHT');
	}

	if (photo.metadata.make?.toUpperCase().includes('GOOGLE') || photo.metadata.model?.toUpperCase().includes('GOOGLE')) {
		logo = DARK_MODE ? supportLogo.get('GOOGLE_DARK') : supportLogo.get('GOOGLE_LIGHT');
	}

	if (photo.metadata.make?.toUpperCase().includes('GOLDSTAR') || photo.metadata.model?.toUpperCase().includes('GOLDSTAR')) {
		logo = DARK_MODE ? supportLogo.get('GOLDSTAR_DARK') : supportLogo.get('GOLDSTAR_LIGHT');
	}

  if (logo) {
    let LOGO_WIDTH = (logo.width / logo.height) * TARGET_LOGO_HEIGHT;
    if (LOGO_WIDTH > TARGET_LOGO_WIDTH) {
      LOGO_WIDTH = TARGET_LOGO_WIDTH;
      TARGET_LOGO_HEIGHT = (logo.height / logo.width) * TARGET_LOGO_WIDTH;
    }
    context.drawImage(
      logo,
      canvas.width - Math.max(topWidth, bottomWidth) - FONT_SIZE * 2 - FONT_SIZE - LOGO_WIDTH,
      canvas.height - PADDING_BOTTOM / 2 - TARGET_LOGO_HEIGHT / 2,
      LOGO_WIDTH,
      TARGET_LOGO_HEIGHT
    );
  }

  return canvas;
};

export { STRAP_FUNC, STRAP_OPTIONS };
