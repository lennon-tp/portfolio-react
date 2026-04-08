import { useState, useEffect } from "react";

function useTypewriter(words, typingSpeed = 100, deletingSpeed = 60, pauseTime = 1800) {
  const [displayed, setDisplayed] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (!words || words.length === 0) return;

    const currentWord = words[wordIndex % words.length];

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setDisplayed(currentWord.slice(0, displayed.length + 1));

        if (displayed.length + 1 === currentWord.length) {
          setTimeout(() => setIsDeleting(true), pauseTime);
        }
      } else {
        setDisplayed(currentWord.slice(0, displayed.length - 1));

        if (displayed.length === 0) {
          setIsDeleting(false);
          setWordIndex((prev) => (prev + 1) % words.length);
        }
      }
    }, isDeleting ? deletingSpeed : typingSpeed);

    return () => clearTimeout(timeout);
  }, [displayed, isDeleting, wordIndex, words, typingSpeed, deletingSpeed, pauseTime]);

  return displayed;
}

export default useTypewriter;