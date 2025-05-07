export const MONTHS_IN_YEAR = 12;
export const DAYS_IN_MONTH = 28;

export class TimeDate {
    year: number;
    month: number;
    day: number;

    constructor(year: number, month: number, day: number) {
        this.year = year;
        this.month = month;
        this.day = day;
    }

    getDays(): number {
        return (
            this.year * MONTHS_IN_YEAR * DAYS_IN_MONTH +
            (this.month - 1) * DAYS_IN_MONTH +
            this.day
        );
    }

    add(other: TimeDate): TimeDate {
        return TimeDate.fromDays(this.getDays() + other.getDays());
    }

    subtract(other: TimeDate): TimeDate {
        return TimeDate.fromDays(this.getDays() - other.getDays());
    }

    getDayDiff(other: TimeDate): number {
        return Math.abs(this.getDays() - other.getDays());
    }

    static fromDays(days: number): TimeDate {
        const year = Math.floor(days / (MONTHS_IN_YEAR * DAYS_IN_MONTH));
        days -= year * MONTHS_IN_YEAR * DAYS_IN_MONTH;

        const month = Math.floor(days / DAYS_IN_MONTH);
        days -= month * DAYS_IN_MONTH;

        return new TimeDate(year, month, days);
    }

    static fromJSON(json: {
        year: number;
        month: number;
        day: number;
    }): TimeDate {
        return new TimeDate(json.year, json.month, json.day);
    }
}
