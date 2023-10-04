import { EventDto } from "./EventDto";
import { EmployeeDto } from "./EmployeeDto";

export class ClinicScheduleDto {

    constructor(
        public id: number,
        public clinicId: number,
        public beginDate: string | number,
        public expireDate: string | number,
        public eventStart: string,
        public eventFinish: string,
        public repeat: 'everyday' | 'never' | 'daily' | 'weekly' | "weekdays" | "weekend",
        public events: EventDto[],
        public employees: EmployeeDto[],
    ) {

    }
}
