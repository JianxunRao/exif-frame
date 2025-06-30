import { ListInput, ListItem, Range, Toggle } from 'konsta/react';
import {useEffect, useState, useRef} from 'react';
import { useStore } from '../../../store';
import Customize from '../database/customize';
import { ThemeOption, getConverter } from '../types/theme-option';
import { useTranslation } from 'react-i18next';
import AddIcon from '../../../icons/add.icon';

const ThemeOptionListInput = (props: ThemeOption) => {
  const { selectedThemeName, rerenderOptions, darkMode } = useStore();
  const [value, setValue] = useState(Customize.get(selectedThemeName, props.id, getConverter(props.type)) ?? props.default);
    const {t} = useTranslation();
	const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setValue(Customize.get(selectedThemeName, props.id, getConverter(props.type)) ?? props.default);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedThemeName, rerenderOptions]);

	const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;

		// 简单校验图片类型
		if (!file.type.startsWith('image/')) {
			alert(t('error.invalidImageType'));
			return;
		}

		// 转换为base64
		const reader = new FileReader();
		reader.onload = (event) => {
			const base64 = event.target?.result as string;
			Customize.set(selectedThemeName, props.id, base64);
			setValue(base64);
		};
		reader.readAsDataURL(file);
	};

  return (
    <>
      {props.type === 'number' && (
        <ListInput
          key={props.id}
          name={props.id}
          title={t(props.id || '')}
          info={t(props.description || '')}
          value={value}
          onChange={(e) => {
            const value = e.target.value;
            Customize.set(selectedThemeName, props.id, e.target.value);
            setValue(value);
          }}
        />
      )}

      {props.type === 'string' && (
        <ListInput
          key={props.id}
          name={props.id}
          title={t(props.id || '')}
          info={t(props.description || '')}
          value={value}
          onChange={(e) => {
            const value = e.target.value;
            Customize.set(selectedThemeName, props.id, e.target.value);
            setValue(value);
          }}
        />
      )}

      {props.type === 'color' && (
        <ListInput
          info={t(props.description || '')}
          key={props.id}
          name={props.id}
          title={t(props.id || '')}
          media={<div className="w-5 h-5" style={{ backgroundColor: value as string, outline: `1px solid ${darkMode ? '#fff' : '#000'}` }} />}
          value={value}
          onChange={(e) => {
            const value = e.target.value;
            Customize.set(selectedThemeName, props.id, e.target.value);
            setValue(value);
          }}
        />
      )}

      {props.type === 'select' && (
        <ListInput
          key={props.id}
          name={props.id}
          title={t(props.id || '')}
          info={t(props.description || '')}
          value={value}
          type="select"
          onChange={(e) => {
            const value = e.target.value;
            Customize.set(selectedThemeName, props.id, e.target.value);
            setValue(value);
          }}
          dropdown
        >
          {props.options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </ListInput>
      )}

      {props.type === 'range-slider' && (
        <ListItem
          key={props.id}
          title={t(props.id || '')}
          innerChildren={
            <div className="flex space-x-4 rtl:space-x-reverse">
              <span>{value}</span>
              <Range
                value={value}
                min={props.min}
                max={props.max}
                step={props.step}
                onChange={(e) => {
                  const value = Number(e.target.value);
                  Customize.set(selectedThemeName, props.id, value);
                  setValue(value);
                }}
              />
            </div>
          }
        />
      )}

      {props.type === 'boolean' && (
        <ListItem
          key={props.id}
          title={t(props.id || '')}
          footer={props.description || ''}
          after={
            <Toggle
              key={props.id}
              checked={value as boolean}
              onChange={() => {
                Customize.set(selectedThemeName, props.id, !value);
                setValue(!value);
              }}
            />
          }
        />
      )}

		{props.type === 'image-upload' && (
			<ListItem
				key={props.id}
				title={t(props.id || '')}
				footer={t(props.description || '')}
				after={
					<div className="flex items-center space-x-2 rtl:space-x-reverse">
						{value && (
							<div
								className="w-8 h-8 rounded-full overflow-hidden border"
								style={{ borderColor: darkMode ? '#fff' : '#000' }}
								onClick={() => fileInputRef.current?.click()}
							>
								<img
									src={value as string}
									alt="Logo预览"
									className="w-full h-full object-contain"
								/>
							</div>
						)}
						<button
							type="button"
							className="p-1"
							onClick={() => fileInputRef.current?.click()}
						>
							<AddIcon size={42} />
						</button>
						<input
							type="file"
							ref={fileInputRef}
							accept="image/*"
							className="hidden"
							onChange={handleImageUpload}
						/>
					</div>
				}
			/>
		)}
    </>
  );
};

export default ThemeOptionListInput;
