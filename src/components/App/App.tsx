import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

import { getPhotos } from "../../services/photos";
import Section from "../Section/Section";
import Container from "../Container/Container";
import Form from "../Form/Form";
import PhotosGallery from "../PhotosGallery/PhotosGallery";
import Loader from "../Loader/Loader";
import Modal from "../Modal/Modal";
import Text from "../Text/Text";
import type { Photo } from "../../types/photo";

export default function App() {
    const [photos, setPhotos] = useState<Photo[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);
    const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

    useEffect(() => {
        if (isError) {
            toast.error(
                "Whoops, something went wrong! Please try reloading this page!"
            );
        }
    }, [isError]);

    const handleSearchSubmit = async (query: string) => {
        setIsLoading(true);
        setIsError(false);
        setPhotos([]);
        setSelectedPhoto(null);

        try {
            const newPhotos = await getPhotos(query);
            setPhotos(newPhotos);
            if (newPhotos.length === 0) {
                toast.error(
                    "No photos found. Please try a different search term."
                );
            }
        } catch {
            setIsError(true);
            setPhotos([]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleOpenModal = (photo: Photo) => {
        setSelectedPhoto(photo);
    };

    const handleCloseModal = () => {
        setSelectedPhoto(null);
    };

    return (
        <>
            <Section>
                <Container>
                    <Form onSubmit={handleSearchSubmit} />
                    {isLoading && <Loader />}
                    {isError && (
                        <Text textAlign="center" marginBottom="20">
                            Whoops, something went wrong! Please try reloading
                            this page!
                        </Text>
                    )}
                    {photos.length > 0 && (
                        <PhotosGallery
                            photos={photos}
                            onPhotoClick={handleOpenModal}
                        />
                    )}
                </Container>
                <Toaster />
            </Section>
            {selectedPhoto && (
                <Modal onClose={handleCloseModal}>
                    <img
                        src={selectedPhoto.src.original}
                        alt={selectedPhoto.alt}
                    />
                </Modal>
            )}
        </>
    );
}
