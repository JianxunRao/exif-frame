import { ListItem, Radio } from 'konsta/react';
import { useStore } from '../../../store';
import { useThemeStore } from '../../../themes';

interface ThemeListItemProps {
  name: string;
}

const ThemeListItem = ({ name }: ThemeListItemProps) => {
  const { selectedThemeName, setSelectedThemeName, setRerenderOptions } = useStore();
  const { clearOption } = useThemeStore();

  return (
    <ListItem
      label
      title={name}
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
