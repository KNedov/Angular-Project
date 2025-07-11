import{Comment} from "."
import{Buyer} from "."

export interface PhoneModel {
  phoneName: string;
  displaySize: string;
  color: string;
  price: number;
  imageUrl: string;
  userId: string;
  comments: Comment[];
  buyers: Buyer[];
}
