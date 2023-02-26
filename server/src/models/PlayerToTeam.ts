import { model, Model, Schema, Types } from "mongoose";

interface DBPlayerToTeam {
    teamId: Types.ObjectId;
    playerId: Types.ObjectId;
    backNo: number;
    position: [];
    confirmed: boolean;
}

interface DBPlayerToTeamModel extends Model<DBPlayerToTeam> {}

const playerToTeamSchema = new Schema<DBPlayerToTeam> ({
    teamId: { type: Schema.Types.ObjectId, ref: 'Team' },
    playerId: { type: Schema.Types.ObjectId, ref: 'Player' },
    backNo: { type: Number },
    position: [String],
    confirmed: { type: Boolean, default: false },
})

const PlayerToTeam = model<DBPlayerToTeam, DBPlayerToTeamModel>('PlayerToTeam', playerToTeamSchema);

export { PlayerToTeam };