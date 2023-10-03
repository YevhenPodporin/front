import React, { useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';

interface AuthenticatedImageProps {
    src: string;
}

const AuthenticatedImage: React.FC<AuthenticatedImageProps> = ({ src }) => {
    const token = localStorage.getItem('token'); // Get the token from local storage
    const [imageData, setImageData] = useState<string | null>(null);
    useEffect(() => {
        const fetchImage = async () => {
            try {
                const imageUrl = process.env.REACT_APP_IMAGE_URL + src
                const response: AxiosResponse = await axios.get(imageUrl, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    responseType: 'arraybuffer',
                });
                const contentType = response.headers['content-type'];
                const blob = new Blob([response.data], { type: contentType });
                const dataUrl = URL.createObjectURL(response.data);

                setImageData(dataUrl);
            } catch (error) {
                console.error('Error loading image:', error);
            }
        };

        fetchImage();
    }, [src, token]);

    return imageData ? <img src={imageData} alt="Image" /> : null;
};

export default AuthenticatedImage;
