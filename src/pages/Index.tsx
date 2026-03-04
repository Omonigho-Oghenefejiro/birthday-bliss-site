import { useRef, useState, useEffect } from "react";
import FloatingHearts from "@/components/FloatingHearts";
import CountdownSection from "@/components/CountdownSection";
import LoveLetterSection from "@/components/LoveLetterSection";
import GallerySection from "@/components/GallerySection";
import TimelineSection from "@/components/TimelineSection";
import BirthdayWishSection from "@/components/BirthdayWishSection";

const Index = () => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [isUnlocked, setIsUnlocked] = useState(false);

  useEffect(() => {
    const checkDate = () => {
      const now = new Date();
      // Unlock on March 11th or later (same year logic)
      const currentYear = now.getFullYear();
      const birthday = new Date(currentYear, 2, 11); // March 11
      if (now >= birthday) {
        setIsUnlocked(true);
      }
    };
    checkDate();
    const interval = setInterval(checkDate, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleEnter = () => {
    if (isUnlocked) {
      contentRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative">
      <FloatingHearts />
      <CountdownSection onEnter={handleEnter} isUnlocked={isUnlocked} />
      {isUnlocked && (
        <div ref={contentRef}>
          <LoveLetterSection />
          <GallerySection />
          <TimelineSection />
          <BirthdayWishSection />
        </div>
      )}
    </div>
  );
};

export default Index;
