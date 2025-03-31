
import { UserType, LeagueType }  from './leagueObjectTypes.ts';

export function User(): UserType  {
    const UserType: UserType = JSON.parse(localStorage.getItem("login") as string);
    return UserType;
}

export function League(): LeagueType {
    const league: LeagueType = JSON.parse(localStorage.getItem("league") as string);
    return league;
}

export function IsLeagueNull():boolean {
    return localStorage.getItem("league") === null
}

export function IsUserNull(): boolean {
    return localStorage.getItem("login") === null
}

export function SetUser( data: UserType): void
{
    localStorage.setItem('login', JSON.stringify(data));
}

export function SetLeague( data: LeagueType ): void
{
    localStorage.setItem('league', JSON.stringify(data));
}

export function RemoveLeague(): void {
    localStorage.removeItem("league");
}

export function RemoveAll(): void {
    localStorage.clear();
}



