function rpcHealthcheck(ctx: nkruntime.Context, logger: nkruntime.Logger, nk: nkruntime.Nakama, payload: string): string {

    logger.info('rpcHealthcheck - !');
    return JSON.stringify({ succes: true })
}