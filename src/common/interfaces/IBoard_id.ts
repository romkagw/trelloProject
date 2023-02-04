import { ICard } from "./ICard";

export default interface IBoard_id {
	title: string;
	users: {
		id: number;
		username: string;
	};
	lists: { id:number;
		     title: string;
		     position: number; 
			 cards:ICard[];}[];
}
