import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function createGreetingMessage(name: string) {
    const hour = new Date().getHours();

    let greeting = "Selamat Pagi";

    if (hour < 12) {
        greeting = "Selamat Pagi";
    } else if (hour < 18) {
        greeting = "Selamat Siang";
    } else {
        greeting = "Selamat Malam";
    }

    return `${greeting}, ${name}`;
}
