import { ISupStat } from "./sup-stat"

export interface ISupStatResponse {
    origin: Array<ISupStat>
    not_origin: Array<ISupStat>
}
