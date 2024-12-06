import moment from "moment";

export const FormatDate = (date: string) => {
    const localDate = moment.utc(date).local(); // Konversi dari UTC ke waktu lokal
    const formattedDate = localDate.format("DD/MM/YYYY"); // Format tanggal
    const formattedTime = localDate.format("HH:mm"); // Format waktu

    return `${formattedDate}, ${formattedTime}`;
};
