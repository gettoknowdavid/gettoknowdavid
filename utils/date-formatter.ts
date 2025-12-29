export function formatDateVerbose(dateString: string): string {
    const date = new Date(dateString);

    const formatter = new Intl.DateTimeFormat("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
    });

    // Format like "Wednesday, October 22, 2025"
    const formatted = formatter.format(date);

    // Extract the day number for the ordinal suffix
    const day = date.getDate();

    const getOrdinal = (n: number): string => {
        const s = ["th", "st", "nd", "rd"];
        const v = n % 100;
        return s[(v - 20) % 10] || s[v] || s[0];
    };

    // Replace the numeric day with its ordinal form
    return formatted.replace(
        new RegExp(`\\b${day}\\b`),
        `${day}${getOrdinal(day)}`
    );
}
