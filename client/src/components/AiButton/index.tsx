"use client";
import { useCookieValue } from "@/helpers/getCookieInfo";
import { usePathname, useRouter } from "next/navigation";

const NavigateAi = () => {
  const userType = useCookieValue("userType");

  const router = useRouter();
  const pathname = usePathname();

  // Don't render the button on /ai page
  
  // if (userType !==  "auth_client") return null;
  // if (pathname === "/ai") return null;

  return (
    <div
      className="ai-button-container"
      style={{
        position: "fixed",
        zIndex: 9999,
        bottom: "30px",
        right: "20px",
      }}
    >
      <button
        onClick={() => router.push("/ai")}
        className="ai-navigate-button"
      >
        <div className="button-content">
          <svg
            className="ai-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9 12l2 2 4-4" />
            <path d="M21 12c.552 0 1-.448 1-1V5c0-.552-.448-1-1-1H3c-.552 0-1 .448-1 1v6c0 .552.448 1 1 1" />
            <path d="M3 12v6c0 .552.448 1 1 1h16c.552 0 1-.448 1-1v-6" />
          </svg>
          <span className="button-text">AI SUPPORT</span>
          <svg
            className="arrow-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="7" y1="17" x2="17" y2="7" />
            <polyline points="7,7 17,7 17,17" />
          </svg>
        </div>
        <div className="button-glow"></div>
      </button>

      <style jsx>{`
        .ai-button-container {
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 20px;
        }

        .ai-navigate-button {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 16px 32px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          border-radius: 16px;
          font-size: 18px;
          font-weight: 700;
          letter-spacing: 0.5px;
          cursor: pointer;
          overflow: hidden;
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          box-shadow: 0 8px 32px rgba(102, 126, 234, 0.4),
            0 4px 16px rgba(118, 75, 162, 0.3),
            inset 0 1px 0 rgba(255, 255, 255, 0.2);
          min-width: 200px;
        }

        .ai-navigate-button:before {
          content: "";
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.3),
            transparent
          );
          transition: left 0.6s;
        }

        .ai-navigate-button:hover:before {
          left: 100%;
        }

        .button-content {
          display: flex;
          align-items: center;
          gap: 12px;
          position: relative;
          z-index: 2;
        }

        .ai-icon {
          width: 24px;
          height: 24px;
          transition: transform 0.3s ease;
        }

        .arrow-icon {
          width: 20px;
          height: 20px;
          transition: transform 0.3s ease;
        }

        .button-text {
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto",
            sans-serif;
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
        }

        .button-glow {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: radial-gradient(
            circle at center,
            rgba(255, 255, 255, 0.1),
            transparent 70%
          );
          opacity: 0;
          transition: opacity 0.3s ease;
          pointer-events: none;
        }

        .ai-navigate-button:hover {
          transform: translateY(-3px) scale(1.02);
          box-shadow: 0 12px 40px rgba(102, 126, 234, 0.5),
            0 8px 24px rgba(118, 75, 162, 0.4),
            inset 0 1px 0 rgba(255, 255, 255, 0.3);
        }

        .ai-navigate-button:hover .ai-icon {
          transform: rotate(10deg) scale(1.1);
        }

        .ai-navigate-button:hover .arrow-icon {
          transform: translate(2px, -2px) scale(1.1);
        }

        .ai-navigate-button:hover .button-glow {
          opacity: 1;
        }

        .ai-navigate-button:active {
          transform: translateY(-1px) scale(0.98);
          transition: all 0.1s ease;
        }

        .ai-navigate-button:focus {
          outline: none;
          box-shadow: 0 12px 40px rgba(102, 126, 234, 0.5),
            0 8px 24px rgba(118, 75, 162, 0.4),
            0 0 0 3px rgba(102, 126, 234, 0.5);
        }

        @media (max-width: 768px) {
          .ai-navigate-button {
            padding: 14px 28px;
            font-size: 16px;
            min-width: 180px;
          }

          .ai-icon {
            width: 20px;
            height: 20px;
          }

          .arrow-icon {
            width: 18px;
            height: 18px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .ai-navigate-button,
          .ai-icon,
          .arrow-icon,
          .button-glow {
            transition: none;
          }
        }
      `}</style>
    </div>
  );
};

export default NavigateAi;
