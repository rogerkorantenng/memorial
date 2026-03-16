export type GalleryItem = {
  id: string;
  type: "image" | "video";
  src: string;
  caption: string;
  order: number;
};

export const galleryItems: GalleryItem[] = [
  { id: "1", type: "image", src: "/gallery/photo-1.jpg", caption: "Family gathering, 2020", order: 1 },
  { id: "2", type: "image", src: "/gallery/photo-2.jpg", caption: "At the university campus", order: 2 },
  { id: "3", type: "image", src: "/gallery/photo-3.jpg", caption: "With grandchildren", order: 3 },
  { id: "4", type: "image", src: "/gallery/photo-4.jpg", caption: "Community service day", order: 4 },
  { id: "5", type: "image", src: "/gallery/photo-5.jpg", caption: "Wedding anniversary", order: 5 },
  { id: "6", type: "image", src: "/gallery/photo-6.jpg", caption: "Teaching at school", order: 6 },
  { id: "7", type: "image", src: "/gallery/photo-7.jpg", caption: "Church choir performance", order: 7 },
  { id: "8", type: "image", src: "/gallery/photo-8.jpg", caption: "Birthday celebration", order: 8 },
];
