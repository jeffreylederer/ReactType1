
import { UserType, LeagueType }  from './leagueObjectTypes.ts';

export function User(): UserType  {
    const value = localStorage.getItem("login");

    if (typeof value === 'string') 
        return JSON.parse(value) // ok

    return new UserType();
}

export function League(): LeagueType {
    const value = localStorage.getItem("league");

    if (typeof value === 'string') 
        return JSON.parse(value) // ok

    return new LeagueType();
}

export function IsLeagueNull():boolean {
    return League().id == 0;
}

export function IsUserNull(): boolean {
    return User().id == 0;
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



