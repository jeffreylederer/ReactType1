
 class LeagueClass {
    
     id: number = 0;
    leagueName: string = '';
    active: boolean=false;
    teamSize: number=0;
    tiesAllowed: boolean=false;
    pointsCount: boolean=false;
    winPoints: number=0;
    tiePoints: number=0;
    byePoints: number=0;
    startWeek: number=0;
    pointsLimit: boolean=false;
    divisions: number=0;
    playOffs: boolean=false;

    constructor() {
        const value = localStorage.getItem("league");
        
        if (typeof value === 'string') {
            const league: LeagueType = JSON.parse(value);
            this.id = league.id;
            this.leagueName = league.leagueName;
            this.active = league.active;
            this.teamSize = league.teamSize;
            this.tiesAllowed = league.tiesAllowed;
            this.pointsCount = league.pointsCount;
            this.winPoints = league.winPoints;
            this.tiePoints = league.tiePoints;
            this.byePoints = league.byePoints;
            this.startWeek = league.startWeek;
            this.pointsLimit = league.pointsLimit;
            this.divisions = league.divisions;
            this.playOffs = league.playOffs;
        }
   
    }

    Remove ( ){
        localStorage.removeItem("league");
    }

    IsNull():boolean {
        const value = localStorage.getItem("league");

        if (typeof value === 'string')
            return true;
        return false;
    }

    Initialize(league: LeagueType) {
        this.id = league.id;
        this.leagueName = league.leagueName;
        this.active = league.active;
        this.teamSize = league.teamSize;
        this.tiesAllowed = league.tiesAllowed;
        this.pointsCount = league.pointsCount;
        this.winPoints = league.winPoints;
        this.tiePoints = league.tiePoints;
        this.byePoints = league.byePoints;
        this.startWeek = league.startWeek;
        this.pointsLimit = league.pointsLimit;
        this.divisions = league.divisions;
        this.playOffs = league.playOffs;
        localStorage.setItem('league', JSON.stringify(league));
    }
}

export type LeagueType = {
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

};



export default LeagueClass;
