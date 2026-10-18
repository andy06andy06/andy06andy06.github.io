import { twMerge } from 'tailwind-merge';

interface Text3DProps {
    text: string;
    as?: 'h1' | 'p';
    depth?: number;
    strokeWidth?: number;
    className?: string;
}

// Chunky blue 3D block text: stacked offset layers behind a white, black-outlined front face
export default function Text3D({ text, as: Tag = 'h1', depth = 10, strokeWidth = 6, className }: Text3DProps) {
    const textClass = twMerge('font-black uppercase text-center', className);
    const layerClass = `${textClass} absolute inset-0`;
    const frontClass = `${textClass} relative`;

    return (
        <div className="relative">
            {/* 3D blue block layers (back to front) */}
            {Array.from({ length: depth }, (_, i) => depth - i).map((offset) => (
                <div
                    key={offset}
                    className={layerClass}
                    style={{
                        color: offset <= 2 ? '#1e3a8a' : '#3b82f6',
                        WebkitTextStroke: '2px #1e3a8a',
                        paintOrder: 'stroke fill',
                        transform: `translate(${offset}px, ${offset}px)`,
                    }}
                    aria-hidden="true"
                >
                    {text}
                </div>
            ))}
            {/* Front face */}
            <Tag
                className={frontClass}
                style={{
                    color: '#ffffff',
                    WebkitTextStroke: `${strokeWidth}px #000`,
                    paintOrder: 'stroke fill',
                }}
            >
                {text}
            </Tag>
        </div>
    );
}
