import { FolderOpen, Plus } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

interface EmptyProps {
    title: string;
    message?: string;
    handleCreate?: () => void;
    textButton?: string;
    withButton?: boolean;
    className?: string;
}
export const Empty = ({
    handleCreate,
    title,
    message,
    textButton,
    withButton,
    className,
}: EmptyProps) => {
    return (
        <div
            className={cn(
                "flex flex-col items-center justify-center h-64 text-center",
                className
            )}
        >
            <FolderOpen className="w-12 h-12 text-muted-foreground mb-4" />
            <p className="text-lg font-medium mb-2">{title}</p>
            <p className="text-sm text-muted-foreground mb-4">{message}</p>
            {withButton && (
                <Button onClick={handleCreate}>
                    <Plus className="w-4 h-4 mr-2" />
                    {textButton}
                </Button>
            )}
        </div>
    );
};
