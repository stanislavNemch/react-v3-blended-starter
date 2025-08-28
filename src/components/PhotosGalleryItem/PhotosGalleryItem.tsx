import type { Photo } from "../../types/photo";
import GridItem from "../GridItem/GridItem";

import styles from "./PhotosGalleryItem.module.css";

interface PhotosGalleryItemProps {
    photo: Photo;
    onPhotoClick: (photo: Photo) => void;
}

export default function PhotosGalleryItem({
    photo,
    onPhotoClick,
}: PhotosGalleryItemProps) {
    return (
        <GridItem>
            <div
                className={styles.thumb}
                style={{
                    backgroundColor: photo.avg_color,
                    borderColor: photo.avg_color,
                }}
                onClick={() => onPhotoClick(photo)}
            >
                <img src={photo.src.large} alt={photo.alt} />
            </div>
        </GridItem>
    );
}
