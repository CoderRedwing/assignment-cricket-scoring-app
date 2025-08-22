"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MatchesService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const match_schema_1 = require("./schemas/match.schema");
const commentary_schema_1 = require("./schemas/commentary.schema");
const matches_gateway_1 = require("./matches.gateway");
let MatchesService = class MatchesService {
    matchModel;
    commentaryModel;
    gateway;
    constructor(matchModel, commentaryModel, gateway) {
        this.matchModel = matchModel;
        this.commentaryModel = commentaryModel;
        this.gateway = gateway;
    }
    async startMatch(teamA, teamB) {
        const lastMatch = await this.matchModel.findOne().sort({ matchId: -1 }).exec();
        const newId = lastMatch ? lastMatch.matchId + 1 : 1000;
        const match = new this.matchModel({ teamA, teamB, matchId: newId });
        return match.save();
    }
    async addCommentary(matchId, over, ball, eventType) {
        const commentary = new this.commentaryModel({ matchId, over, ball, eventType });
        const saved = await commentary.save();
        this.gateway.sendCommentaryUpdate(saved);
        return commentary.save();
    }
    async getMatch(matchId) {
        const match = await this.matchModel.findOne({ matchId }).exec();
        if (!match) {
            return null;
        }
        const commentary = await this.commentaryModel.find({ matchId }).sort({ createdAt: 1 }).exec();
        return { match, commentary };
    }
    async getAllMatches() {
        return this.matchModel.find().sort({ createdAt: -1 }).exec();
    }
};
exports.MatchesService = MatchesService;
exports.MatchesService = MatchesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(match_schema_1.Match.name)),
    __param(1, (0, mongoose_1.InjectModel)(commentary_schema_1.Commentary.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        matches_gateway_1.MatchesGateway])
], MatchesService);
//# sourceMappingURL=matches.service.js.map