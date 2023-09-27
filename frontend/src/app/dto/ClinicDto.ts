export class ClinicDto {
    constructor(
        private id: number,
        public englishName: string,
        public arabicName: string,
        public number: number,
        public buildingID: number,
        public ext: string,
    ) { }
}