import { useState } from 'react';
import { BlockTitle, Button, Icon, List, ListItem, Radio } from 'konsta/react';
import { IoTrashOutline, IoDownloadOutline } from 'react-icons/io5';
import Photo from './domain/photo';
import PhotoUploadButton from './components/photo-upload.button';
import noFrame from './themes/no-frame.theme';
import cinemaScope from './themes/cinema-scope.theme';
import simpleFrame from './themes/simple.theme';
import compactFrame from './themes/compact.theme';
import strapFrame from './themes/strap.theme';
import insideFrame from './themes/inside.theme';
import gridLines from './themes/grid-lines.theme';
import monitor from './themes/monitor.theme';
import monitorWithoutGridLines from './themes/monitor-without-grid-lines.theme';
import crop1x1 from './themes/crop-1:1.theme';
import crop4x5 from './themes/crop-4:5.theme';
import instagramFrame from './themes/instagram.theme';
import darkStrapFrame from './themes/dark-strap.theme';
import darkSimpleFrame from './themes/dark-simple.theme';
import retroFrame from './themes/retro.theme';
import download from './utils/download';

const FramePage = () => {
  const frames = [
    { name: 'No Frame', func: noFrame },
    { name: 'Cinema Scope', func: cinemaScope },
    { name: 'Grid Lines', func: gridLines },
    { name: 'Simple', func: simpleFrame },
    { name: 'Dark Simple', func: darkSimpleFrame },
    { name: 'Compact', func: compactFrame },
    { name: 'Strap', func: strapFrame },
    { name: 'Dark Strap', func: darkStrapFrame },
    { name: 'Inside', func: insideFrame },
    { name: 'Monitor', func: monitor },
    { name: 'Monitor Without Grid Lines', func: monitorWithoutGridLines },
    { name: 'Crop 1:1', func: crop1x1 },
    { name: 'Crop 4:5', func: crop4x5 },
    { name: 'Instagram', func: instagramFrame },
    { name: 'Retro', func: retroFrame },
  ];

  const [photos, setPhotos] = useState<Photo[]>([]);
  const [frame, setFrame] = useState(frames[0].name);

  return (
    <>
      <BlockTitle>Frames</BlockTitle>
      <List strong inset>
        {frames.map((t, index) => (
          <ListItem key={index} label title={t.name} media={<Radio checked={frame === t.name} onChange={() => setFrame(t.name)} />} />
        ))}
      </List>

      <BlockTitle>Images</BlockTitle>
      <List strongIos inset>
        {photos.map((photo, index) => (
          <ListItem
            chevronIos={false}
            key={index}
            title={photo.name}
            subtitle={`${photo.focalLength} ${photo.aperture} ${photo.shutterSpeed} ${photo.iso}`}
            text={`${photo.cameraMaker} ${photo.cameraModel} ${photo.lensModel}`}
            after={
              <>
                <Button
                  onClick={() => {
                    const func = frames.find((t) => t.name === frame)?.func;
                    func!(photo);
                    download(photo);
                  }}
                >
                  <Icon ios={<IoDownloadOutline className="w-5 h-5" />} />
                </Button>

                <Button
                  className="k-color-brand-red"
                  onClick={() => {
                    setPhotos(photos.filter((p) => p !== photo));
                    photo.destroy();
                  }}
                >
                  <Icon ios={<IoTrashOutline className="w-5 h-5" />} />
                </Button>
              </>
            }
            media={<img className="object-contain w-20 h-20" src={photo.previewImage.src} alt={photo.name} />}
          />
        ))}
      </List>

      <PhotoUploadButton
        onPhotoAdded={(addedPhotos) => {
          setPhotos([...photos, ...addedPhotos]);
        }}
      />

      <Button
        clear
        large
        onClick={async () => {
          const func = frames.find((t) => t.name === frame)?.func;
          photos.forEach((photo) => func!(photo));
          download(photos);
        }}
      >
        <Icon ios={<IoDownloadOutline className="w-8 h-5" />} /> DOWNLOAD ALL
      </Button>
    </>
  );
};
export default FramePage;
