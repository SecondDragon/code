
import {Lesson} from './lesson';
export interface CartItem{
    lesson:Lesson;
    count:number;
    checked:boolean
}