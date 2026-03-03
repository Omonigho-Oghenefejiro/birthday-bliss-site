import { useRef } from "react";
import FloatingHearts from "@/components/FloatingHearts";
import CountdownSection from "@/components/CountdownSection";
import LoveLetterSection from "@/components/LoveLetterSection";
import GallerySection from "@/components/GallerySection";
import TimelineSection from "@/components/TimelineSection";
import BirthdayWishSection from "@/components/BirthdayWishSection";

const Index = () => {
  const contentRef = useRef<HTMLDivElement>(null);

  const handleEnter = () => {
    contentRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="relative">
      <FloatingHearts />
      <CountdownSection onEnter={handleEnter} />
      <div ref={contentRef}>
        <LoveLetterSection />
        <GallerySection />
        <TimelineSection />
        <BirthdayWishSection />
      </div>
    </div>
  );
};

export default Index;
