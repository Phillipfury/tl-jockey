// VideoListModal.tsx
import React, { useState } from 'react';
import { Box, Button, Modal, Typography } from '@mui/material';
import YoutubeUrlForm from './YoutubeUrlForm';
import VideoDropZone from './VideoDropZone';
import { VideoType } from './types';
import { nanoid } from 'nanoid'
import Dialog from './Dialog';
import SupportedVideoInfo from './SupportedVideoInfo';

interface DropZoneModalProps {
  open: boolean;
  onClose: () => void
}

const DropZoneModal: React.FC<DropZoneModalProps> = ({ open, onClose }) => {
  const [videos, setVideos] = useState<Array<VideoType>>([])
  const style = {
    position: 'absolute' as const,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 'w-[1000px]',
    height: 'h-[800px]',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const onDrop = (acceptedFiles: Array<File>): void => {
    const newFiles = acceptedFiles.map((file) => ({
        type: 'file' as const,
        id: nanoid(),
        data: file,
        blobUrl: URL.createObjectURL(file)
    }))

    setVideos((prev) => [...prev, ...newFiles])
    }
const onRemove = (id: string): void => {
    setVideos((prev) => prev.filter((video) => video.id !== id))
    }



  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >

      <Box sx={style}>
        <Typography className={'mb-4'}>
            <p className={'font-aeonikBold text-xl'}>Upload videos</p>
        </Typography>
        <SupportedVideoInfo className="mb-2 md:mb-6" />
        <YoutubeUrlForm onAddClick={function (data: { url: string; title: string; thumbnailUrl: string; }): void {
                  throw new Error('Function not implemented.');
              } }/>
        <VideoDropZone className="flex-1 md:basis-[290px] mt-4" videos={videos} onDrop={onDrop} onRemove={onRemove} />
        <div className={'mt-4 flex flex-row justify-between items-center'}>
            <Button onClick={onClose}>
                <p className={'font-aeonik text-sm text-[#6F706D]'}>Cancel</p>
            </Button>
            <Button onClick={onClose} className={'flex flex-row justify-center items-center '}>
                <p className={'p-[10px] bg-[#E5E6E4] font-aeonik text-sm text-[#6F706D]'}>Upload</p>
            </Button>
        </div>
      </Box>


    </Modal>
  );
};

export default DropZoneModal