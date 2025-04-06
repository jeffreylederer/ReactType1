function convertDate(date: string): string {
    const d = new Date(date);
    const time: string = d.toLocaleString("en-US", { timeZone: "UTC" });
    return time.replace(", 12:00:00 AM", "");
}

export default convertDate;