export function GetCount(): number {
    if (localStorage.getItem("matches") === null)
        return 0;
    const value = localStorage.getItem("matches") as string;
    return Number(value);
}

export function SetCount(value: number): void {
    localStorage.setItem("matches", value.toString());
}


