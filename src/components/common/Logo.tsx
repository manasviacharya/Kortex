

/**
 * Custom vector logo resembling six stylized figures holding hands in a circle.
 * The primary color is a pastel periwinkle blue, and the secondary color is a coral orange.
 */
export const Logo = ({ size = 32, className = '' }: { size?: number, className?: string }) => {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* 
        This represents 6 figures arranged in a hex pattern.
        We alternate colors: Blue (#8EBAFB), Orange (#FD9D5D)
        
        A basic figure comprises:
        1. A circular head
        2. A curved body path with "arms" reaching out to neighbors
      */}
      <g transform="translate(50, 50)">
         {/* Figure 1 (Top) - Orange */}
         <g transform="rotate(0)">
           <circle cx="0" cy="-35" r="8" fill="#FD9D5D" />
           <path d="M -12 -23 Q 0 -15 12 -23 L 20 -15 Q 0 -5 -20 -15 Z" fill="#FD9D5D" />
           <path d="M -8 -18 L -15 -5 L 15 -5 L 8 -18 Z" fill="#FD9D5D" />
         </g>

         {/* Figure 2 (Top Right) - Blue */}
         <g transform="rotate(60)">
           <circle cx="0" cy="-35" r="8" fill="#8EBAFB" />
           <path d="M -12 -23 Q 0 -15 12 -23 L 20 -15 Q 0 -5 -20 -15 Z" fill="#8EBAFB" />
           <path d="M -8 -18 L -15 -5 L 15 -5 L 8 -18 Z" fill="#8EBAFB" />
         </g>

         {/* Figure 3 (Bottom Right) - Orange */}
         <g transform="rotate(120)">
           <circle cx="0" cy="-35" r="8" fill="#FD9D5D" />
           <path d="M -12 -23 Q 0 -15 12 -23 L 20 -15 Q 0 -5 -20 -15 Z" fill="#FD9D5D" />
           <path d="M -8 -18 L -15 -5 L 15 -5 L 8 -18 Z" fill="#FD9D5D" />
         </g>

         {/* Figure 4 (Bottom) - Blue */}
         <g transform="rotate(180)">
           <circle cx="0" cy="-35" r="8" fill="#8EBAFB" />
           <path d="M -12 -23 Q 0 -15 12 -23 L 20 -15 Q 0 -5 -20 -15 Z" fill="#8EBAFB" />
           <path d="M -8 -18 L -15 -5 L 15 -5 L 8 -18 Z" fill="#8EBAFB" />
         </g>

         {/* Figure 5 (Bottom Left) - Orange */}
         <g transform="rotate(240)">
           <circle cx="0" cy="-35" r="8" fill="#FD9D5D" />
           <path d="M -12 -23 Q 0 -15 12 -23 L 20 -15 Q 0 -5 -20 -15 Z" fill="#FD9D5D" />
           <path d="M -8 -18 L -15 -5 L 15 -5 L 8 -18 Z" fill="#FD9D5D" />
         </g>

         {/* Figure 6 (Top Left) - Blue */}
         <g transform="rotate(300)">
           <circle cx="0" cy="-35" r="8" fill="#8EBAFB" />
           <path d="M -12 -23 Q 0 -15 12 -23 L 20 -15 Q 0 -5 -20 -15 Z" fill="#8EBAFB" />
           <path d="M -8 -18 L -15 -5 L 15 -5 L 8 -18 Z" fill="#8EBAFB" />
         </g>

         {/* Inner White Cutout to make the "holding hands" ring prominent */}
         <circle cx="0" cy="0" r="16" fill="white" />
      </g>
    </svg>
  );
};
