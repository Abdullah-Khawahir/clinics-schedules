import { EventDto } from "./EventDto";
import { Employee } from "./employeeDto";

export class ClinicScheduleDto {
    constructor(
        public id: number,
        public clinicId: number,
        public beginTime: Date,
        public expireTime: Date,
        public eventStart: Date,
        public eventFinish: Date,
        public repeat: 'everyday' | 'never' | 'daily' | 'weekly' | "weekdays" | "weekend",
        public events: EventDto[],
        public employees: Employee[],
    ) { }
}
