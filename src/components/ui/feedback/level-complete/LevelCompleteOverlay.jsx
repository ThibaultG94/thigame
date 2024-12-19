import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function LevelCompleteOverlay({
  show,
  level,
  score,
  onNextLevel,
}) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
        >
          <motion.div
            initial={{ scale: 0.8, y: 50 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.8, y: 50 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          >
            <div className="bg-card p-8 rounded-xl shadow-lg text-center space-y-4">
              <motion.div
                initial={{ rotate: -10 }}
                animate={{ rotate: 10 }}
                transition={{
                  repeat: Infinity,
                  repeatType: "reverse",
                  duration: 1,
                }}
              >
                <Sparkles className="w-12 h-12 text-primary mx-auto" />
              </motion.div>
              <h2 className="text-2xl font-bold">Niveau {level} Terminé !</h2>
              <p className="text-muted-foreground">Score actuel : {score}</p>
              <Button onClick={onNextLevel} className="w-full mt-4 gap-2">
                Niveau Suivant <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
