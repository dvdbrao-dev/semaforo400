"use client";

import { motion } from "motion/react";
import type { TrafficStatus } from "@/engine/types";

type Props = {
  active?: TrafficStatus | null;
  compact?: boolean;
};

const lights: { id: TrafficStatus; label: string }[] = [
  { id: "green", label: "Verde" },
  { id: "amber", label: "Ámbar" },
  { id: "red", label: "Rojo" },
];

export function TrafficLight({ active = null, compact = false }: Props) {
  return (
    <div className={`traffic-light-wrap ${compact ? "traffic-light-wrap--compact" : ""}`} aria-label="Semáforo de decisión">
      <motion.div
        className="traffic-light"
        initial={{ y: 8, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="traffic-light__cap" />
        {lights.map((light) => {
          const isActive = active === light.id;
          return (
            <div className="traffic-light__row" key={light.id}>
              <div className="traffic-light__hood" />
              <motion.div
                className={`traffic-light__lamp traffic-light__lamp--${light.id} ${isActive ? "is-active" : ""}`}
                animate={isActive ? { scale: [1, 1.04, 1] } : { scale: 1 }}
                transition={{ duration: 0.55 }}
                aria-label={`${light.label}${isActive ? " activo" : ""}`}
              >
                <span className="traffic-light__mesh" />
              </motion.div>
            </div>
          );
        })}
      </motion.div>
      {!compact && (
        <div className="traffic-aura" aria-hidden="true">
          <span className="traffic-aura__green" />
          <span className="traffic-aura__amber" />
          <span className="traffic-aura__red" />
        </div>
      )}
    </div>
  );
}
