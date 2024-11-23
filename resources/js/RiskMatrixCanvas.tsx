import React, { useEffect, useRef, useState } from "react";

type CellKey =
    | "0,4"
    | "0,3"
    | "0,2"
    | "0,1"
    | "0,0"
    | "1,4"
    | "1,3"
    | "1,2"
    | "1,1"
    | "1,0"
    | "2,4"
    | "2,3"
    | "2,2"
    | "2,1"
    | "2,0"
    | "3,4"
    | "3,3"
    | "3,2"
    | "3,1"
    | "3,0"
    | "4,4"
    | "4,3"
    | "4,2"
    | "4,1"
    | "4,0";

const RiskMatrixCanvas = ({ className = "" }) => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

    // Matrix data
    const impactLevels = [
        "Catastrophic 5",
        "High 4",
        "Moderate 3",
        "Minor 2",
        "Insignificant 1",
    ];

    const likelihoodLevels = [
        "Sangat Rendah /1",
        "Rendah /2",
        "Sedang /3",
        "Tinggi /4",
        "Sangat Tinggi /5",
    ];

    const cellContent: Record<CellKey, { text: string; color: string }> = {
        "0,4": { text: "H - 25", color: "#FF0000" },
        "0,3": { text: "H - 20", color: "#FF0000" },
        "0,2": { text: "MEDIUM - 15", color: "#FFA500" },
        "0,1": { text: "MEDIUM - 10", color: "#FFA500" },
        "0,0": { text: "MEDIUM - 5", color: "#FFA500" },
        "1,4": { text: "H - 15", color: "#FF0000" },
        "1,3": { text: "H - 12", color: "#FF0000" },
        "1,2": { text: "MEDIUM - 12", color: "#FFA500" },
        "1,1": { text: "MINOR - 8", color: "#90EE90" },
        "1,0": { text: "LOW - 4", color: "#008000" },
        "2,4": { text: "MEDIUM - 15", color: "#FFA500" },
        "2,3": { text: "MEDIUM - 12", color: "#FFA500" },
        "2,2": { text: "MINOR - 9", color: "#90EE90" },
        "2,1": { text: "MINOR - 6", color: "#90EE90" },
        "2,0": { text: "LOW - 3", color: "#008000" },
        "3,4": { text: "MEDIUM - 10", color: "#FFA500" },
        "3,3": { text: "MINOR - 8", color: "#90EE90" },
        "3,2": { text: "MINOR - 6", color: "#90EE90" },
        "3,1": { text: "LOW - 4", color: "#008000" },
        "3,0": { text: "LOW - 2", color: "#008000" },
        "4,4": { text: "MEDIUM - 5", color: "#FFA500" },
        "4,3": { text: "LOW - 4", color: "#008000" },
        "4,2": { text: "LOW - 3", color: "#008000" },
        "4,1": { text: "LOW - 2", color: "#008000" },
        "4,0": { text: "LOW - 1", color: "#008000" },
    };

    // Update dimensions when container size changes
    useEffect(() => {
        const updateDimensions = () => {
            if (containerRef.current) {
                const { width, height } =
                    containerRef.current.getBoundingClientRect();
                setDimensions({ width, height });
            }
        };

        // Initial size
        updateDimensions();

        // Create ResizeObserver
        const observer = new ResizeObserver(updateDimensions);
        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        // Cleanup
        return () => {
            if (containerRef.current) {
                observer.unobserve(containerRef.current);
            }
        };
    }, []);

    // Draw the matrix whenever dimensions change
    useEffect(() => {
        if (dimensions.width === 0 || dimensions.height === 0) return;

        const canvas = canvasRef.current!!;
        const ctx = canvas.getContext("2d")!!;
        const dpr = window.devicePixelRatio || 1;

        // Set canvas size with high resolution
        canvas.width = dimensions.width * dpr;
        canvas.height = dimensions.height * dpr;
        canvas.style.width = `${dimensions.width}px`;
        canvas.style.height = `${dimensions.height}px`;
        ctx.scale(dpr, dpr);

        // Calculate dynamic sizes based on canvas dimensions
        const startX = dimensions.width * 0.2;
        const startY = dimensions.height * 0.1;
        const cellWidth =
            (dimensions.width - startX - dimensions.width * 0.1) / 5;
        const cellHeight =
            (dimensions.height - startY - dimensions.height * 0.2) / 5;
        const fontSize = Math.min(cellWidth, cellHeight) * 0.15;

        // Clear canvas
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Draw grid cells
        for (let i = 0; i < 5; i++) {
            for (let j = 0; j < 5; j++) {
                const x = startX + j * cellWidth;
                const y = startY + i * cellHeight;

                // Fill cell with color
                ctx.fillStyle = cellContent[`${i},${j}` as CellKey].color;
                ctx.fillRect(x, y, cellWidth, cellHeight);

                // Draw cell border
                ctx.strokeStyle = "#000";
                ctx.strokeRect(x, y, cellWidth, cellHeight);

                // Add cell text
                ctx.fillStyle = "#000";
                ctx.font = `${fontSize}px Arial`;
                ctx.textAlign = "center";
                ctx.textBaseline = "middle";
                ctx.fillText(
                    cellContent[`${i},${j}` as CellKey].text,
                    x + cellWidth / 2,
                    y + cellHeight / 2
                );
            }
        }

        // Draw impact labels
        ctx.save();
        ctx.translate(dimensions.width * 0.05, startY + (5 * cellHeight) / 2);
        ctx.rotate(-Math.PI / 2);
        ctx.textAlign = "center";
        ctx.font = `bold ${fontSize * 1.2}px Arial`;
        ctx.fillText("IMPACT / DAMPAK", 0, 0);
        ctx.restore();

        // Draw impact level labels
        ctx.textAlign = "right";
        ctx.font = `${fontSize}px Arial`;
        for (let i = 0; i < impactLevels.length; i++) {
            ctx.fillText(
                impactLevels[i],
                startX - 10,
                startY + i * cellHeight + cellHeight / 2
            );
        }

        // Draw likelihood labels
        for (let i = 0; i < likelihoodLevels.length; i++) {
            ctx.textAlign = "center";
            ctx.fillText(
                likelihoodLevels[i],
                startX + i * cellWidth + cellWidth / 2,
                startY + 5 * cellHeight + fontSize * 2
            );
        }

        // Draw likelihood title
        ctx.font = `bold ${fontSize * 1.2}px Arial`;
        ctx.fillText(
            "LIKELIHOOD / KEMUNGKINAN / PROBABILITAS",
            startX + (5 * cellWidth) / 2,
            startY + 5 * cellHeight + fontSize * 4
        );
    }, [dimensions]);

    return (
        <div ref={containerRef} className={`w-full h-full ${className}`}>
            <canvas
                ref={canvasRef}
                style={{
                    width: "100%",
                    height: "100%",
                }}
            />
        </div>
    );
};

export default RiskMatrixCanvas;
