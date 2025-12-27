export const longDatesFormatter = (value: string): string => {
    const dateFormatter = new Intl.DateTimeFormat('en-US', {year: 'numeric', month: "short"});
    return dateFormatter.format(Date.parse(value));
}

export const onlyYearDateFormatter = (value: string): string => {
    const dateFormatter = new Intl.DateTimeFormat('en-US', {year: 'numeric'});
    return dateFormatter.format(Date.parse(value));
}

export const getYearRange = ({start, end}: { start: string, end: string }) => {
    const dateFormatter = new Intl.DateTimeFormat('en-US', {year: 'numeric'});
    const startYear = dateFormatter.format(Date.parse(start));
    const endYear = dateFormatter.format(Date.parse(end));
    if (startYear === endYear) {
        return endYear;
    } else {
        return `${startYear} — ${endYear}`
    }
}