import { motion } from "framer-motion";
import { Camera, Play } from "lucide-react";
import { useState } from "react";
import zaniellaGallery1 from "@/assets/zaniella-gallery1.jpeg";
import zaniellaGallery2 from "@/assets/zaniella-gallery2.jpeg";

type GalleryItem = {
  id: number;
  caption: string;
  image?: string;
  video?: string;
};

const galleryItems: GalleryItem[] = [
  { id: 1, caption: "That beautiful smile ✨", image: zaniellaGallery1 },
  { id: 2, caption: "My favorite video of you 🥰", video: "/videos/zaniella-fav.mp4" },
  { id: 3, caption: "She's perfect 💛", image: zaniellaGallery2 },
  { id: 4, caption: "My favorite view" },
  { id: 5, caption: "The best day ever" },
  { id: 6, caption: "Just us, being us" },
];

const GallerySection = () => {
  return (
    <section className="min-h-screen py-20 px-4 bg-romantic-gradient">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-cursive text-5xl md:text-6xl text-gold-gradient mb-4">
            Our Memories
          </h2>
          <p className="font-body text-muted-foreground text-lg">
            Every moment with you is a treasure
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {placeholderPhotos.map((photo, i) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              className="group relative"
            >
              <div className="aspect-[4/5] rounded-2xl bg-card border border-border shadow-romantic overflow-hidden cursor-pointer transition-all duration-500 group-hover:shadow-lg group-hover:scale-[1.02]">
                {/* Photo or placeholder */}
                {'image' in photo && photo.image ? (
                  <img src={photo.image} alt={photo.caption} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-blush to-cream">
                    <Camera className="w-12 h-12 text-muted-foreground/40 mb-3" />
                    <p className="text-sm text-muted-foreground/60 font-body">Upload photo {photo.id}</p>
                  </div>
                )}

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors duration-500 rounded-2xl" />
              </div>

              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.15, duration: 0.5 }}
                className="text-center mt-3 font-body text-sm text-muted-foreground italic"
              >
                {photo.caption}
              </motion.p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
