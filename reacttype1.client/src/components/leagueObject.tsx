
import { UserType, LeagueType }  from './leagueObjectTypes.ts';

export function user(): UserType  {
    const UserType: UserType = JSON.parse(localStorage.getItem("login") as string);
    return UserType;
}

export function league(): LeagueType {
    const league: LeagueType = JSON.parse(localStorage.getItem("league") as string);
    return league;
}

export function IsLeagueNull():boolean {
    return localStorage.getItem("league") === null
}

export function IsUserNull(): boolean {
    return localStorage.getItem("login") === null
}

export function setUser( data: UserType): void
{
    localStorage.setItem('login', JSON.stringify(data));
}

export function setLeague( data: LeagueType ): void
{
    localStorage.setItem('league', JSON.stringify(data));
}

export function removeLeague(): void {
    localStorage.removeItem("league");
}

export function removeAll(): void {
    localStorage.clear();
}



