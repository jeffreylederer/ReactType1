function convertDate(date: string): string {
    const d = new Date(date);
    const time: string = d.toLocaleString("en-US", { timeZone: "UTC" });
    const regex = /,\s\d+:00:00\s\wM/i
    return time.replace(regex, "");
}

export default convertDate;