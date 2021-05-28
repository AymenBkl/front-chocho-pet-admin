import { GamedState } from "./gameState";

export interface DashBoardGameStateResponse {
   err: string;
    success: boolean;
    token: string;
    msg: string;
    status: number;
    gameStates: GamedState[];
}
