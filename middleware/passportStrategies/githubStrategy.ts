import { Strategy as GitHubStrategy } from 'passport-github2';
import { PassportStrategy } from '../../interfaces/index';
import { Profile } from 'passport';
import { Request } from 'express';
import { VerifyCallback } from 'passport-oauth2';
import { userModel } from '../../models/userModel';
import dotenv from "dotenv"
dotenv.config()


const githubStrategy: GitHubStrategy = new GitHubStrategy(
    {
        clientID: process.env.GITHUB_CLIENT_ID!,
        clientSecret: process.env.GITHUB_CLIENT_SECRET!,
        callbackURL: "http://localhost:8888/auth/github/callback",
        passReqToCallback: true,
    },   
    /* FIX ME 😭 */
    async (req: Request, accessToken: string, refreshToken: string, profile: any, done: VerifyCallback) => {
        console.log('GitHub 인증 과정 중...'); // 여기에 로그를 찍습니다.
        try {
            console.log('사용자 정보를 데이터베이스에서 찾거나 생성하기 전입니다.');
    
            const user = await userModel.findOrCreate({
                id: profile.id,
                username: profile.username,
                email: profile.emails && profile.emails[0].value,
            });
    
            console.log('사용자 정보가 데이터베이스에서 성공적으로 찾아지거나 생성되었습니다.', user);
    
            done(null, user);
        } catch (error) {
            if (error instanceof Error) {
                console.error("GitHub 인증 중 오류 발생:", error.message); // Error 타입이므로 message 속성에 접근할 수 있음
                done(error);
            } else {
                // error가 Error 타입이 아닌 경우, 일반적인 오류 메시지와 함께 새 Error 객체를 생성
                console.error("GitHub 인증 중 알 수 없는 오류 발생");
                done(new Error("An unknown error occurred"));
            }
        }
    });

const passportGitHubStrategy: PassportStrategy = {
    name: 'github',
    strategy: githubStrategy,
};

export default passportGitHubStrategy;
