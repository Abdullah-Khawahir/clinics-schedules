import { EventDto } from "./EventDto";
import { EmployeeDto } from "./EmployeeDto";
import { ClinicDto } from "./ClinicDto";

export class FullClinicScheduleDto {
    constructor(
        public id: number,
        public clinic: ClinicDto,
        public beginTime: Date,
        public expireTime: Date,
        public eventStart: string,
        public eventFinish: string,
        public repeat: 'never' | 'daily' | 'weekly' | "weekdays" | "weekend",
        public events: EventDto[],
        public employees: EmployeeDto[],
        public note:string
    ) {
        this.beginTime = new Date(beginTime);
        this.expireTime = new Date(expireTime);
    }
}
