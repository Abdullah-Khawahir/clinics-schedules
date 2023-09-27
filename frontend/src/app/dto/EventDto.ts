export class EventDto {


    constructor(
        public scheduleId: number,
        public beginTime: Date,
        public finishTime: Date,
    ) { }


}