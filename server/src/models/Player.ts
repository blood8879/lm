import mongoose, { model, Model, Schema, Types } from "mongoose";

interface DBPlayer {
    name: Types.ObjectId;
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
    name: { type: Schema.Types.ObjectId, ref: 'User' },
    leagueType: { type: String },
    height: { type: Number },
    weight: { type: Number },
    phone: { type: String, match: /^\d{3}-\d{3,4}-\d{4}$/},
    foot: { type: String },
    preferPosition: [{ position: String }],
    birth: { type: Date }
});

const Player = model<DBPlayer, DBPlayerModel>('Player', playerSchema);

export { Player };