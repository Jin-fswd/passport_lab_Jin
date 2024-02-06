import { Strategy as GitHubStrategy } from 'passport-github2';
import { PassportStrategy } from '../../interfaces/index';
import { Profile } from 'passport';
import { Request } from 'express';
import { VerifyCallback } from 'passport-oauth2';


const githubStrategy: GitHubStrategy = new GitHubStrategy(
    {
        clientID: "",
        clientSecret: "",
        callbackURL: "",
        passReqToCallback: true,
    },
    
    /* FIX ME 😭 */
    async (req: Request, accessToken: string, refreshToken: string, profile: any, done: VerifyCallback) => {
    });

const passportGitHubStrategy: PassportStrategy = {
    name: 'github',
    strategy: githubStrategy,
};

export default passportGitHubStrategy;
