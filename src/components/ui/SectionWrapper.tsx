import { ReactNode } from "react";

interface SectionWrapperProps {
  id: string;
  children: ReactNode;
  className?: string;
  title?: string;
  subtitle?: string;
}

export default function SectionWrapper({ 
  id, 
  children, 
  className = "",
  title,
  subtitle
}: SectionWrapperProps) {
  return (
    <section 
      id={id} 
      className={`section-padding ${className}`}
    >
      <div className="container mx-auto px-4">
        {(title || subtitle) && (
          <div className="text-center mb-16">
            {title && (
              <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-4">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                {subtitle}
              </p>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}