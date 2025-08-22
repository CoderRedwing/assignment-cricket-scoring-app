import { Body, Controller, Param, Post, Get } from '@nestjs/common';
import { MatchesService } from './matches.service';


@Controller('matches')
export class MatchesController {
    constructor(private readonly matchesService: MatchesService) { }

    @Post('start')
    async startMatch(@Body() body: { teamA: string, teamB: string }) {
        return this.matchesService.startMatch(body.teamA, body.teamB);
    }

    @Post(':id/commentary')
    async addCommentary(@Param('id') id: number, @Body() body: { over: number, ball: number, eventType: string },) {
        return this.matchesService.addCommentary(id, body.over, body.ball, body.eventType);
    }

    @Get(':id')
    async getMatch(@Param('id') id: number) {
        return this.matchesService.getMatch(id); 
    }

    @Get()
    async getAllMatches() {
        return this.matchesService.getAllMatches();
    }
}
