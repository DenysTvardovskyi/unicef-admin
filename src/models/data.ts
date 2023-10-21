import {IUser} from "./user";
import {IGroup} from "./group";
import {IRegion} from "./region";

export interface IData {
    users: IUser[],
    groups: IGroup[],
    regions: IRegion
}
