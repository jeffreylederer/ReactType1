export class LeagueType  {
    id: number;
    leagueName: string;
    active: boolean;
    teamSize: number;
    tiesAllowed: boolean;
    pointsCount: boolean;
    winPoints: number;
    tiePoints: number;
    byePoints: number;
    startWeek: number;
    pointsLimit: boolean;
    divisions: number;
    playOffs: boolean;
 
    

    constructor() {
        this.id= 0;
        this.leagueName= '';
        this.active= false;
        this.teamSize= 0;
        this.tiesAllowed = false;
        this.pointsCount = false;
        this.winPoints= 0;
        this.tiePoints= 0;
        this.byePoints= 0;
        this.startWeek= 0;
        this.pointsLimit = false;
        this.divisions= 0;
        this.playOffs = false;
    }

};



export class UserType {
    id: number;
    userName: string;
    role: string;

    constructor() {
        this.id = 0;
        this.userName = '';
        this.role = '';
    }
}


