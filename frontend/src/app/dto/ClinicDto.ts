export class ClinicDto {
    constructor(
        public id: number,
        public englishName: string,
        public arabicName: string,
        public number: number,
        public buildingId: number,
        public ext: string,
    ) { }
}