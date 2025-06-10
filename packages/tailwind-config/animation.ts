// animation.ts
export const keyframes = {
  "accordion-down": {
    from: { height: "0" },
    to: { height: "var(--radix-accordion-content-height)" },
  },
  "accordion-up": {
    from: { height: "var(--radix-accordion-content-height)" },
    to: { height: "0" },
  },
  spotlight: {
    "0%": {
      opacity: "0",
      transform: "translate(-72%, -62%) scale(0.5)",
    },
    "100%": {
      opacity: "1",
      transform: "translate(-50%, -40%) scale(1)",
    },
  },
  "text-slide": {
    "0%, 26.66%": {
      transform: "translateY(0%)",
    },
    "33.33%, 60%": {
      transform: "translateY(-25%)",
    },
    "66.66%, 93.33%": {
      transform: "translateY(-50%)",
    },
    "100%": {
      transform: "translateY(-75%)",
    },
  },
  scroll: {
    to: {
      transform: "translate(calc(-50% - 0.5rem))",
    },
  },
  shimmer: {
    "100%": {
      transform: "translateX(100%)",
    },
  },
};

export const animation = {
  "accordion-down": "accordion-down 0.2s ease-out",
  "accordion-up": "accordion-up 0.2s ease-out",
  spotlight: "spotlight 2s ease .75s 1 forwards",
  "text-slide": "text-slide 7.5s cubic-bezier(0.83, 0, 0.17, 1) infinite",
  scroll: "scroll var(--animation-duration, 40s) var(--animation-direction, forwards) linear infinite",
  shimmer: "shimmer 1.5s infinite",
};
