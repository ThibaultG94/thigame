import { useState, useEffect, useCallback } from "react";

/**
 * Hook réutilisable pour la gestion du timer dans les jeux
 * @param {Object} options Configuration du timer
 * @param {number} options.initialTime Temps initial en secondes
 * @param {boolean} options.countDown True pour un compte à rebours, false pour un chronomètre
 * @param {function} options.onTimeUp Callback appelé quand le temps est écoulé (compte à rebours)
 * @param {boolean} options.autoStart Démarrer automatiquement le timer
 * @returns {Object} État et contrôles du timer
 */
export const useGameTimer = ({
  initialTime = 60,
  countDown = false,
  onTimeUp = () => {},
  autoStart = false,
} = {}) => {
  const [time, setTime] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(autoStart);
  const [isPaused, setIsPaused] = useState(false);

  // Formatage du temps en mm:ss
  const formattedTime = useCallback(() => {
    const minutes = Math.floor(Math.abs(time) / 60);
    const seconds = Math.abs(time) % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  }, [time]);

  // Démarrer le timer
  const start = useCallback(() => {
    setIsRunning(true);
    setIsPaused(false);
  }, []);

  // Mettre en pause
  const pause = useCallback(() => {
    setIsPaused(true);
  }, []);

  // Reprendre
  const resume = useCallback(() => {
    setIsPaused(false);
  }, []);

  // Réinitialiser
  const reset = useCallback(() => {
    setTime(initialTime);
    setIsRunning(false);
    setIsPaused(false);
  }, [initialTime]);

  // Logique principale du timer
  useEffect(() => {
    let interval = null;

    if (isRunning && !isPaused) {
      interval = setInterval(() => {
        setTime((currentTime) => {
          const newTime = countDown ? currentTime - 1 : currentTime + 1;

          // Gestion de la fin du compte à rebours
          if (countDown && newTime <= 0) {
            clearInterval(interval);
            setIsRunning(false);
            onTimeUp();
            return 0;
          }

          return newTime;
        });
      }, 1000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isRunning, isPaused, countDown, onTimeUp]);

  // Retourne l'état et les contrôles du timer
  return {
    time,
    formattedTime: formattedTime(),
    isRunning,
    isPaused,
    start,
    pause,
    resume,
    reset,
  };
};
