export class EventDto {


    constructor(
        public scheduleId: number,
        public beginTime: string | number,
        public finishTime: string | number,
    ) { }


}