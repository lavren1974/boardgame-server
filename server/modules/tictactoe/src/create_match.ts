function rpcCreateMatch(ctx: nkruntime.Context, logger: nkruntime.Logger, nk: nkruntime.Nakama, payload: string): string | undefined {
    // var matchId = nk.matchCreate('classic');
    // return JSON.stringify({ matchId });


    let module = 'some.folder.module';
    let params = {
        some: 'data',
    }

    let matchId: string;

    try {
        matchId = nk.matchCreate(module, params);
        return JSON.stringify({ matchId });
    } catch (error) {
        // Handle error
    }


}