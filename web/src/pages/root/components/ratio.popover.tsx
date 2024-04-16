import { List, ListItem, Popover } from 'konsta/react';
import { useStore } from '../../../store';

const RatioPopover = () => {
  const { ratioPopover, setRatioPopover, setRatio } = useStore();

  return (
    <Popover opened={ratioPopover} target={'.ratio-name'} onBackdropClick={() => setRatioPopover(false)}>
      <List nested>
        {['free', '1:1', '4:5', '1.91:1', '9:16'].map((ratio) => (
          <ListItem
            key={ratio}
            title={ratio}
            link
            chevronIos={false}
            onClick={() => {
              setRatio(ratio as never);
              setRatioPopover(false);
            }}
          />
        ))}
      </List>
    </Popover>
  );
};

export default RatioPopover;
