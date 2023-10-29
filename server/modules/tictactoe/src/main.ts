const rpcIdRewards = 'rewards'; // rewards_js
const rpcIdFindMatch = 'find_match'; // find_match_js

function InitModule(ctx: nkruntime.Context, logger: nkruntime.Logger, nk: nkruntime.Nakama, initializer: nkruntime.Initializer) {

    logger.info('InitModule - template!');
    initializer.registerRpc('get_pokemon', getPokemon);
    // initializer.registerRpc("create_match", rpcCreateMatch);

    initializer.registerRpc(rpcIdRewards, rpcReward);

    initializer.registerRpc(rpcIdFindMatch, rpcFindMatch);

    initializer.registerMatch(moduleName, {
        matchInit,
        matchJoinAttempt,
        matchJoin,
        matchLeave,
        matchLoop,
        matchTerminate,
        matchSignal,
    });


}