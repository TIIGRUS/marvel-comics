interface HeartIconProps {
  filled?: boolean;
  className?: string;
  size?: number;
}

const HeartIcon = ({
  filled = false,
  className = "",
  size = 24,
}: HeartIconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      fill={filled ? "var(--color-main, #9f0013)" : "none"}
      stroke={filled ? "var(--color-main, #9f0013)" : "currentColor"}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{
        transition: "fill 0.3s ease, stroke 0.3s ease, transform 0.2s ease",
      }}
      aria-hidden
    >
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  );
};

export default HeartIcon;
