import { model, Model, Schema } from "mongoose";

interface DBTeam {
    name: string;
    emblem: string;
    description: string;
    publishedAt: Date;
}

interface DBTeamModel extends Model<DBTeam> {}

const teamSchema = new Schema<DBTeam> ({
    name: { type: String, required: true },
    emblem: { type: String },
    description: { type: String },
    publishedAt: { Type: Date }
});

const Team = model<DBTeam, DBTeamModel>('Team', teamSchema);

export { Team };