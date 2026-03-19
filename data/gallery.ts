export type GalleryItem = {
  id: string;
  type: "image" | "video";
  src: string;
  caption: string;
  order: number;
};

export const galleryItems: GalleryItem[] = [
  { id: "1", type: "image", src: "/gallery/photo-1.jpg", caption: "", order: 1 },
  { id: "2", type: "image", src: "/gallery/photo-2.jpg", caption: "", order: 2 },
  { id: "3", type: "image", src: "/gallery/photo-3.jpg", caption: "", order: 3 },
  { id: "4", type: "image", src: "/gallery/photo-4.jpg", caption: "", order: 4 },
  { id: "5", type: "image", src: "/gallery/photo-5.jpg", caption: "", order: 5 },
  { id: "6", type: "image", src: "/gallery/photo-6.jpg", caption: "", order: 6 },
];
