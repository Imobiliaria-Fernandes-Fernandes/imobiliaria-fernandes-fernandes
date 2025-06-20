import { useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

interface PropertyGalleryProps {
  images: string[];
  title: string;
}

const PropertyGallery = ({ images, title }: PropertyGalleryProps) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
  };

  const openModal = (index: number) => {
    setCurrentImage(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  if (!images || images.length === 0) {
    return (
      <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
        <span className="text-gray-500">Sem imagens</span>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-4 gap-2 aspect-video">
        <div 
          className="col-span-3 cursor-pointer relative overflow-hidden rounded-lg"
          onClick={() => openModal(0)}
        >
          <img 
            src={images[0]} 
            alt={title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
        
        <div className="col-span-1 grid grid-rows-3 gap-2">
          {images.slice(1, 4).map((image, index) => (
            <div 
              key={index}
              className="cursor-pointer relative overflow-hidden rounded-lg"
              onClick={() => openModal(index + 1)}
            >
              <img 
                src={image} 
                alt={`${title} - ${index + 2}`}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
              {index === 2 && images.length > 4 && (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                  <span className="text-white font-semibold">+{images.length - 4}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center">
          <div className="relative max-w-4xl w-full mx-4">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-white hover:text-golden-300 z-10"
            >
              <X className="h-8 w-8" />
            </button>
            
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-golden-300 z-10"
            >
              <ChevronLeft className="h-8 w-8" />
            </button>
            
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-golden-300 z-10"
            >
              <ChevronRight className="h-8 w-8" />
            </button>
            
            <img 
              src={images[currentImage]} 
              alt={`${title} - ${currentImage + 1}`}
              className="w-full h-auto max-h-screen object-contain"
            />
            
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white">
              {currentImage + 1} / {images.length}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PropertyGallery;
