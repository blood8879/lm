import mongoose, { model, Model, Schema, Types } from "mongoose";

interface DBPlayer {
    userId: Types.ObjectId;
    name: string;
    leagueType: string;
    height: number;
    weight: number;
    phone: string;
    foot: string;
    preferPosition: [];
    birth: Date;
}

interface DBPlayerModel extends Model<DBPlayer> {}

const playerSchema = new Schema<DBPlayer> ({
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    name: { type: String },
    leagueType: { type: String },
    height: { type: Number },
    weight: { type: Number },
    phone: { type: String, match: /^\d{3}-\d{3,4}-\d{4}$/},
    foot: { type: String },
    preferPosition: [String],
    birth: { type: Date }
});

const Player = model<DBPlayer, DBPlayerModel>('Player', playerSchema);

export { Player };