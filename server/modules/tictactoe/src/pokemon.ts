const apiBaseUrl = 'https://pokeapi.co/api/v2';

function lookupPokemon(nk: nkruntime.Nakama, name: string) {
	let url = apiBaseUrl + '/pokemon/' + name;
	let headers = { 'Accept': 'application/json' };
	let response = nk.httpRequest(url, 'get', headers);

	return JSON.parse(response.body);
}

let getPokemon: nkruntime.RpcFunction =
function (ctx: nkruntime.Context, logger: nkruntime.Logger, nk: nkruntime.Nakama, payload: string) {
	// We'll assume payload was sent as JSON and decode it.
	let json = JSON.parse(payload);
	let pokemon;

	try {
		pokemon = lookupPokemon(nk, json['PokemonName']);
	} catch (error) {
		logger.error('An error occurred looking up pokemon: %s', error);
		throw error;
	}

	let result = {
		name: pokemon.name,
		height: pokemon.height,
		weight: pokemon.weight,
		image: pokemon.sprites.front_default,
	}

	return JSON.stringify(result);
}