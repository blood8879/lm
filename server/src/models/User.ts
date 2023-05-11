import { Model, Schema, model, Types } from "mongoose";
import bcrypt from "bcryptjs";

const saltRounds = 10;

interface DBUser {
    name: string;
    email: string;
    password: string;
    role: number;
    playerId: Types.ObjectId;
}

interface DBUserModel extends Model<DBUser> {}

const userSchema = new Schema<DBUser> ({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: 1 },
    password: { type: String, required: true },
    // role 0: admin, 1:member
    role: { type: Number, default: 1 },
    playerId: { type: Schema.Types.ObjectId, ref: 'Player'},
});

userSchema.pre('save', function(next) {
    var user = this;

    // 비밀번호 암호화(10회)
    if(user.isModified('password')) {
        bcrypt.genSalt(saltRounds, function(err, salt) {
            if(err) return next(err);

            bcrypt.hash(user.password, salt, function(err, hash) {
                if(err) return next(err);
                user.password = hash;
                next();
            })
        })
    } else {
        next();
    }
});

userSchema.methods.comparePassword = function(plainPassword, cb) {
    bcrypt.compare(plainPassword, this.password, function(err, isMatch) {
        if(err) return cb(err);
        cb(null, isMatch);
    })
};

// 비밀번호 재설정 토큰 생성(gpt참조라 작동여부 확인 필요)
userSchema.methods.generateResetToken = function() {
    // 랜덤한 32자리 문자열 생성
    const resetToken = require('crypto').randomBytes(32).toString('hex');

    // 토큰 만료일 (1시간 후)
    const resetTokenExpiration = new Date().getTime() + 1000 * 60 * 60;

    // DB에 저장
    this.resetToken = resetToken;
    this.resetTokenExpiration = resetTokenExpiration;
    this.save();

    // 토큰과 만료일을 포함한 객체 반환
    return {
        resetToken,
        resetTokenExpiration,
    };
}

// 비밀번호 재설정(gpt참조라 작동여부 확인 필요)
userSchema.statics.resetPassword = async function(resetToken, newPassword) {
    // 토큰과 일치하는 유저 찾기
    const user = await this.findOne({
        resetToken,
        resetTokenExpiration: { $gt: new Date().getTime() },
    });

    if (!user) {
        throw new Error('Invalid or expired reset token.');
    }

    // 비밀번호 업데이트
    user.password = newPassword;
    user.resetToken = undefined;
    user.resetTokenExpiration = undefined;
    await user.save();

    return user;
}

const User = model<DBUser, DBUserModel>('User', userSchema);

export { User };