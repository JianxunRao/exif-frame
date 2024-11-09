import { ListItem, Radio } from 'konsta/react';
import { useStore } from '../../../store';
import { useThemeStore } from '../../../themes';

interface ThemeListItemProps {
  name: string;
}
import { useTranslation } from 'react-i18next';

const ThemeListItem = ({ name }: ThemeListItemProps) => {
  const { selectedThemeName, setSelectedThemeName, setRerenderOptions } = useStore();
  const { clearOption } = useThemeStore();
    const {t} = useTranslation();

    return (
    <ListItem
      label
      title={t(name)}
      media={
        <Radio
          checked={selectedThemeName === name}
          onChange={() => {
            clearOption();
            setSelectedThemeName(name);
            setRerenderOptions();
          }}
        />
      }
    />
  );
};

export default ThemeListItem;
