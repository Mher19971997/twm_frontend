interface CircleAccordionProps {
    className: string
}
export default function CircleAccordion({className}: CircleAccordionProps) {
  return (
    <svg
      className={className}
      width="59"
      height="58"
      viewBox="0 0 59 58"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M54.3408 29.2173C54.3408 42.8581 43.1215 54.0058 29.1704 54.0058C15.2193 54.0058 4 42.8581 4 29.2173C4 15.5766 15.2193 4.42892 29.1704 4.42892C43.1215 4.42892 54.3408 15.5766 54.3408 29.2173Z"
        stroke="#FF5B65"
        strokeWidth="8"
      />
    </svg>
  );
}
