import { model, Model, Schema, Types } from "mongoose";

interface DBSquad {
    teamId: Types.ObjectId;
    userId: Types.ObjectId;
    backNo: number;
    position: [];
    confirmed: boolean;
}

interface DBSquadModel extends Model<DBSquad> {}

const squadSchema = new Schema<DBSquad> ({
    teamId: { type: Schema.Types.ObjectId, ref: 'Team' },
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    backNo: { type: Number },
    position: [String],
    confirmed: { type: Boolean, default: false },
})

const Squad = model<DBSquad, DBSquadModel>('Squad', squadSchema);

export { Squad };